import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ComentarioFormService, ComentarioFormGroup } from './comentario-form.service';
import { IComentario } from '../comentario.model';
import { ComentarioService } from '../service/comentario.service';
import { IFoto } from 'app/entities/foto/foto.model';
import { FotoService } from 'app/entities/foto/service/foto.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

@Component({
  selector: 'jhi-comentario-update',
  templateUrl: './comentario-update.component.html',
})
export class ComentarioUpdateComponent implements OnInit {
  isSaving = false;
  comentario: IComentario | null = null;

  fotosSharedCollection: IFoto[] = [];
  usuariosSharedCollection: IUsuario[] = [];

  editForm: ComentarioFormGroup = this.comentarioFormService.createComentarioFormGroup();

  constructor(
    protected comentarioService: ComentarioService,
    protected comentarioFormService: ComentarioFormService,
    protected fotoService: FotoService,
    protected usuarioService: UsuarioService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareFoto = (o1: IFoto | null, o2: IFoto | null): boolean => this.fotoService.compareFoto(o1, o2);

  compareUsuario = (o1: IUsuario | null, o2: IUsuario | null): boolean => this.usuarioService.compareUsuario(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ comentario }) => {
      this.comentario = comentario;
      if (comentario) {
        this.updateForm(comentario);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const comentario = this.comentarioFormService.getComentario(this.editForm);
    if (comentario.id !== null) {
      this.subscribeToSaveResponse(this.comentarioService.update(comentario));
    } else {
      this.subscribeToSaveResponse(this.comentarioService.create(comentario));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IComentario>>): void {
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

  protected updateForm(comentario: IComentario): void {
    this.comentario = comentario;
    this.comentarioFormService.resetForm(this.editForm, comentario);

    this.fotosSharedCollection = this.fotoService.addFotoToCollectionIfMissing<IFoto>(this.fotosSharedCollection, comentario.foto);
    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(
      this.usuariosSharedCollection,
      comentario.user
    );
  }

  protected loadRelationshipsOptions(): void {
    this.fotoService
      .query()
      .pipe(map((res: HttpResponse<IFoto[]>) => res.body ?? []))
      .pipe(map((fotos: IFoto[]) => this.fotoService.addFotoToCollectionIfMissing<IFoto>(fotos, this.comentario?.foto)))
      .subscribe((fotos: IFoto[]) => (this.fotosSharedCollection = fotos));

    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(map((usuarios: IUsuario[]) => this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(usuarios, this.comentario?.user)))
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));
  }
}
