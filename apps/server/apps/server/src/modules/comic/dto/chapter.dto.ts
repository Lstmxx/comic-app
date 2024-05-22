import { IChapterParams } from '@comic-app/types';
import { IsNotEmpty, IsBooleanString } from 'class-validator';

export class ChapterDto implements IChapterParams {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  groupType: string;
  @IsNotEmpty()
  limit: string;
  @IsNotEmpty()
  offset: string;
  @IsBooleanString()
  _update: boolean;
}
