import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../foto.test-samples';

import { FotoFormService } from './foto-form.service';

describe('Foto Form Service', () => {
  let service: FotoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotoFormService);
  });

  describe('Service methods', () => {
    describe('createFotoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFotoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            caption: expect.any(Object),
            fecha: expect.any(Object),
            album: expect.any(Object),
          })
        );
      });

      it('passing IFoto should create a new form with FormGroup', () => {
        const formGroup = service.createFotoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            caption: expect.any(Object),
            fecha: expect.any(Object),
            album: expect.any(Object),
          })
        );
      });
    });

    describe('getFoto', () => {
      it('should return NewFoto for default Foto initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createFotoFormGroup(sampleWithNewData);

        const foto = service.getFoto(formGroup) as any;

        expect(foto).toMatchObject(sampleWithNewData);
      });

      it('should return NewFoto for empty Foto initial value', () => {
        const formGroup = service.createFotoFormGroup();

        const foto = service.getFoto(formGroup) as any;

        expect(foto).toMatchObject({});
      });

      it('should return IFoto', () => {
        const formGroup = service.createFotoFormGroup(sampleWithRequiredData);

        const foto = service.getFoto(formGroup) as any;

        expect(foto).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFoto should not enable id FormControl', () => {
        const formGroup = service.createFotoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFoto should disable id FormControl', () => {
        const formGroup = service.createFotoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
