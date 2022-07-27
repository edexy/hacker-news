import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { successResponse } from "utils/response";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({
    status: 200,
    description: "Success",
  })
  @ApiResponse({
    status: 500,
    description: "Server Error",
  })
  @ApiOperation({
    summary: "Top 10 most occurring words in the titles of the last 25 stories",
  })
  @Get("most-occuring-10-titles-25-stories")
  async get10In25Titles() {
    const result = await this.appService.get10In25Titles();
    return successResponse(
      "Most 10 occuring words fetched success",
      200,
      result
    );
  }

  @ApiResponse({
    status: 200,
    description: "Success",
  })
  @ApiResponse({
    status: 500,
    description: "Server Error",
  })
  @ApiOperation({
    summary:
      "Top 10 most occurring words in the titles of the post of exactly the last week",
  })
  @Get("most-occuring-10-titles-last-week")
  async get10InLastWeekPostTitles() {
    const result = await this.appService.get10InLastWeekPostTitles();
    return successResponse(
      "Most 10 occuring words fetched success",
      200,
      result
    );
  }

  @ApiResponse({
    status: 200,
    description: "Success",
  })
  @ApiResponse({
    status: 500,
    description: "Server Error",
  })
  @ApiOperation({
    summary:
      "Top 10 most occurring words in titles of the last 600 stories of users with at least 10.000 karma",
  })
  @Get("most-occuring-10-titles-600-stories")
  async getHello() {
    const result = await this.appService.get10In600Titles();
    return successResponse(
      "Most 10 occuring words fetched success",
      200,
      result
    );
  }
}
