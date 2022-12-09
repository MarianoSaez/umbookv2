package edu.um.isa.umbookv2.service;

import edu.um.isa.umbookv2.domain.Album;
import edu.um.isa.umbookv2.repository.AlbumRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Album}.
 */
@Service
@Transactional
public class AlbumService {

    private final Logger log = LoggerFactory.getLogger(AlbumService.class);

    private final AlbumRepository albumRepository;

    public AlbumService(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }

    /**
     * Save a album.
     *
     * @param album the entity to save.
     * @return the persisted entity.
     */
    public Album save(Album album) {
        log.debug("Request to save Album : {}", album);
        return albumRepository.save(album);
    }

    /**
     * Update a album.
     *
     * @param album the entity to save.
     * @return the persisted entity.
     */
    public Album update(Album album) {
        log.debug("Request to update Album : {}", album);
        return albumRepository.save(album);
    }

    /**
     * Partially update a album.
     *
     * @param album the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Album> partialUpdate(Album album) {
        log.debug("Request to partially update Album : {}", album);

        return albumRepository
            .findById(album.getId())
            .map(existingAlbum -> {
                if (album.getName() != null) {
                    existingAlbum.setName(album.getName());
                }

                return existingAlbum;
            })
            .map(albumRepository::save);
    }

    /**
     * Get all the albums.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Album> findAll() {
        log.debug("Request to get all Albums");
        return albumRepository.findAll();
    }

    /**
     * Get one album by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Album> findOne(Long id) {
        log.debug("Request to get Album : {}", id);
        return albumRepository.findById(id);
    }

    /**
     * Delete the album by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Album : {}", id);
        albumRepository.deleteById(id);
    }
}
