package edu.um.isa.umbookv2.repository;

import edu.um.isa.umbookv2.domain.FriendAssoc;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the FriendAssoc entity.
 *
 * When extending this class, extend FriendAssocRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface FriendAssocRepository extends FriendAssocRepositoryWithBagRelationships, JpaRepository<FriendAssoc, Long> {
    default Optional<FriendAssoc> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findById(id));
    }

    default List<FriendAssoc> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAll());
    }

    default Page<FriendAssoc> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAll(pageable));
    }
}
