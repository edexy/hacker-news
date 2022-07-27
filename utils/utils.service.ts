import { Injectable, ValidationError } from '@nestjs/common';
import { configuration } from '../config/index';

@Injectable()
export class UtilsService {
  

  transformErrors(errors: ValidationError[] | ValidationError[][]) {
    const clientError = errors.map((error: any) => {
      if (!error.children.length) {
        const [prop] = Object.getOwnPropertyNames(error.constraints);

        return {
          [error.property]: error.constraints[prop],
        };
      } else {
        const mappedErrors = error.children.map((err: any) => {
          const errs = err.children.reduce(
            (accumulatedErrors: any, validator: any) => {
              if (validator.constraints) {
                const [prop] = Object.getOwnPropertyNames(
                  validator.constraints,
                );

                return {
                  ...accumulatedErrors,
                  [validator.property]: validator.constraints[prop],
                };
              }
            },
            {},
          );

          return errs;
        });

        return mappedErrors;
      }
    });

    return clientError;
  }

}
