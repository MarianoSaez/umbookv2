package edu.um.isa.umbookv2.service;

import edu.um.isa.umbookv2.domain.Foto;
import edu.um.isa.umbookv2.repository.FotoRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Foto}.
 */
@Service
@Transactional
public class FotoService {

    private final Logger log = LoggerFactory.getLogger(FotoService.class);

    private final FotoRepository fotoRepository;

    public FotoService(FotoRepository fotoRepository) {
        this.fotoRepository = fotoRepository;
    }

    /**
     * Save a foto.
     *
     * @param foto the entity to save.
     * @return the persisted entity.
     */
    public Foto save(Foto foto) {
        log.debug("Request to save Foto : {}", foto);
        return fotoRepository.save(foto);
    }

    /**
     * Update a foto.
     *
     * @param foto the entity to save.
     * @return the persisted entity.
     */
    public Foto update(Foto foto) {
        log.debug("Request to update Foto : {}", foto);
        return fotoRepository.save(foto);
    }

    /**
     * Partially update a foto.
     *
     * @param foto the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Foto> partialUpdate(Foto foto) {
        log.debug("Request to partially update Foto : {}", foto);

        return fotoRepository
            .findById(foto.getId())
            .map(existingFoto -> {
                if (foto.getCaption() != null) {
                    existingFoto.setCaption(foto.getCaption());
                }
                if (foto.getFecha() != null) {
                    existingFoto.setFecha(foto.getFecha());
                }

                return existingFoto;
            })
            .map(fotoRepository::save);
    }

    /**
     * Get all the fotos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Foto> findAll() {
        log.debug("Request to get all Fotos");
        return fotoRepository.findAll();
    }

    /**
     * Get one foto by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Foto> findOne(Long id) {
        log.debug("Request to get Foto : {}", id);
        return fotoRepository.findById(id);
    }

    /**
     * Delete the foto by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Foto : {}", id);
        fotoRepository.deleteById(id);
    }
}
