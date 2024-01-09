import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ANNOUNCEMENTS_ERROR_NOT_FOUND } from "src/common/constant/announcements.constant";
import { DEPARTMENTS_ERROR_NOT_FOUND } from "src/common/constant/departments.constant";
import { SCHOOLS_ERROR_NOT_FOUND } from "src/common/constant/schools.constant";
import { CONST_QUERYCURRENT_TIMESTAMP } from "src/common/constant/timestamp.constant";
import { USER_ERROR_USER_NOT_FOUND } from "src/common/constant/user-error.constant";
import {
  columnDefToTypeORMCondition,
  generateIndentityCode,
} from "src/common/utils/utils";
import { CreateAnnouncementDto } from "src/core/dto/announcements/announcements.create.dto";
import { UpdateAnnouncementDto } from "src/core/dto/announcements/announcements.update.dto";
import { Announcements } from "src/db/entities/Announcements";
import { Schools } from "src/db/entities/Schools";
import { Users } from "src/db/entities/Users";
import { Repository } from "typeorm";

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(Announcements)
    private readonly announcementsRepo: Repository<Announcements>
  ) {}

  async getAnnouncementsPagination({ pageSize, pageIndex, order, columnDef }) {
    const skip =
      Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
    const take = Number(pageSize);

    const condition = columnDefToTypeORMCondition(columnDef);
    const [results, total] = await Promise.all([
      this.announcementsRepo.find({
        where: {
          ...condition,
          active: true,
        },
        relations: {
          createdByUser: true,
          updatedByUser: true,
        },
        skip,
        take,
        order,
      }),
      this.announcementsRepo.count({
        where: {
          ...condition,
          active: true,
        },
      }),
    ]);
    return {
      results: results.map((x) => {
        delete x.createdByUser.password;
        if (x?.updatedByUser?.password) {
          delete x.updatedByUser.password;
        }
        return x;
      }),
      total,
    };
  }

  async getByCode(announcementCode) {
    const result = await this.announcementsRepo.findOne({
      where: {
        announcementCode,
        active: true,
      },
      relations: {
        createdByUser: true,
        updatedByUser: true,
      },
    });
    if (!result) {
      throw Error(ANNOUNCEMENTS_ERROR_NOT_FOUND);
    }
    delete result.createdByUser.password;
    if (result?.updatedByUser?.password) {
      delete result.updatedByUser.password;
    }
    return result;
  }

  async create(dto: CreateAnnouncementDto) {
    try {
      return await this.announcementsRepo.manager.transaction(
        async (entityManager) => {
          let announcements = new Announcements();
          announcements.title = dto.title;
          announcements.description = dto.description;
          announcements.targetDate = dto.targetDate;
          announcements.targetType = dto.targetType;
          announcements.targetIds = dto.targetIds;
          announcements.scheduled = dto.scheduled;
          const timestamp = await entityManager
            .query(CONST_QUERYCURRENT_TIMESTAMP)
            .then((res) => {
              return res[0]["timestamp"];
            });
          announcements.createdDate = timestamp;

          const school = await entityManager.findOne(Schools, {
            where: {
              schoolId: dto.schoolId,
              active: true,
            },
          });
          if (!school) {
            throw Error(SCHOOLS_ERROR_NOT_FOUND);
          }
          announcements.school = school;

          const createdByUser = await entityManager.findOne(Users, {
            where: {
              userId: dto.createdByUserId,
              active: true,
            },
          });
          if (!createdByUser) {
            throw Error(USER_ERROR_USER_NOT_FOUND);
          }
          announcements.createdByUser = createdByUser;
          if (dto.action === "SEND") {
            announcements.sent = true;
          } else {
            announcements.draft = true;
          }
          announcements = await entityManager.save(announcements);
          announcements.announcementCode = generateIndentityCode(
            announcements.announcementId
          );
          announcements = await entityManager.save(
            Announcements,
            announcements
          );
          delete announcements.createdByUser.password;
          return announcements;
        }
      );
    } catch (ex) {
      if (
        ex["message"] &&
        (ex["message"].includes("duplicate key") ||
          ex["message"].includes("violates unique constraint")) &&
        ex["message"].includes("u_announcement")
      ) {
        throw Error("Entry already exists!");
      } else {
        throw ex;
      }
    }
  }

  async update(announcementCode, dto: UpdateAnnouncementDto) {
    try {
      return await this.announcementsRepo.manager.transaction(
        async (entityManager) => {
          let announcements = await entityManager.findOne(Announcements, {
            where: {
              announcementCode,
              active: true,
            },
          });
          if (!announcements) {
            throw Error(DEPARTMENTS_ERROR_NOT_FOUND);
          }
          const timestamp = await entityManager
            .query(CONST_QUERYCURRENT_TIMESTAMP)
            .then((res) => {
              return res[0]["timestamp"];
            });
          announcements.updatedDate = timestamp;

          const updatedByUser = await entityManager.findOne(Users, {
            where: {
              userId: dto.updatedByUserId,
              active: true,
            },
          });
          if (!updatedByUser) {
            throw Error(USER_ERROR_USER_NOT_FOUND);
          }
          announcements.updatedByUser = updatedByUser;
          announcements.title = dto.title;
          announcements.description = dto.description;
          announcements.targetDate = dto.targetDate;
          announcements.targetType = dto.targetType;
          announcements.targetIds = dto.targetIds;
          announcements.scheduled = dto.scheduled;
          announcements = await entityManager.save(
            Announcements,
            announcements
          );
          if (announcements?.createdByUser?.password) {
            delete announcements.createdByUser.password;
          }
          if (announcements?.updatedByUser?.password) {
            delete announcements.updatedByUser.password;
          }
          return announcements;
        }
      );
    } catch (ex) {
      if (
        ex["message"] &&
        (ex["message"].includes("duplicate key") ||
          ex["message"].includes("violates unique constraint")) &&
        ex["message"].includes("u_announcement")
      ) {
        throw Error("Entry already exists!");
      } else {
        throw ex;
      }
    }
  }

  async delete(announcementCode) {
    return await this.announcementsRepo.manager.transaction(
      async (entityManager) => {
        const announcements = await entityManager.findOne(Announcements, {
          where: {
            announcementCode,
            active: true,
          },
        });
        if (!announcements) {
          throw Error(DEPARTMENTS_ERROR_NOT_FOUND);
        }
        announcements.active = false;
        const timestamp = await entityManager
          .query(CONST_QUERYCURRENT_TIMESTAMP)
          .then((res) => {
            return res[0]["timestamp"];
          });
        announcements.updatedDate = timestamp;
        return await entityManager.save(Announcements, announcements);
      }
    );
  }
}
