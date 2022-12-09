import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFriendAssoc, NewFriendAssoc } from '../friend-assoc.model';

export type PartialUpdateFriendAssoc = Partial<IFriendAssoc> & Pick<IFriendAssoc, 'id'>;

export type EntityResponseType = HttpResponse<IFriendAssoc>;
export type EntityArrayResponseType = HttpResponse<IFriendAssoc[]>;

@Injectable({ providedIn: 'root' })
export class FriendAssocService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/friend-assocs');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(friendAssoc: NewFriendAssoc): Observable<EntityResponseType> {
    return this.http.post<IFriendAssoc>(this.resourceUrl, friendAssoc, { observe: 'response' });
  }

  update(friendAssoc: IFriendAssoc): Observable<EntityResponseType> {
    return this.http.put<IFriendAssoc>(`${this.resourceUrl}/${this.getFriendAssocIdentifier(friendAssoc)}`, friendAssoc, {
      observe: 'response',
    });
  }

  partialUpdate(friendAssoc: PartialUpdateFriendAssoc): Observable<EntityResponseType> {
    return this.http.patch<IFriendAssoc>(`${this.resourceUrl}/${this.getFriendAssocIdentifier(friendAssoc)}`, friendAssoc, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFriendAssoc>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFriendAssoc[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFriendAssocIdentifier(friendAssoc: Pick<IFriendAssoc, 'id'>): number {
    return friendAssoc.id;
  }

  compareFriendAssoc(o1: Pick<IFriendAssoc, 'id'> | null, o2: Pick<IFriendAssoc, 'id'> | null): boolean {
    return o1 && o2 ? this.getFriendAssocIdentifier(o1) === this.getFriendAssocIdentifier(o2) : o1 === o2;
  }

  addFriendAssocToCollectionIfMissing<Type extends Pick<IFriendAssoc, 'id'>>(
    friendAssocCollection: Type[],
    ...friendAssocsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const friendAssocs: Type[] = friendAssocsToCheck.filter(isPresent);
    if (friendAssocs.length > 0) {
      const friendAssocCollectionIdentifiers = friendAssocCollection.map(
        friendAssocItem => this.getFriendAssocIdentifier(friendAssocItem)!
      );
      const friendAssocsToAdd = friendAssocs.filter(friendAssocItem => {
        const friendAssocIdentifier = this.getFriendAssocIdentifier(friendAssocItem);
        if (friendAssocCollectionIdentifiers.includes(friendAssocIdentifier)) {
          return false;
        }
        friendAssocCollectionIdentifiers.push(friendAssocIdentifier);
        return true;
      });
      return [...friendAssocsToAdd, ...friendAssocCollection];
    }
    return friendAssocCollection;
  }
}
