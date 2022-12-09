import { IFriendAssoc, NewFriendAssoc } from './friend-assoc.model';

export const sampleWithRequiredData: IFriendAssoc = {
  id: 10362,
};

export const sampleWithPartialData: IFriendAssoc = {
  id: 94939,
};

export const sampleWithFullData: IFriendAssoc = {
  id: 89859,
};

export const sampleWithNewData: NewFriendAssoc = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
