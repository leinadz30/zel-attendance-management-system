import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { text } from "express";
import { firstValueFrom, catchError } from "rxjs";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class OneSignalNotificationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService
  ) {}

  async sendToSubscriber(
    subscriptionIds: any[],
    type,
    referenceId,
    title,
    description
  ) {
    const url = this.config.get<string>("ONE_SIGNAL_NOTIF_URL");
    const apiKey = this.config.get<string>("ONE_SIGNAL_API_KEY");
    let result;
    try {
      result = await firstValueFrom(
        this.httpService
          .post<any>(
            url,
            {
              app_id: this.config.get<string>("ONE_SIGNAL_APP_ID"),
              include_subscription_ids: subscriptionIds,
              data: {
                type,
                referenceId,
              },
              big_picture: this.config.get<string>("ONE_SIGNAL_NOTIF_IMAGE"),
              headings: {
                en: title,
              },
              contents: {
                en: description,
              },
              android_sound: this.config.get<string>(
                "ONE_SIGNAL_NOTIF_A_SOUND"
              ),
              android_channel_id: this.config.get<string>(
                "ONE_SIGNAL_NOTIF_A_CHANNEL_ID"
              ),
              existing_android_channel_id: this.config.get<string>(
                "ONE_SIGNAL_NOTIF_A_EXISTING_CHANNEL_ID"
              ),
            },
            {
              responseType: "json",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + apiKey,
              },
            }
          )
          .pipe(
            catchError((error) => {
              throw new HttpException(error.response, HttpStatus.BAD_REQUEST);
            })
          )
      );
    } catch (ex) {}
    console.log(result?.data);
    return result?.data;
  }
}
