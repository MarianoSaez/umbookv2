import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FriendAssocFormService } from './friend-assoc-form.service';
import { FriendAssocService } from '../service/friend-assoc.service';
import { IFriendAssoc } from '../friend-assoc.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

import { FriendAssocUpdateComponent } from './friend-assoc-update.component';

describe('FriendAssoc Management Update Component', () => {
  let comp: FriendAssocUpdateComponent;
  let fixture: ComponentFixture<FriendAssocUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let friendAssocFormService: FriendAssocFormService;
  let friendAssocService: FriendAssocService;
  let usuarioService: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FriendAssocUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(FriendAssocUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FriendAssocUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    friendAssocFormService = TestBed.inject(FriendAssocFormService);
    friendAssocService = TestBed.inject(FriendAssocService);
    usuarioService = TestBed.inject(UsuarioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Usuario query and add missing value', () => {
      const friendAssoc: IFriendAssoc = { id: 456 };
      const usuarios: IUsuario[] = [{ id: 38291 }];
      friendAssoc.usuarios = usuarios;

      const usuarioCollection: IUsuario[] = [{ id: 55302 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [...usuarios];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ friendAssoc });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(
        usuarioCollection,
        ...additionalUsuarios.map(expect.objectContaining)
      );
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const friendAssoc: IFriendAssoc = { id: 456 };
      const usuario: IUsuario = { id: 22149 };
      friendAssoc.usuarios = [usuario];

      activatedRoute.data = of({ friendAssoc });
      comp.ngOnInit();

      expect(comp.usuariosSharedCollection).toContain(usuario);
      expect(comp.friendAssoc).toEqual(friendAssoc);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFriendAssoc>>();
      const friendAssoc = { id: 123 };
      jest.spyOn(friendAssocFormService, 'getFriendAssoc').mockReturnValue(friendAssoc);
      jest.spyOn(friendAssocService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ friendAssoc });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: friendAssoc }));
      saveSubject.complete();

      // THEN
      expect(friendAssocFormService.getFriendAssoc).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(friendAssocService.update).toHaveBeenCalledWith(expect.objectContaining(friendAssoc));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFriendAssoc>>();
      const friendAssoc = { id: 123 };
      jest.spyOn(friendAssocFormService, 'getFriendAssoc').mockReturnValue({ id: null });
      jest.spyOn(friendAssocService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ friendAssoc: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: friendAssoc }));
      saveSubject.complete();

      // THEN
      expect(friendAssocFormService.getFriendAssoc).toHaveBeenCalled();
      expect(friendAssocService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFriendAssoc>>();
      const friendAssoc = { id: 123 };
      jest.spyOn(friendAssocService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ friendAssoc });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(friendAssocService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareUsuario', () => {
      it('Should forward to usuarioService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(usuarioService, 'compareUsuario');
        comp.compareUsuario(entity, entity2);
        expect(usuarioService.compareUsuario).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
