import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'usuario',
        data: { pageTitle: 'umbookv2App.usuario.home.title' },
        loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule),
      },
      {
        path: 'album',
        data: { pageTitle: 'umbookv2App.album.home.title' },
        loadChildren: () => import('./album/album.module').then(m => m.AlbumModule),
      },
      {
        path: 'foto',
        data: { pageTitle: 'umbookv2App.foto.home.title' },
        loadChildren: () => import('./foto/foto.module').then(m => m.FotoModule),
      },
      {
        path: 'comentario',
        data: { pageTitle: 'umbookv2App.comentario.home.title' },
        loadChildren: () => import('./comentario/comentario.module').then(m => m.ComentarioModule),
      },
      {
        path: 'notification',
        data: { pageTitle: 'umbookv2App.notification.home.title' },
        loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule),
      },
      {
        path: 'friend-assoc',
        data: { pageTitle: 'umbookv2App.friendAssoc.home.title' },
        loadChildren: () => import('./friend-assoc/friend-assoc.module').then(m => m.FriendAssocModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
