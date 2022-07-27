import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import setupApplicance from "./appliance";

import logger from "utils/logger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupApplicance(app);
  const port = process.env.PORT || 3333;

  await app.listen(port, () => {
    logger.info(`App listening to port ${port}`);
  });
}
bootstrap();
