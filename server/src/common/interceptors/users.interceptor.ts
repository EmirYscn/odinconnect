import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { map, Observable } from 'rxjs';

/**
 * Omits the password field from a user object.
 * @param user - The user object from which to omit the password.
 * @returns A new object without the password field.
 */

function omitPassword(user: User) {
  if (!user || typeof user !== 'object') return user;
  const { password: _, ...rest } = user;
  return rest;
}

@Injectable()
export class UsersInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<User[] | User>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map(omitPassword);
        }
        return omitPassword(data);
      }),
    );
  }
}
