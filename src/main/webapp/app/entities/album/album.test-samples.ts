import { IAlbum, NewAlbum } from './album.model';

export const sampleWithRequiredData: IAlbum = {
  id: 51589,
};

export const sampleWithPartialData: IAlbum = {
  id: 81169,
};

export const sampleWithFullData: IAlbum = {
  id: 15229,
  name: 'Rústico transmitter coherente',
};

export const sampleWithNewData: NewAlbum = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
