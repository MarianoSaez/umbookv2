import { IFoto } from 'app/entities/foto/foto.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';

export interface IComentario {
  id: number;
  contenido?: string | null;
  foto?: Pick<IFoto, 'id'> | null;
  user?: Pick<IUsuario, 'id'> | null;
}

export type NewComentario = Omit<IComentario, 'id'> & { id: null };
