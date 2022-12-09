import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFoto } from '../foto.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../foto.test-samples';

import { FotoService, RestFoto } from './foto.service';

const requireRestSample: RestFoto = {
  ...sampleWithRequiredData,
  fecha: sampleWithRequiredData.fecha?.toJSON(),
};

describe('Foto Service', () => {
  let service: FotoService;
  let httpMock: HttpTestingController;
  let expectedResult: IFoto | IFoto[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FotoService);
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

    it('should create a Foto', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const foto = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(foto).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Foto', () => {
      const foto = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(foto).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Foto', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Foto', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Foto', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFotoToCollectionIfMissing', () => {
      it('should add a Foto to an empty array', () => {
        const foto: IFoto = sampleWithRequiredData;
        expectedResult = service.addFotoToCollectionIfMissing([], foto);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(foto);
      });

      it('should not add a Foto to an array that contains it', () => {
        const foto: IFoto = sampleWithRequiredData;
        const fotoCollection: IFoto[] = [
          {
            ...foto,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFotoToCollectionIfMissing(fotoCollection, foto);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Foto to an array that doesn't contain it", () => {
        const foto: IFoto = sampleWithRequiredData;
        const fotoCollection: IFoto[] = [sampleWithPartialData];
        expectedResult = service.addFotoToCollectionIfMissing(fotoCollection, foto);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(foto);
      });

      it('should add only unique Foto to an array', () => {
        const fotoArray: IFoto[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const fotoCollection: IFoto[] = [sampleWithRequiredData];
        expectedResult = service.addFotoToCollectionIfMissing(fotoCollection, ...fotoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const foto: IFoto = sampleWithRequiredData;
        const foto2: IFoto = sampleWithPartialData;
        expectedResult = service.addFotoToCollectionIfMissing([], foto, foto2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(foto);
        expect(expectedResult).toContain(foto2);
      });

      it('should accept null and undefined values', () => {
        const foto: IFoto = sampleWithRequiredData;
        expectedResult = service.addFotoToCollectionIfMissing([], null, foto, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(foto);
      });

      it('should return initial array if no Foto is added', () => {
        const fotoCollection: IFoto[] = [sampleWithRequiredData];
        expectedResult = service.addFotoToCollectionIfMissing(fotoCollection, undefined, null);
        expect(expectedResult).toEqual(fotoCollection);
      });
    });

    describe('compareFoto', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFoto(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFoto(entity1, entity2);
        const compareResult2 = service.compareFoto(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFoto(entity1, entity2);
        const compareResult2 = service.compareFoto(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFoto(entity1, entity2);
        const compareResult2 = service.compareFoto(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
