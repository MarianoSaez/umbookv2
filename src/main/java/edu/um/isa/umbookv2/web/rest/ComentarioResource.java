package edu.um.isa.umbookv2.web.rest;

import edu.um.isa.umbookv2.domain.Comentario;
import edu.um.isa.umbookv2.repository.ComentarioRepository;
import edu.um.isa.umbookv2.service.ComentarioService;
import edu.um.isa.umbookv2.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link edu.um.isa.umbookv2.domain.Comentario}.
 */
@RestController
@RequestMapping("/api")
public class ComentarioResource {

    private final Logger log = LoggerFactory.getLogger(ComentarioResource.class);

    private static final String ENTITY_NAME = "comentario";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ComentarioService comentarioService;

    private final ComentarioRepository comentarioRepository;

    public ComentarioResource(ComentarioService comentarioService, ComentarioRepository comentarioRepository) {
        this.comentarioService = comentarioService;
        this.comentarioRepository = comentarioRepository;
    }

    /**
     * {@code POST  /comentarios} : Create a new comentario.
     *
     * @param comentario the comentario to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new comentario, or with status {@code 400 (Bad Request)} if the comentario has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/comentarios")
    public ResponseEntity<Comentario> createComentario(@RequestBody Comentario comentario) throws URISyntaxException {
        log.debug("REST request to save Comentario : {}", comentario);
        if (comentario.getId() != null) {
            throw new BadRequestAlertException("A new comentario cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Comentario result = comentarioService.save(comentario);
        return ResponseEntity
            .created(new URI("/api/comentarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /comentarios/:id} : Updates an existing comentario.
     *
     * @param id the id of the comentario to save.
     * @param comentario the comentario to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated comentario,
     * or with status {@code 400 (Bad Request)} if the comentario is not valid,
     * or with status {@code 500 (Internal Server Error)} if the comentario couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/comentarios/{id}")
    public ResponseEntity<Comentario> updateComentario(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Comentario comentario
    ) throws URISyntaxException {
        log.debug("REST request to update Comentario : {}, {}", id, comentario);
        if (comentario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, comentario.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!comentarioRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Comentario result = comentarioService.update(comentario);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, comentario.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /comentarios/:id} : Partial updates given fields of an existing comentario, field will ignore if it is null
     *
     * @param id the id of the comentario to save.
     * @param comentario the comentario to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated comentario,
     * or with status {@code 400 (Bad Request)} if the comentario is not valid,
     * or with status {@code 404 (Not Found)} if the comentario is not found,
     * or with status {@code 500 (Internal Server Error)} if the comentario couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/comentarios/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Comentario> partialUpdateComentario(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Comentario comentario
    ) throws URISyntaxException {
        log.debug("REST request to partial update Comentario partially : {}, {}", id, comentario);
        if (comentario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, comentario.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!comentarioRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Comentario> result = comentarioService.partialUpdate(comentario);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, comentario.getId().toString())
        );
    }

    /**
     * {@code GET  /comentarios} : get all the comentarios.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of comentarios in body.
     */
    @GetMapping("/comentarios")
    public List<Comentario> getAllComentarios() {
        log.debug("REST request to get all Comentarios");
        return comentarioService.findAll();
    }

    /**
     * {@code GET  /comentarios/:id} : get the "id" comentario.
     *
     * @param id the id of the comentario to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the comentario, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/comentarios/{id}")
    public ResponseEntity<Comentario> getComentario(@PathVariable Long id) {
        log.debug("REST request to get Comentario : {}", id);
        Optional<Comentario> comentario = comentarioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(comentario);
    }

    /**
     * {@code DELETE  /comentarios/:id} : delete the "id" comentario.
     *
     * @param id the id of the comentario to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/comentarios/{id}")
    public ResponseEntity<Void> deleteComentario(@PathVariable Long id) {
        log.debug("REST request to delete Comentario : {}", id);
        comentarioService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
