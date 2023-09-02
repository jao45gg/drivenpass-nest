import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UsersRepository } from "../users/users.repository";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly usersRepository: UsersRepository) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const auth = (authorization ?? "").split(" ")[1];
      if (!auth) return false;
      const data = await this.usersRepository.checkToken(auth);
      if (!data) return false;

      const user = await this.usersRepository.getUserById(data.userId);
      request.user = user;
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }
}
