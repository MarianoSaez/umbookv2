import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFriendAssoc } from '../friend-assoc.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../friend-assoc.test-samples';

import { FriendAssocService } from './friend-assoc.service';

const requireRestSample: IFriendAssoc = {
  ...sampleWithRequiredData,
};

describe('FriendAssoc Service', () => {
  let service: FriendAssocService;
  let httpMock: HttpTestingController;
  let expectedResult: IFriendAssoc | IFriendAssoc[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FriendAssocService);
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

    it('should create a FriendAssoc', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const friendAssoc = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(friendAssoc).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FriendAssoc', () => {
      const friendAssoc = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(friendAssoc).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FriendAssoc', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FriendAssoc', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FriendAssoc', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFriendAssocToCollectionIfMissing', () => {
      it('should add a FriendAssoc to an empty array', () => {
        const friendAssoc: IFriendAssoc = sampleWithRequiredData;
        expectedResult = service.addFriendAssocToCollectionIfMissing([], friendAssoc);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(friendAssoc);
      });

      it('should not add a FriendAssoc to an array that contains it', () => {
        const friendAssoc: IFriendAssoc = sampleWithRequiredData;
        const friendAssocCollection: IFriendAssoc[] = [
          {
            ...friendAssoc,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFriendAssocToCollectionIfMissing(friendAssocCollection, friendAssoc);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FriendAssoc to an array that doesn't contain it", () => {
        const friendAssoc: IFriendAssoc = sampleWithRequiredData;
        const friendAssocCollection: IFriendAssoc[] = [sampleWithPartialData];
        expectedResult = service.addFriendAssocToCollectionIfMissing(friendAssocCollection, friendAssoc);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(friendAssoc);
      });

      it('should add only unique FriendAssoc to an array', () => {
        const friendAssocArray: IFriendAssoc[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const friendAssocCollection: IFriendAssoc[] = [sampleWithRequiredData];
        expectedResult = service.addFriendAssocToCollectionIfMissing(friendAssocCollection, ...friendAssocArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const friendAssoc: IFriendAssoc = sampleWithRequiredData;
        const friendAssoc2: IFriendAssoc = sampleWithPartialData;
        expectedResult = service.addFriendAssocToCollectionIfMissing([], friendAssoc, friendAssoc2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(friendAssoc);
        expect(expectedResult).toContain(friendAssoc2);
      });

      it('should accept null and undefined values', () => {
        const friendAssoc: IFriendAssoc = sampleWithRequiredData;
        expectedResult = service.addFriendAssocToCollectionIfMissing([], null, friendAssoc, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(friendAssoc);
      });

      it('should return initial array if no FriendAssoc is added', () => {
        const friendAssocCollection: IFriendAssoc[] = [sampleWithRequiredData];
        expectedResult = service.addFriendAssocToCollectionIfMissing(friendAssocCollection, undefined, null);
        expect(expectedResult).toEqual(friendAssocCollection);
      });
    });

    describe('compareFriendAssoc', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFriendAssoc(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFriendAssoc(entity1, entity2);
        const compareResult2 = service.compareFriendAssoc(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFriendAssoc(entity1, entity2);
        const compareResult2 = service.compareFriendAssoc(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFriendAssoc(entity1, entity2);
        const compareResult2 = service.compareFriendAssoc(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
