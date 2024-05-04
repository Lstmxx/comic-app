import { SearchComicParams } from "@packages/types/dto/comic";
import { IsInt, IsNotEmpty, IsNumberString } from "class-validator";

export class SearchComicDto implements SearchComicParams {
  @IsNumberString()
  @IsNotEmpty()
  limit: number;
  @IsNumberString()
  @IsNotEmpty()
  offset: number;
  ordering: string;
  _update: boolean;
}