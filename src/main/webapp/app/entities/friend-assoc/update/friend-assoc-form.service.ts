import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFriendAssoc, NewFriendAssoc } from '../friend-assoc.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFriendAssoc for edit and NewFriendAssocFormGroupInput for create.
 */
type FriendAssocFormGroupInput = IFriendAssoc | PartialWithRequiredKeyOf<NewFriendAssoc>;

type FriendAssocFormDefaults = Pick<NewFriendAssoc, 'id' | 'usuarios'>;

type FriendAssocFormGroupContent = {
  id: FormControl<IFriendAssoc['id'] | NewFriendAssoc['id']>;
  usuarios: FormControl<IFriendAssoc['usuarios']>;
};

export type FriendAssocFormGroup = FormGroup<FriendAssocFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FriendAssocFormService {
  createFriendAssocFormGroup(friendAssoc: FriendAssocFormGroupInput = { id: null }): FriendAssocFormGroup {
    const friendAssocRawValue = {
      ...this.getFormDefaults(),
      ...friendAssoc,
    };
    return new FormGroup<FriendAssocFormGroupContent>({
      id: new FormControl(
        { value: friendAssocRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      usuarios: new FormControl(friendAssocRawValue.usuarios ?? []),
    });
  }

  getFriendAssoc(form: FriendAssocFormGroup): IFriendAssoc | NewFriendAssoc {
    return form.getRawValue() as IFriendAssoc | NewFriendAssoc;
  }

  resetForm(form: FriendAssocFormGroup, friendAssoc: FriendAssocFormGroupInput): void {
    const friendAssocRawValue = { ...this.getFormDefaults(), ...friendAssoc };
    form.reset(
      {
        ...friendAssocRawValue,
        id: { value: friendAssocRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FriendAssocFormDefaults {
    return {
      id: null,
      usuarios: [],
    };
  }
}
