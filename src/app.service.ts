import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class staffService {
  getHello(): string {
    return 'Hello World!';
  }
}