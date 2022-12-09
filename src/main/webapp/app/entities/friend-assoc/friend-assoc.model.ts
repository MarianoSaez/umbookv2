import { IUsuario } from 'app/entities/usuario/usuario.model';

export interface IFriendAssoc {
  id: number;
  usuarios?: Pick<IUsuario, 'id'>[] | null;
}

export type NewFriendAssoc = Omit<IFriendAssoc, 'id'> & { id: null };
