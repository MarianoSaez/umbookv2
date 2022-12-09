import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FriendAssocDetailComponent } from './friend-assoc-detail.component';

describe('FriendAssoc Management Detail Component', () => {
  let comp: FriendAssocDetailComponent;
  let fixture: ComponentFixture<FriendAssocDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriendAssocDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ friendAssoc: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(FriendAssocDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(FriendAssocDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load friendAssoc on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.friendAssoc).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
