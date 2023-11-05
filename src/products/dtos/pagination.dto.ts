import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, Max, Min } from "class-validator";
import { PAGINATION_DEFAULT_LIMIT, PAGINATION_MAX_LIMIT, PAGINATION_MIN_LIMIT, PAGINATION_MIN_PAGE } from "src/common/application.static";

export class PaginationDto {
    @ApiPropertyOptional({
      type: String,
      description: 'This is not a required property',
    })
    @Type(() => Number)
    @IsOptional()
    @IsNumber({
      allowNaN: false,
      allowInfinity: false,
    })
    @Min(PAGINATION_MIN_LIMIT)
    @Max(PAGINATION_MAX_LIMIT)
    limit: number = PAGINATION_DEFAULT_LIMIT;
  
    @ApiPropertyOptional({
      type: String,
      description: 'This is not a required property',
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber({
      allowNaN: false,
      allowInfinity: false,
    })
    @Min(PAGINATION_MIN_PAGE)
    page: number = PAGINATION_MIN_PAGE;
  }