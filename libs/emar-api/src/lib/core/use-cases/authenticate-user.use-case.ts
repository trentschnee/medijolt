import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isAxiosError } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private readonly httpService: HttpService, // To communicate with the user-management API
    private readonly jwtService: JwtService
  ) { }

  async execute(email: string, password: string): Promise<string> {
    try {
      // Make a POST request to the user-management API's authentication endpoint
      const response = await lastValueFrom(
        this.httpService.post('http://localhost:3000/api/auth/login', { email, password })
      );
      const userData = response.data;

      // Generate JWT token using user data
      const token = this.jwtService.sign({ userId: userData.id, email: userData.email });
      // Return the JWT token from the user-management API
      return token
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new UnauthorizedException('Invalid credentials');
        }
      }
      // Handle errors (e.g., unauthorized)


      throw new Error('Failed to authenticate with user-management API');
    }
  }
}
