import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { IRequest } from '../interfaces/auth.interface';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

import { RoleType } from 'src/auth/interfaces/auth.interface';

const RoleGuard = (roles: RoleType[]): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<IRequest>();
      const isAdmin = request.user.isAdmin;

      const myRole: RoleType = isAdmin ? 'Admin' : 'User';

      let match = false;
      if (roles.includes(myRole)) {
        match = true;
      }

      return match;
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
