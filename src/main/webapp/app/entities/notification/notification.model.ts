import { IUsuario } from 'app/entities/usuario/usuario.model';

export interface INotification {
  id: number;
  contendio?: string | null;
  emisor?: Pick<IUsuario, 'id'> | null;
  user?: Pick<IUsuario, 'id'> | null;
}

export type NewNotification = Omit<INotification, 'id'> & { id: null };
