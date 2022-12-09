import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFriendAssoc } from '../friend-assoc.model';
import { FriendAssocService } from '../service/friend-assoc.service';

@Injectable({ providedIn: 'root' })
export class FriendAssocRoutingResolveService implements Resolve<IFriendAssoc | null> {
  constructor(protected service: FriendAssocService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFriendAssoc | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((friendAssoc: HttpResponse<IFriendAssoc>) => {
          if (friendAssoc.body) {
            return of(friendAssoc.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
