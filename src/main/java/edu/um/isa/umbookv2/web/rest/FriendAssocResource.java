package edu.um.isa.umbookv2.web.rest;

import edu.um.isa.umbookv2.domain.FriendAssoc;
import edu.um.isa.umbookv2.repository.FriendAssocRepository;
import edu.um.isa.umbookv2.service.FriendAssocService;
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
 * REST controller for managing {@link edu.um.isa.umbookv2.domain.FriendAssoc}.
 */
@RestController
@RequestMapping("/api")
public class FriendAssocResource {

    private final Logger log = LoggerFactory.getLogger(FriendAssocResource.class);

    private static final String ENTITY_NAME = "friendAssoc";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FriendAssocService friendAssocService;

    private final FriendAssocRepository friendAssocRepository;

    public FriendAssocResource(FriendAssocService friendAssocService, FriendAssocRepository friendAssocRepository) {
        this.friendAssocService = friendAssocService;
        this.friendAssocRepository = friendAssocRepository;
    }

    /**
     * {@code POST  /friend-assocs} : Create a new friendAssoc.
     *
     * @param friendAssoc the friendAssoc to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new friendAssoc, or with status {@code 400 (Bad Request)} if the friendAssoc has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/friend-assocs")
    public ResponseEntity<FriendAssoc> createFriendAssoc(@RequestBody FriendAssoc friendAssoc) throws URISyntaxException {
        log.debug("REST request to save FriendAssoc : {}", friendAssoc);
        if (friendAssoc.getId() != null) {
            throw new BadRequestAlertException("A new friendAssoc cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FriendAssoc result = friendAssocService.save(friendAssoc);
        return ResponseEntity
            .created(new URI("/api/friend-assocs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /friend-assocs/:id} : Updates an existing friendAssoc.
     *
     * @param id the id of the friendAssoc to save.
     * @param friendAssoc the friendAssoc to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated friendAssoc,
     * or with status {@code 400 (Bad Request)} if the friendAssoc is not valid,
     * or with status {@code 500 (Internal Server Error)} if the friendAssoc couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/friend-assocs/{id}")
    public ResponseEntity<FriendAssoc> updateFriendAssoc(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody FriendAssoc friendAssoc
    ) throws URISyntaxException {
        log.debug("REST request to update FriendAssoc : {}, {}", id, friendAssoc);
        if (friendAssoc.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, friendAssoc.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!friendAssocRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        FriendAssoc result = friendAssocService.update(friendAssoc);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, friendAssoc.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /friend-assocs/:id} : Partial updates given fields of an existing friendAssoc, field will ignore if it is null
     *
     * @param id the id of the friendAssoc to save.
     * @param friendAssoc the friendAssoc to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated friendAssoc,
     * or with status {@code 400 (Bad Request)} if the friendAssoc is not valid,
     * or with status {@code 404 (Not Found)} if the friendAssoc is not found,
     * or with status {@code 500 (Internal Server Error)} if the friendAssoc couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/friend-assocs/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<FriendAssoc> partialUpdateFriendAssoc(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody FriendAssoc friendAssoc
    ) throws URISyntaxException {
        log.debug("REST request to partial update FriendAssoc partially : {}, {}", id, friendAssoc);
        if (friendAssoc.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, friendAssoc.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!friendAssocRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<FriendAssoc> result = friendAssocService.partialUpdate(friendAssoc);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, friendAssoc.getId().toString())
        );
    }

    /**
     * {@code GET  /friend-assocs} : get all the friendAssocs.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of friendAssocs in body.
     */
    @GetMapping("/friend-assocs")
    public List<FriendAssoc> getAllFriendAssocs(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all FriendAssocs");
        return friendAssocService.findAll();
    }

    /**
     * {@code GET  /friend-assocs/:id} : get the "id" friendAssoc.
     *
     * @param id the id of the friendAssoc to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the friendAssoc, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/friend-assocs/{id}")
    public ResponseEntity<FriendAssoc> getFriendAssoc(@PathVariable Long id) {
        log.debug("REST request to get FriendAssoc : {}", id);
        Optional<FriendAssoc> friendAssoc = friendAssocService.findOne(id);
        return ResponseUtil.wrapOrNotFound(friendAssoc);
    }

    /**
     * {@code DELETE  /friend-assocs/:id} : delete the "id" friendAssoc.
     *
     * @param id the id of the friendAssoc to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/friend-assocs/{id}")
    public ResponseEntity<Void> deleteFriendAssoc(@PathVariable Long id) {
        log.debug("REST request to delete FriendAssoc : {}", id);
        friendAssocService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
