import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../friend-assoc.test-samples';

import { FriendAssocFormService } from './friend-assoc-form.service';

describe('FriendAssoc Form Service', () => {
  let service: FriendAssocFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendAssocFormService);
  });

  describe('Service methods', () => {
    describe('createFriendAssocFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFriendAssocFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            usuarios: expect.any(Object),
          })
        );
      });

      it('passing IFriendAssoc should create a new form with FormGroup', () => {
        const formGroup = service.createFriendAssocFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            usuarios: expect.any(Object),
          })
        );
      });
    });

    describe('getFriendAssoc', () => {
      it('should return NewFriendAssoc for default FriendAssoc initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFriendAssocFormGroup(sampleWithNewData);

        const friendAssoc = service.getFriendAssoc(formGroup) as any;

        expect(friendAssoc).toMatchObject(sampleWithNewData);
      });

      it('should return NewFriendAssoc for empty FriendAssoc initial value', () => {
        const formGroup = service.createFriendAssocFormGroup();

        const friendAssoc = service.getFriendAssoc(formGroup) as any;

        expect(friendAssoc).toMatchObject({});
      });

      it('should return IFriendAssoc', () => {
        const formGroup = service.createFriendAssocFormGroup(sampleWithRequiredData);

        const friendAssoc = service.getFriendAssoc(formGroup) as any;

        expect(friendAssoc).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFriendAssoc should not enable id FormControl', () => {
        const formGroup = service.createFriendAssocFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFriendAssoc should disable id FormControl', () => {
        const formGroup = service.createFriendAssocFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
