import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFoto, NewFoto } from '../foto.model';

export type PartialUpdateFoto = Partial<IFoto> & Pick<IFoto, 'id'>;

type RestOf<T extends IFoto | NewFoto> = Omit<T, 'fecha'> & {
  fecha?: string | null;
};

export type RestFoto = RestOf<IFoto>;

export type NewRestFoto = RestOf<NewFoto>;

export type PartialUpdateRestFoto = RestOf<PartialUpdateFoto>;

export type EntityResponseType = HttpResponse<IFoto>;
export type EntityArrayResponseType = HttpResponse<IFoto[]>;

@Injectable({ providedIn: 'root' })
export class FotoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fotos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(foto: NewFoto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(foto);
    return this.http.post<RestFoto>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(foto: IFoto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(foto);
    return this.http
      .put<RestFoto>(`${this.resourceUrl}/${this.getFotoIdentifier(foto)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(foto: PartialUpdateFoto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(foto);
    return this.http
      .patch<RestFoto>(`${this.resourceUrl}/${this.getFotoIdentifier(foto)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestFoto>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFoto[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFotoIdentifier(foto: Pick<IFoto, 'id'>): number {
    return foto.id;
  }

  compareFoto(o1: Pick<IFoto, 'id'> | null, o2: Pick<IFoto, 'id'> | null): boolean {
    return o1 && o2 ? this.getFotoIdentifier(o1) === this.getFotoIdentifier(o2) : o1 === o2;
  }

  addFotoToCollectionIfMissing<Type extends Pick<IFoto, 'id'>>(
    fotoCollection: Type[],
    ...fotosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fotos: Type[] = fotosToCheck.filter(isPresent);
    if (fotos.length > 0) {
      const fotoCollectionIdentifiers = fotoCollection.map(fotoItem => this.getFotoIdentifier(fotoItem)!);
      const fotosToAdd = fotos.filter(fotoItem => {
        const fotoIdentifier = this.getFotoIdentifier(fotoItem);
        if (fotoCollectionIdentifiers.includes(fotoIdentifier)) {
          return false;
        }
        fotoCollectionIdentifiers.push(fotoIdentifier);
        return true;
      });
      return [...fotosToAdd, ...fotoCollection];
    }
    return fotoCollection;
  }

  protected convertDateFromClient<T extends IFoto | NewFoto | PartialUpdateFoto>(foto: T): RestOf<T> {
    return {
      ...foto,
      fecha: foto.fecha?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restFoto: RestFoto): IFoto {
    return {
      ...restFoto,
      fecha: restFoto.fecha ? dayjs(restFoto.fecha) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestFoto>): HttpResponse<IFoto> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestFoto[]>): HttpResponse<IFoto[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
