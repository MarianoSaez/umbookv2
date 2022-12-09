import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ComentarioComponent } from '../list/comentario.component';
import { ComentarioDetailComponent } from '../detail/comentario-detail.component';
import { ComentarioUpdateComponent } from '../update/comentario-update.component';
import { ComentarioRoutingResolveService } from './comentario-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const comentarioRoute: Routes = [
  {
    path: '',
    component: ComentarioComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ComentarioDetailComponent,
    resolve: {
      comentario: ComentarioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ComentarioUpdateComponent,
    resolve: {
      comentario: ComentarioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ComentarioUpdateComponent,
    resolve: {
      comentario: ComentarioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(comentarioRoute)],
  exports: [RouterModule],
})
export class ComentarioRoutingModule {}
