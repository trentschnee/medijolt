import { User } from "@prisma/client";

export function toUserViewModel(user: User): { id: string; email: string; password: string; isEnabled: boolean; } {
  return {
    id: user.id,
    email: user.email,
    password: user.password,
    isEnabled: user.isEnabled, // Ensure this is always provided
  };
}
