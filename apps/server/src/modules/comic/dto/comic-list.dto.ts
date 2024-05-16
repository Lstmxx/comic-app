import { IComicListParams } from '@comic-app/types';
import { IsBooleanString, IsNotEmpty, IsNumberString } from 'class-validator';

export class ComicListDto implements IComicListParams {
  theme: string;
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
