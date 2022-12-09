import { IUsuario } from 'app/entities/usuario/usuario.model';

export interface IAlbum {
  id: number;
  name?: string | null;
  user?: Pick<IUsuario, 'id'> | null;
}

export type NewAlbum = Omit<IAlbum, 'id'> & { id: null };
