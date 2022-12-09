import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FriendAssocComponent } from '../list/friend-assoc.component';
import { FriendAssocDetailComponent } from '../detail/friend-assoc-detail.component';
import { FriendAssocUpdateComponent } from '../update/friend-assoc-update.component';
import { FriendAssocRoutingResolveService } from './friend-assoc-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const friendAssocRoute: Routes = [
  {
    path: '',
    component: FriendAssocComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FriendAssocDetailComponent,
    resolve: {
      friendAssoc: FriendAssocRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FriendAssocUpdateComponent,
    resolve: {
      friendAssoc: FriendAssocRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FriendAssocUpdateComponent,
    resolve: {
      friendAssoc: FriendAssocRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(friendAssocRoute)],
  exports: [RouterModule],
})
export class FriendAssocRoutingModule {}
