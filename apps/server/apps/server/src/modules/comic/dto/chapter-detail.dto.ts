import { IChapterDetailParams } from '@comic-app/types';
import { IsNotEmpty } from 'class-validator';

export class ChapterDetailDto implements IChapterDetailParams {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  chapterId: string;
}
