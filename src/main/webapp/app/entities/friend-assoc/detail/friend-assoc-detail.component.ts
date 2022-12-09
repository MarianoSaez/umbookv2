import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFriendAssoc } from '../friend-assoc.model';

@Component({
  selector: 'jhi-friend-assoc-detail',
  templateUrl: './friend-assoc-detail.component.html',
})
export class FriendAssocDetailComponent implements OnInit {
  friendAssoc: IFriendAssoc | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ friendAssoc }) => {
      this.friendAssoc = friendAssoc;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
