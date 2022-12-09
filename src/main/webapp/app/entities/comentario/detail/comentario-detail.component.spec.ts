import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ComentarioDetailComponent } from './comentario-detail.component';

describe('Comentario Management Detail Component', () => {
  let comp: ComentarioDetailComponent;
  let fixture: ComponentFixture<ComentarioDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComentarioDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ comentario: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ComentarioDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ComentarioDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load comentario on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.comentario).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
