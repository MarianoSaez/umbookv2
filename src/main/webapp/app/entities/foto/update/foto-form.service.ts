import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IFoto, NewFoto } from '../foto.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFoto for edit and NewFotoFormGroupInput for create.
 */
type FotoFormGroupInput = IFoto | PartialWithRequiredKeyOf<NewFoto>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IFoto | NewFoto> = Omit<T, 'fecha'> & {
  fecha?: string | null;
};

type FotoFormRawValue = FormValueOf<IFoto>;

type NewFotoFormRawValue = FormValueOf<NewFoto>;

type FotoFormDefaults = Pick<NewFoto, 'id' | 'fecha'>;

type FotoFormGroupContent = {
  id: FormControl<FotoFormRawValue['id'] | NewFoto['id']>;
  caption: FormControl<FotoFormRawValue['caption']>;
  fecha: FormControl<FotoFormRawValue['fecha']>;
  album: FormControl<FotoFormRawValue['album']>;
};

export type FotoFormGroup = FormGroup<FotoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FotoFormService {
  createFotoFormGroup(foto: FotoFormGroupInput = { id: null }): FotoFormGroup {
    const fotoRawValue = this.convertFotoToFotoRawValue({
      ...this.getFormDefaults(),
      ...foto,
    });
    return new FormGroup<FotoFormGroupContent>({
      id: new FormControl(
        { value: fotoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      caption: new FormControl(fotoRawValue.caption),
      fecha: new FormControl(fotoRawValue.fecha),
      album: new FormControl(fotoRawValue.album),
    });
  }

  getFoto(form: FotoFormGroup): IFoto | NewFoto {
    return this.convertFotoRawValueToFoto(form.getRawValue() as FotoFormRawValue | NewFotoFormRawValue);
  }

  resetForm(form: FotoFormGroup, foto: FotoFormGroupInput): void {
    const fotoRawValue = this.convertFotoToFotoRawValue({ ...this.getFormDefaults(), ...foto });
    form.reset(
      {
        ...fotoRawValue,
        id: { value: fotoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FotoFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      fecha: currentTime,
    };
  }

  private convertFotoRawValueToFoto(rawFoto: FotoFormRawValue | NewFotoFormRawValue): IFoto | NewFoto {
    return {
      ...rawFoto,
      fecha: dayjs(rawFoto.fecha, DATE_TIME_FORMAT),
    };
  }

  private convertFotoToFotoRawValue(
    foto: IFoto | (Partial<NewFoto> & FotoFormDefaults)
  ): FotoFormRawValue | PartialWithRequiredKeyOf<NewFotoFormRawValue> {
    return {
      ...foto,
      fecha: foto.fecha ? foto.fecha.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
