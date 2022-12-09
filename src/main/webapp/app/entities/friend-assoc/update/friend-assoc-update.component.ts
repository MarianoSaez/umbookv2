import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { FriendAssocFormService, FriendAssocFormGroup } from './friend-assoc-form.service';
import { IFriendAssoc } from '../friend-assoc.model';
import { FriendAssocService } from '../service/friend-assoc.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

@Component({
  selector: 'jhi-friend-assoc-update',
  templateUrl: './friend-assoc-update.component.html',
})
export class FriendAssocUpdateComponent implements OnInit {
  isSaving = false;
  friendAssoc: IFriendAssoc | null = null;

  usuariosSharedCollection: IUsuario[] = [];

  editForm: FriendAssocFormGroup = this.friendAssocFormService.createFriendAssocFormGroup();

  constructor(
    protected friendAssocService: FriendAssocService,
    protected friendAssocFormService: FriendAssocFormService,
    protected usuarioService: UsuarioService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUsuario = (o1: IUsuario | null, o2: IUsuario | null): boolean => this.usuarioService.compareUsuario(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ friendAssoc }) => {
      this.friendAssoc = friendAssoc;
      if (friendAssoc) {
        this.updateForm(friendAssoc);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const friendAssoc = this.friendAssocFormService.getFriendAssoc(this.editForm);
    if (friendAssoc.id !== null) {
      this.subscribeToSaveResponse(this.friendAssocService.update(friendAssoc));
    } else {
      this.subscribeToSaveResponse(this.friendAssocService.create(friendAssoc));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFriendAssoc>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(friendAssoc: IFriendAssoc): void {
    this.friendAssoc = friendAssoc;
    this.friendAssocFormService.resetForm(this.editForm, friendAssoc);

    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(
      this.usuariosSharedCollection,
      ...(friendAssoc.usuarios ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) =>
          this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(usuarios, ...(this.friendAssoc?.usuarios ?? []))
        )
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));
  }
}
