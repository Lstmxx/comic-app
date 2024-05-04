import { ComicListParams } from "@packages/types/dto/comic";
import { IsBooleanString, IsInt, IsNotEmpty, IsNumberString } from "class-validator";

export class ComicListDto implements ComicListParams {
  top: string;
  @IsNumberString()
  @IsNotEmpty()
  limit: number;
  @IsNumberString()
  @IsNotEmpty()
  offset: number;
  @IsNotEmpty()
  ordering: string;
  @IsBooleanString()
  _update: boolean;
}