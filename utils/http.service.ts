import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { HTTPREQUESTMETHOD } from "./constant";
import logger from "./logger";


@Injectable()
export class MyHttpService {
    private readonly baseUrl = 'https://hacker-news.firebaseio.com/v0';
    constructor(
        private readonly httpService: HttpService,
      ){}

      async getCall<T>(endpoint: string) {
    
        logger.info(
          `About calling endpoint: ${endpoint} on HackerNews API of method: ${HTTPREQUESTMETHOD.GET}`,
        );
    
        try {
          const response = await lastValueFrom(this.httpService.get(`${this.baseUrl}/${endpoint}`))
    
          logger.info(
            `endpoint: ${endpoint}, response status from HackerNews API ${JSON.stringify(
              response?.status,
            )}`,
          );
    
          return response?.data;
        } catch (error) {
          const logError = error.response?.data ? error.response?.data : error;
          logger.error(
            `An error occurred while calling HackerNews API for '${endpoint}', error: ${JSON.stringify(
              logError,
            )}, status: ${error.response?.status}`,
          );
        }
      }
}








