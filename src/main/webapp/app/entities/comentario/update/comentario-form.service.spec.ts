import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../comentario.test-samples';

import { ComentarioFormService } from './comentario-form.service';

describe('Comentario Form Service', () => {
  let service: ComentarioFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComentarioFormService);
  });

  describe('Service methods', () => {
    describe('createComentarioFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createComentarioFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            contenido: expect.any(Object),
            foto: expect.any(Object),
            user: expect.any(Object),
          })
        );
      });

      it('passing IComentario should create a new form with FormGroup', () => {
        const formGroup = service.createComentarioFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            contenido: expect.any(Object),
            foto: expect.any(Object),
            user: expect.any(Object),
          })
        );
      });
    });

    describe('getComentario', () => {
      it('should return NewComentario for default Comentario initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createComentarioFormGroup(sampleWithNewData);

        const comentario = service.getComentario(formGroup) as any;

        expect(comentario).toMatchObject(sampleWithNewData);
      });

      it('should return NewComentario for empty Comentario initial value', () => {
        const formGroup = service.createComentarioFormGroup();

        const comentario = service.getComentario(formGroup) as any;

        expect(comentario).toMatchObject({});
      });

      it('should return IComentario', () => {
        const formGroup = service.createComentarioFormGroup(sampleWithRequiredData);

        const comentario = service.getComentario(formGroup) as any;

        expect(comentario).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IComentario should not enable id FormControl', () => {
        const formGroup = service.createComentarioFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewComentario should disable id FormControl', () => {
        const formGroup = service.createComentarioFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
