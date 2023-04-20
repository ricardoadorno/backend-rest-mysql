import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { comparePassword } from "utils/hashPassword";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException("User does not exist!");
    }

    if (!comparePassword(password, user.password)) {
      throw new UnauthorizedException(
        "Invalid password! Please try again with correct password."
      );
    }

    const payload = { name: user.name, email: user.email, id: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
