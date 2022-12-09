import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IComentario, NewComentario } from '../comentario.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IComentario for edit and NewComentarioFormGroupInput for create.
 */
type ComentarioFormGroupInput = IComentario | PartialWithRequiredKeyOf<NewComentario>;

type ComentarioFormDefaults = Pick<NewComentario, 'id'>;

type ComentarioFormGroupContent = {
  id: FormControl<IComentario['id'] | NewComentario['id']>;
  contenido: FormControl<IComentario['contenido']>;
  foto: FormControl<IComentario['foto']>;
  user: FormControl<IComentario['user']>;
};

export type ComentarioFormGroup = FormGroup<ComentarioFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ComentarioFormService {
  createComentarioFormGroup(comentario: ComentarioFormGroupInput = { id: null }): ComentarioFormGroup {
    const comentarioRawValue = {
      ...this.getFormDefaults(),
      ...comentario,
    };
    return new FormGroup<ComentarioFormGroupContent>({
      id: new FormControl(
        { value: comentarioRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      contenido: new FormControl(comentarioRawValue.contenido),
      foto: new FormControl(comentarioRawValue.foto),
      user: new FormControl(comentarioRawValue.user),
    });
  }

  getComentario(form: ComentarioFormGroup): IComentario | NewComentario {
    return form.getRawValue() as IComentario | NewComentario;
  }

  resetForm(form: ComentarioFormGroup, comentario: ComentarioFormGroupInput): void {
    const comentarioRawValue = { ...this.getFormDefaults(), ...comentario };
    form.reset(
      {
        ...comentarioRawValue,
        id: { value: comentarioRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ComentarioFormDefaults {
    return {
      id: null,
    };
  }
}
