import { Module } from "@nestjs/common";
import { UserOneSignalSubscriptionController } from "./user-one-signal-subscription.controller";
import { UserOneSignalSubscriptionService } from "src/services/user-one-signal-subscription.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserOneSignalSubscription } from "src/db/entities/UserOneSignalSubscription";
import { PusherService } from "src/services/pusher.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserOneSignalSubscription])],
  controllers: [UserOneSignalSubscriptionController],
  providers: [UserOneSignalSubscriptionService, PusherService],
  exports: [UserOneSignalSubscriptionService, PusherService],
})
export class UserOneSignalSubscriptionModule {}
