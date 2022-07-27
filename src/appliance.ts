import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from "@nestjs/swagger";
import { INestApplication } from "@nestjs/common";

import * as compression from "compression";
import { json, urlencoded } from "express";
import * as morgan from "morgan";
import { AppModule } from "./app.module";
import { useContainer } from "class-validator";

import { successResponseSpec } from "utils/response";
import { AllExceptionsFilter } from "exception/http-exception.filter";

const setupApplicance = (app: INestApplication) => {
  app.use(compression());

  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true, limit: "50mb" }));

  app.enableCors();

  app.setGlobalPrefix("api/v1", { exclude: ["/"] });

  app.use(morgan("dev"));

  app.useGlobalFilters(new AllExceptionsFilter());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const swaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      docExpansion: "none",
      persistAuthorization: true,
    },
  };

  const options: SwaggerDocumentOptions = {
    extraModels: [successResponseSpec],
    include: [],
    operationIdFactory: (_controllerKey: string, methodKey: string) =>
      methodKey,
  };

  const docsConfig = new DocumentBuilder()
    .setTitle("AutoCheck Assessment")
    .setDescription("An API that return most occuring titles from HackerNews.")
    .setVersion("1.0")
    .build();

  const sapDocs = SwaggerModule.createDocument(app, docsConfig, options);

  SwaggerModule.setup("api/docs", app, sapDocs, swaggerOptions);
};

export default setupApplicance;
