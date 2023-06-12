import { IsString, IsInt, MinLength, IsDate, Max } from 'class-validator';

export class createDTO {
  @IsInt({ message: 'title 必须为数字！' })
  @Max(6, { message: 'title 不能大于6！' })
  title: number;

  @IsString({ message: 'author 必须为字符串！' })
  author: string;

  @IsString({ message: 'content 必须为字符串！' })
  content: string;

  @IsString({ message: 'thumb_url 必须为字符串！' })
  thumb_url: string;

  @IsInt({ message: 'type 必须为数字！' })
  type: number

  // @IsDate({ message: '必须为字符串！' })
  // create_time: Date

  // @IsDate({ message: '必须为字符串！' })
  // update_time: Date
}