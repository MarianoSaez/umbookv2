package edu.um.isa.umbookv2.service;

import edu.um.isa.umbookv2.domain.FriendAssoc;
import edu.um.isa.umbookv2.repository.FriendAssocRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link FriendAssoc}.
 */
@Service
@Transactional
public class FriendAssocService {

    private final Logger log = LoggerFactory.getLogger(FriendAssocService.class);

    private final FriendAssocRepository friendAssocRepository;

    public FriendAssocService(FriendAssocRepository friendAssocRepository) {
        this.friendAssocRepository = friendAssocRepository;
    }

    /**
     * Save a friendAssoc.
     *
     * @param friendAssoc the entity to save.
     * @return the persisted entity.
     */
    public FriendAssoc save(FriendAssoc friendAssoc) {
        log.debug("Request to save FriendAssoc : {}", friendAssoc);
        return friendAssocRepository.save(friendAssoc);
    }

    /**
     * Update a friendAssoc.
     *
     * @param friendAssoc the entity to save.
     * @return the persisted entity.
     */
    public FriendAssoc update(FriendAssoc friendAssoc) {
        log.debug("Request to update FriendAssoc : {}", friendAssoc);
        return friendAssocRepository.save(friendAssoc);
    }

    /**
     * Partially update a friendAssoc.
     *
     * @param friendAssoc the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<FriendAssoc> partialUpdate(FriendAssoc friendAssoc) {
        log.debug("Request to partially update FriendAssoc : {}", friendAssoc);

        return friendAssocRepository
            .findById(friendAssoc.getId())
            .map(existingFriendAssoc -> {
                return existingFriendAssoc;
            })
            .map(friendAssocRepository::save);
    }

    /**
     * Get all the friendAssocs.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<FriendAssoc> findAll() {
        log.debug("Request to get all FriendAssocs");
        return friendAssocRepository.findAll();
    }

    /**
     * Get all the friendAssocs with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<FriendAssoc> findAllWithEagerRelationships(Pageable pageable) {
        return friendAssocRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one friendAssoc by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<FriendAssoc> findOne(Long id) {
        log.debug("Request to get FriendAssoc : {}", id);
        return friendAssocRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the friendAssoc by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete FriendAssoc : {}", id);
        friendAssocRepository.deleteById(id);
    }
}
