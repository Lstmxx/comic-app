import { IComicPageParams } from '@comic-app/types';
import { IsBooleanString, IsNotEmpty, IsNumberString } from 'class-validator';

export class ComicPageDto implements IComicPageParams {
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
