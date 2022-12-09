package edu.um.isa.umbookv2.domain;

import static org.assertj.core.api.Assertions.assertThat;

import edu.um.isa.umbookv2.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class FriendAssocTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FriendAssoc.class);
        FriendAssoc friendAssoc1 = new FriendAssoc();
        friendAssoc1.setId(1L);
        FriendAssoc friendAssoc2 = new FriendAssoc();
        friendAssoc2.setId(friendAssoc1.getId());
        assertThat(friendAssoc1).isEqualTo(friendAssoc2);
        friendAssoc2.setId(2L);
        assertThat(friendAssoc1).isNotEqualTo(friendAssoc2);
        friendAssoc1.setId(null);
        assertThat(friendAssoc1).isNotEqualTo(friendAssoc2);
    }
}
