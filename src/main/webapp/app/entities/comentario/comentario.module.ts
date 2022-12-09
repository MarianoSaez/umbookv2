import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ComentarioComponent } from './list/comentario.component';
import { ComentarioDetailComponent } from './detail/comentario-detail.component';
import { ComentarioUpdateComponent } from './update/comentario-update.component';
import { ComentarioDeleteDialogComponent } from './delete/comentario-delete-dialog.component';
import { ComentarioRoutingModule } from './route/comentario-routing.module';

@NgModule({
  imports: [SharedModule, ComentarioRoutingModule],
  declarations: [ComentarioComponent, ComentarioDetailComponent, ComentarioUpdateComponent, ComentarioDeleteDialogComponent],
})
export class ComentarioModule {}
