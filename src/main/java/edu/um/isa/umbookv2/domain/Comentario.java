package edu.um.isa.umbookv2.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Comentario.
 */
@Entity
@Table(name = "comentario")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Comentario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "contenido")
    private String contenido;

    @ManyToOne
    @JsonIgnoreProperties(value = { "comentarios", "album" }, allowSetters = true)
    private Foto foto;

    @ManyToOne
    @JsonIgnoreProperties(value = { "core", "amigos", "albums", "comentarios", "notifications", "friendAssocs" }, allowSetters = true)
    private Usuario user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Comentario id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContenido() {
        return this.contenido;
    }

    public Comentario contenido(String contenido) {
        this.setContenido(contenido);
        return this;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public Foto getFoto() {
        return this.foto;
    }

    public void setFoto(Foto foto) {
        this.foto = foto;
    }

    public Comentario foto(Foto foto) {
        this.setFoto(foto);
        return this;
    }

    public Usuario getUser() {
        return this.user;
    }

    public void setUser(Usuario usuario) {
        this.user = usuario;
    }

    public Comentario user(Usuario usuario) {
        this.setUser(usuario);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Comentario)) {
            return false;
        }
        return id != null && id.equals(((Comentario) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Comentario{" +
            "id=" + getId() +
            ", contenido='" + getContenido() + "'" +
            "}";
    }
}
