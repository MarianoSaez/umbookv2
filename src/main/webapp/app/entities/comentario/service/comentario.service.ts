import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IComentario, NewComentario } from '../comentario.model';

export type PartialUpdateComentario = Partial<IComentario> & Pick<IComentario, 'id'>;

export type EntityResponseType = HttpResponse<IComentario>;
export type EntityArrayResponseType = HttpResponse<IComentario[]>;

@Injectable({ providedIn: 'root' })
export class ComentarioService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/comentarios');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(comentario: NewComentario): Observable<EntityResponseType> {
    return this.http.post<IComentario>(this.resourceUrl, comentario, { observe: 'response' });
  }

  update(comentario: IComentario): Observable<EntityResponseType> {
    return this.http.put<IComentario>(`${this.resourceUrl}/${this.getComentarioIdentifier(comentario)}`, comentario, {
      observe: 'response',
    });
  }

  partialUpdate(comentario: PartialUpdateComentario): Observable<EntityResponseType> {
    return this.http.patch<IComentario>(`${this.resourceUrl}/${this.getComentarioIdentifier(comentario)}`, comentario, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IComentario>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IComentario[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getComentarioIdentifier(comentario: Pick<IComentario, 'id'>): number {
    return comentario.id;
  }

  compareComentario(o1: Pick<IComentario, 'id'> | null, o2: Pick<IComentario, 'id'> | null): boolean {
    return o1 && o2 ? this.getComentarioIdentifier(o1) === this.getComentarioIdentifier(o2) : o1 === o2;
  }

  addComentarioToCollectionIfMissing<Type extends Pick<IComentario, 'id'>>(
    comentarioCollection: Type[],
    ...comentariosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const comentarios: Type[] = comentariosToCheck.filter(isPresent);
    if (comentarios.length > 0) {
      const comentarioCollectionIdentifiers = comentarioCollection.map(comentarioItem => this.getComentarioIdentifier(comentarioItem)!);
      const comentariosToAdd = comentarios.filter(comentarioItem => {
        const comentarioIdentifier = this.getComentarioIdentifier(comentarioItem);
        if (comentarioCollectionIdentifiers.includes(comentarioIdentifier)) {
          return false;
        }
        comentarioCollectionIdentifiers.push(comentarioIdentifier);
        return true;
      });
      return [...comentariosToAdd, ...comentarioCollection];
    }
    return comentarioCollection;
  }
}
