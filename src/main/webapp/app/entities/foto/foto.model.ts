import dayjs from 'dayjs/esm';
import { IAlbum } from 'app/entities/album/album.model';

export interface IFoto {
  id: number;
  caption?: string | null;
  fecha?: dayjs.Dayjs | null;
  album?: Pick<IAlbum, 'id'> | null;
}

export type NewFoto = Omit<IFoto, 'id'> & { id: null };
