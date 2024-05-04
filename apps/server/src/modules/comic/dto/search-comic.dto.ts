import { SearchComicParams } from "@packages/types/dto/comic";
import { IsBooleanString, IsNotEmpty, isNotEmpty, IsNumberString, IsString } from "class-validator";

export class SearchComicDto implements SearchComicParams {
  @IsString()
  @IsNotEmpty()
  q: string;
  @IsNumberString()
  limit: number;
  @IsNumberString()
  offset: number;
  @IsString()
  q_type: string;
  @IsBooleanString()
  _update: boolean;
}