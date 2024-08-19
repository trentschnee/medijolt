// libs/medijolt-emar-api/src/auth/adapters/user-management-api.adapter.ts
import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class UserManagementApiAdapter {
  constructor(private readonly httpService: HttpService) { }

  async register(email: string, password: string) {
    const response = await this.httpService.post('http://localhost:3000/api/auth/register', {
      email,
      password,
    }).toPromise();
    return response.data;
  }

  async login(email: string, password: string) {
    const response = await this.httpService.post('http://localhost:3000/api/auth/login', {
      email,
      password,
    }).toPromise();
    return response.data;
  }
}
