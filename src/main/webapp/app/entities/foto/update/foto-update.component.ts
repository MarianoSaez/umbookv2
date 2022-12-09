import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { FotoFormService, FotoFormGroup } from './foto-form.service';
import { IFoto } from '../foto.model';
import { FotoService } from '../service/foto.service';
import { IAlbum } from 'app/entities/album/album.model';
import { AlbumService } from 'app/entities/album/service/album.service';

@Component({
  selector: 'jhi-foto-update',
  templateUrl: './foto-update.component.html',
})
export class FotoUpdateComponent implements OnInit {
  isSaving = false;
  foto: IFoto | null = null;

  albumsSharedCollection: IAlbum[] = [];

  editForm: FotoFormGroup = this.fotoFormService.createFotoFormGroup();

  constructor(
    protected fotoService: FotoService,
    protected fotoFormService: FotoFormService,
    protected albumService: AlbumService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareAlbum = (o1: IAlbum | null, o2: IAlbum | null): boolean => this.albumService.compareAlbum(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ foto }) => {
      this.foto = foto;
      if (foto) {
        this.updateForm(foto);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const foto = this.fotoFormService.getFoto(this.editForm);
    if (foto.id !== null) {
      this.subscribeToSaveResponse(this.fotoService.update(foto));
    } else {
      this.subscribeToSaveResponse(this.fotoService.create(foto));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFoto>>): void {
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

  protected updateForm(foto: IFoto): void {
    this.foto = foto;
    this.fotoFormService.resetForm(this.editForm, foto);

    this.albumsSharedCollection = this.albumService.addAlbumToCollectionIfMissing<IAlbum>(this.albumsSharedCollection, foto.album);
  }

  protected loadRelationshipsOptions(): void {
    this.albumService
      .query()
      .pipe(map((res: HttpResponse<IAlbum[]>) => res.body ?? []))
      .pipe(map((albums: IAlbum[]) => this.albumService.addAlbumToCollectionIfMissing<IAlbum>(albums, this.foto?.album)))
      .subscribe((albums: IAlbum[]) => (this.albumsSharedCollection = albums));
  }
}
