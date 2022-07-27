import { ApiProperty } from '@nestjs/swagger';

export interface objectResponse {
  [props: string]: any;
}

export class errorResponseSpec {
  @ApiProperty()
  message?: Array<string>;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  error: string;
}

export class successResponseSpec {
  @ApiProperty()
  status: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  data: Array<objectResponse> | objectResponse | null;
}

export const errorResponse = (error: errorResponseSpec) => ({
  status: 'Fail',
  statusCode: error.statusCode,
  error: error.message?.length > 0 ? error.message : error.error,
});

export const successResponse = (
  message: string,
  statusCode = 200,
  data: Array<objectResponse> | objectResponse | null = null,
  isPaginationData = false,

): successResponseSpec => ({
  status: 'Success',
  statusCode,
  message,
  ...(!(data == null) && { data }),
});
