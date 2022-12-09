import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IFriendAssoc } from '../friend-assoc.model';
import { FriendAssocService } from '../service/friend-assoc.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './friend-assoc-delete-dialog.component.html',
})
export class FriendAssocDeleteDialogComponent {
  friendAssoc?: IFriendAssoc;

  constructor(protected friendAssocService: FriendAssocService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.friendAssocService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
