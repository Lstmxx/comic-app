import { SearchComicParams } from '@copymanga-app/types';
import {
  IsBooleanString,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';

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
