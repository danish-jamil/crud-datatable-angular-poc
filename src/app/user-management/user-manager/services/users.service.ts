import { Injectable } from '@angular/core';
import { RestService } from '../../../shared/services/rest.service';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../../../shared/error-handler/error-handler.service';
import { Entity } from '../../../shared/models/entity';

import * as _Global from '../../../shared/constants/constants';

@Injectable()
export class CouponService extends RestService<User> {
  constructor(
    protected httpClient: HttpClient,
    protected errorHandler: ErrorHandlerService
  ) {
    super(httpClient, errorHandler);
  }

  getId(user: User): number {
    return 1;
  }

  getUri(): string {
    return (
      _Global.Constant.asi.smartLinkUrl +
      '/v1/users/' +
      _Global.Constant.asi.companyId +
      '/list'
    );
  }

  getInstance(): Entity {
    return new User();
  }
}
