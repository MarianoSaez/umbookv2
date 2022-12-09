import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FriendAssocService } from '../service/friend-assoc.service';

import { FriendAssocComponent } from './friend-assoc.component';

describe('FriendAssoc Management Component', () => {
  let comp: FriendAssocComponent;
  let fixture: ComponentFixture<FriendAssocComponent>;
  let service: FriendAssocService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'friend-assoc', component: FriendAssocComponent }]), HttpClientTestingModule],
      declarations: [FriendAssocComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(FriendAssocComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FriendAssocComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FriendAssocService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.friendAssocs?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to friendAssocService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getFriendAssocIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getFriendAssocIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
