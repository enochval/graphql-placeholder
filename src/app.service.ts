import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'GraphQL implementation of {JSON} Placeholder API';
  }
}
