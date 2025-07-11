import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { lastValueFrom, isObservable } from 'rxjs';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    let activate = await super.canActivate(context);
    if (isObservable(activate)) {
      activate = await lastValueFrom(activate);
    }
    return activate;
  }
}
