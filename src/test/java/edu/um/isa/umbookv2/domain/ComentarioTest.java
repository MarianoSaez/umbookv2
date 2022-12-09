package edu.um.isa.umbookv2.domain;

import static org.assertj.core.api.Assertions.assertThat;

import edu.um.isa.umbookv2.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ComentarioTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Comentario.class);
        Comentario comentario1 = new Comentario();
        comentario1.setId(1L);
        Comentario comentario2 = new Comentario();
        comentario2.setId(comentario1.getId());
        assertThat(comentario1).isEqualTo(comentario2);
        comentario2.setId(2L);
        assertThat(comentario1).isNotEqualTo(comentario2);
        comentario1.setId(null);
        assertThat(comentario1).isNotEqualTo(comentario2);
    }
}
