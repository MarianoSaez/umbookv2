import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IComentario } from '../comentario.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../comentario.test-samples';

import { ComentarioService } from './comentario.service';

const requireRestSample: IComentario = {
  ...sampleWithRequiredData,
};

describe('Comentario Service', () => {
  let service: ComentarioService;
  let httpMock: HttpTestingController;
  let expectedResult: IComentario | IComentario[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ComentarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Comentario', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const comentario = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(comentario).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Comentario', () => {
      const comentario = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(comentario).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Comentario', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Comentario', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Comentario', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addComentarioToCollectionIfMissing', () => {
      it('should add a Comentario to an empty array', () => {
        const comentario: IComentario = sampleWithRequiredData;
        expectedResult = service.addComentarioToCollectionIfMissing([], comentario);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(comentario);
      });

      it('should not add a Comentario to an array that contains it', () => {
        const comentario: IComentario = sampleWithRequiredData;
        const comentarioCollection: IComentario[] = [
          {
            ...comentario,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addComentarioToCollectionIfMissing(comentarioCollection, comentario);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Comentario to an array that doesn't contain it", () => {
        const comentario: IComentario = sampleWithRequiredData;
        const comentarioCollection: IComentario[] = [sampleWithPartialData];
        expectedResult = service.addComentarioToCollectionIfMissing(comentarioCollection, comentario);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(comentario);
      });

      it('should add only unique Comentario to an array', () => {
        const comentarioArray: IComentario[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const comentarioCollection: IComentario[] = [sampleWithRequiredData];
        expectedResult = service.addComentarioToCollectionIfMissing(comentarioCollection, ...comentarioArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const comentario: IComentario = sampleWithRequiredData;
        const comentario2: IComentario = sampleWithPartialData;
        expectedResult = service.addComentarioToCollectionIfMissing([], comentario, comentario2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(comentario);
        expect(expectedResult).toContain(comentario2);
      });

      it('should accept null and undefined values', () => {
        const comentario: IComentario = sampleWithRequiredData;
        expectedResult = service.addComentarioToCollectionIfMissing([], null, comentario, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(comentario);
      });

      it('should return initial array if no Comentario is added', () => {
        const comentarioCollection: IComentario[] = [sampleWithRequiredData];
        expectedResult = service.addComentarioToCollectionIfMissing(comentarioCollection, undefined, null);
        expect(expectedResult).toEqual(comentarioCollection);
      });
    });

    describe('compareComentario', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareComentario(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareComentario(entity1, entity2);
        const compareResult2 = service.compareComentario(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareComentario(entity1, entity2);
        const compareResult2 = service.compareComentario(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareComentario(entity1, entity2);
        const compareResult2 = service.compareComentario(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
