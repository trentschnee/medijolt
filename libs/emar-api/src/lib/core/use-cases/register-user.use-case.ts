import { HttpService } from '@nestjs/axios';
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isAxiosError } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly httpService: HttpService, // To communicate with the user-management API
    private readonly jwtService: JwtService
  ) { }

  async execute(email: string, password: string): Promise<string> {
    try {
      // Make a POST request to the user-management API's registration endpoint
      const response = await lastValueFrom(
        this.httpService.post('http://localhost:3000/api/auth/register', { email, password })
      );
      const userData = response.data;

      // Generate JWT token using user data
      const token = this.jwtService.sign({ userId: userData.id, email: userData.email });

      // Return the JWT token from the user-management API
      return token;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 409) {
          throw new ConflictException('User already exists');
        }
        // Handle other status codes as needed
      }
      // Handle generic errors
      throw new Error('Failed to register with user-management API');
    }
  }
}
