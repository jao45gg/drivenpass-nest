import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UsersRepository } from "../users/users.repository";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly usersRepository: UsersRepository) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const data = await this.usersRepository.checkToken(
        (authorization ?? "").split(" ")[1],
      );
      const user = await this.usersRepository.getUserById(data.id);
      request.user = user;
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }
}
