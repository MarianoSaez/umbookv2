import dayjs from 'dayjs/esm';

import { IFoto, NewFoto } from './foto.model';

export const sampleWithRequiredData: IFoto = {
  id: 6821,
};

export const sampleWithPartialData: IFoto = {
  id: 76025,
};

export const sampleWithFullData: IFoto = {
  id: 8304,
  caption: 'Acero payment withdrawal',
  fecha: dayjs('2022-12-08T03:31'),
};

export const sampleWithNewData: NewFoto = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
