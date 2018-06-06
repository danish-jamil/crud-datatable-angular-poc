import { Injectable } from '@angular/core';
import { RestService } from '@admin/services/rest.service';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '@admin/error-handler/error-handler.service';
import { Entity } from '@admin/models/entity';

import * as _Global from '@admin/constants/constants';

@Injectable()
export class UsersService extends RestService<User> {
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
    return `${_Global.Constant.asi.smartLinkUrl}/v1/web_apps/${
      _Global.Constant.asi.appId
    }/users`;
  }

  getInstance(): Entity {
    return new User();
  }
}
