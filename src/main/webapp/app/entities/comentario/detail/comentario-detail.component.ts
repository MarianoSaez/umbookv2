import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IComentario } from '../comentario.model';

@Component({
  selector: 'jhi-comentario-detail',
  templateUrl: './comentario-detail.component.html',
})
export class ComentarioDetailComponent implements OnInit {
  comentario: IComentario | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ comentario }) => {
      this.comentario = comentario;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
