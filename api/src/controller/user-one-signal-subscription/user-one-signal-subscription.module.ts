import { Module } from "@nestjs/common";
import { UserOneSignalSubscriptionController } from "./user-one-signal-subscription.controller";
import { UserOneSignalSubscriptionService } from "src/services/user-one-signal-subscription.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserOneSignalSubscription } from "src/db/entities/UserOneSignalSubscription";

@Module({
  imports: [TypeOrmModule.forFeature([UserOneSignalSubscription])],
  controllers: [UserOneSignalSubscriptionController],
  providers: [UserOneSignalSubscriptionService],
  exports: [UserOneSignalSubscriptionService],
})
export class UserOneSignalSubscriptionModule {}
