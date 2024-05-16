import { ISearchComicParams } from '@comic-app/types';
import {
  IsBooleanString,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';

export class SearchComicDto implements ISearchComicParams {
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
