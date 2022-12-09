import { IUser } from 'app/entities/user/user.model';
import { IFriendAssoc } from 'app/entities/friend-assoc/friend-assoc.model';

export interface IUsuario {
  id: number;
  core?: Pick<IUser, 'id'> | null;
  amigos?: Pick<IFriendAssoc, 'id'> | null;
  friendAssocs?: Pick<IFriendAssoc, 'id'>[] | null;
}

export type NewUsuario = Omit<IUsuario, 'id'> & { id: null };
