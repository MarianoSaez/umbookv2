import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FriendAssocComponent } from './list/friend-assoc.component';
import { FriendAssocDetailComponent } from './detail/friend-assoc-detail.component';
import { FriendAssocUpdateComponent } from './update/friend-assoc-update.component';
import { FriendAssocDeleteDialogComponent } from './delete/friend-assoc-delete-dialog.component';
import { FriendAssocRoutingModule } from './route/friend-assoc-routing.module';

@NgModule({
  imports: [SharedModule, FriendAssocRoutingModule],
  declarations: [FriendAssocComponent, FriendAssocDetailComponent, FriendAssocUpdateComponent, FriendAssocDeleteDialogComponent],
})
export class FriendAssocModule {}
