import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IComentario } from '../comentario.model';
import { ComentarioService } from '../service/comentario.service';

@Injectable({ providedIn: 'root' })
export class ComentarioRoutingResolveService implements Resolve<IComentario | null> {
  constructor(protected service: ComentarioService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IComentario | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((comentario: HttpResponse<IComentario>) => {
          if (comentario.body) {
            return of(comentario.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
