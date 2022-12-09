package edu.um.isa.umbookv2.repository;

import edu.um.isa.umbookv2.domain.FriendAssoc;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface FriendAssocRepositoryWithBagRelationships {
    Optional<FriendAssoc> fetchBagRelationships(Optional<FriendAssoc> friendAssoc);

    List<FriendAssoc> fetchBagRelationships(List<FriendAssoc> friendAssocs);

    Page<FriendAssoc> fetchBagRelationships(Page<FriendAssoc> friendAssocs);
}
