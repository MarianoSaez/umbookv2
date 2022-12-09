package edu.um.isa.umbookv2.repository;

import edu.um.isa.umbookv2.domain.FriendAssoc;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.annotations.QueryHints;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class FriendAssocRepositoryWithBagRelationshipsImpl implements FriendAssocRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<FriendAssoc> fetchBagRelationships(Optional<FriendAssoc> friendAssoc) {
        return friendAssoc.map(this::fetchUsuarios);
    }

    @Override
    public Page<FriendAssoc> fetchBagRelationships(Page<FriendAssoc> friendAssocs) {
        return new PageImpl<>(
            fetchBagRelationships(friendAssocs.getContent()),
            friendAssocs.getPageable(),
            friendAssocs.getTotalElements()
        );
    }

    @Override
    public List<FriendAssoc> fetchBagRelationships(List<FriendAssoc> friendAssocs) {
        return Optional.of(friendAssocs).map(this::fetchUsuarios).orElse(Collections.emptyList());
    }

    FriendAssoc fetchUsuarios(FriendAssoc result) {
        return entityManager
            .createQuery(
                "select friendAssoc from FriendAssoc friendAssoc left join fetch friendAssoc.usuarios where friendAssoc is :friendAssoc",
                FriendAssoc.class
            )
            .setParameter("friendAssoc", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<FriendAssoc> fetchUsuarios(List<FriendAssoc> friendAssocs) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, friendAssocs.size()).forEach(index -> order.put(friendAssocs.get(index).getId(), index));
        List<FriendAssoc> result = entityManager
            .createQuery(
                "select distinct friendAssoc from FriendAssoc friendAssoc left join fetch friendAssoc.usuarios where friendAssoc in :friendAssocs",
                FriendAssoc.class
            )
            .setParameter("friendAssocs", friendAssocs)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
