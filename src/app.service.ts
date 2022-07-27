import { Injectable } from "@nestjs/common";
import { MyHttpService } from "utils/http.service";

@Injectable()
export class AppService {
  constructor(private readonly httpService: MyHttpService) {}

  async get10In25Titles() {
    const resp = await this.httpService.getCall("newstories.json");
    const last25Ids = resp.slice(0, 25);

    const last25Stories = [];
    let storyTitles: string;
    await Promise.all(
      last25Ids.map(async (id: number) => {
        const story = await this.httpService.getCall(`item/${id}.json`);
        if (!storyTitles) {
          storyTitles = story.title;
        } else {
          storyTitles += " " + story.title;
        }
        last25Stories.push(story);
      })
    );

    const tenHighest = await this.getTenHighest(storyTitles);

    return tenHighest;
  }

  async get10InLastWeekPostTitles() {
    const resp = await this.httpService.getCall("topstories.json");

    const beforeOneWeek = new Date(
      new Date().getTime() - 60 * 60 * 24 * 7 * 1000
    );
    const beforeOneWeek2 = new Date(beforeOneWeek);
    const day = beforeOneWeek.getDay();
    const diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -6 : 1);
    const weekStart = Math.floor(
      new Date(beforeOneWeek.setDate(diffToMonday)).getTime() / 1000
    );
    const weekEnds = Math.floor(
      new Date(beforeOneWeek2.setDate(diffToMonday + 6)).getTime() / 1000
    );

    const lastWeekStories = [];
    let storyTitles: string;

    await Promise.all(
      resp.map(async (id: number) => {
        const story = await this.httpService.getCall(`item/${id}.json`);
        if (story?.time >= weekStart && story?.time <= weekEnds) {
          if (!storyTitles) {
            storyTitles = story?.title;
          } else {
            storyTitles += " " + story?.title;
          }
          lastWeekStories.push(story);
        }
      })
    );

    const tenHighest = await this.getTenHighest(storyTitles);

    return tenHighest;
  }

  async get10In600Titles() {
    const resp = await this.httpService.getCall("topstories.json");

    const usersStories = [];
    let storyTitles: string;
    await Promise.all(
      resp.map(async (id: number) => {
        const story = await this.httpService.getCall(`item/${id}.json`);
        if (story) {
          const user = await this.httpService.getCall(`user/${story.by}.json`);
          if (user && user.karma > 10) {
            if (!storyTitles) {
              storyTitles = story?.title;
            } else {
              storyTitles += " " + story?.title;
            }
            usersStories.push(story);
          }
        }
      })
    );
    const tenHighest = await this.getTenHighest(storyTitles);

    return tenHighest;
  }

  private async getTenHighest(storyTitles) {
    const titlesArr = storyTitles.split(" ");

    const occurrences = titlesArr.reduce((acc, curr) => {
      return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
    }, {});

    const arr = Object.keys(occurrences)
      .map((key) => [key, occurrences[key]])
      .sort(([, a], [, b]) => b - a);
    const result = arr.slice(0, 10);
    const obj = {};
    for (let item of result) {
      obj[item[0]] = item[1];
    }
    return obj;
  }
}
