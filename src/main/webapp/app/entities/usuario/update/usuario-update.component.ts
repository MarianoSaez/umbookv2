import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { UsuarioFormService, UsuarioFormGroup } from './usuario-form.service';
import { IUsuario } from '../usuario.model';
import { UsuarioService } from '../service/usuario.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { IFriendAssoc } from 'app/entities/friend-assoc/friend-assoc.model';
import { FriendAssocService } from 'app/entities/friend-assoc/service/friend-assoc.service';

@Component({
  selector: 'jhi-usuario-update',
  templateUrl: './usuario-update.component.html',
})
export class UsuarioUpdateComponent implements OnInit {
  isSaving = false;
  usuario: IUsuario | null = null;

  usersSharedCollection: IUser[] = [];
  friendAssocsSharedCollection: IFriendAssoc[] = [];

  editForm: UsuarioFormGroup = this.usuarioFormService.createUsuarioFormGroup();

  constructor(
    protected usuarioService: UsuarioService,
    protected usuarioFormService: UsuarioFormService,
    protected userService: UserService,
    protected friendAssocService: FriendAssocService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  compareFriendAssoc = (o1: IFriendAssoc | null, o2: IFriendAssoc | null): boolean => this.friendAssocService.compareFriendAssoc(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ usuario }) => {
      this.usuario = usuario;
      if (usuario) {
        this.updateForm(usuario);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const usuario = this.usuarioFormService.getUsuario(this.editForm);
    if (usuario.id !== null) {
      this.subscribeToSaveResponse(this.usuarioService.update(usuario));
    } else {
      this.subscribeToSaveResponse(this.usuarioService.create(usuario));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuario>>): void {
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

  protected updateForm(usuario: IUsuario): void {
    this.usuario = usuario;
    this.usuarioFormService.resetForm(this.editForm, usuario);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, usuario.core);
    this.friendAssocsSharedCollection = this.friendAssocService.addFriendAssocToCollectionIfMissing<IFriendAssoc>(
      this.friendAssocsSharedCollection,
      usuario.amigos
    );
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.usuario?.core)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.friendAssocService
      .query()
      .pipe(map((res: HttpResponse<IFriendAssoc[]>) => res.body ?? []))
      .pipe(
        map((friendAssocs: IFriendAssoc[]) =>
          this.friendAssocService.addFriendAssocToCollectionIfMissing<IFriendAssoc>(friendAssocs, this.usuario?.amigos)
        )
      )
      .subscribe((friendAssocs: IFriendAssoc[]) => (this.friendAssocsSharedCollection = friendAssocs));
  }
}
