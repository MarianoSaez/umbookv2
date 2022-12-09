import { IComentario, NewComentario } from './comentario.model';

export const sampleWithRequiredData: IComentario = {
  id: 63345,
};

export const sampleWithPartialData: IComentario = {
  id: 23690,
  contenido: 'Metal',
};

export const sampleWithFullData: IComentario = {
  id: 18384,
  contenido: 'Plástico Jordania',
};

export const sampleWithNewData: NewComentario = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
