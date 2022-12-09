package edu.um.isa.umbookv2.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Foto.
 */
@Entity
@Table(name = "foto")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Foto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "caption")
    private String caption;

    @Column(name = "fecha")
    private Instant fecha;

    @OneToMany(mappedBy = "foto")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "foto", "user" }, allowSetters = true)
    private Set<Comentario> comentarios = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "fotos", "user" }, allowSetters = true)
    private Album album;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Foto id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCaption() {
        return this.caption;
    }

    public Foto caption(String caption) {
        this.setCaption(caption);
        return this;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public Instant getFecha() {
        return this.fecha;
    }

    public Foto fecha(Instant fecha) {
        this.setFecha(fecha);
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public Set<Comentario> getComentarios() {
        return this.comentarios;
    }

    public void setComentarios(Set<Comentario> comentarios) {
        if (this.comentarios != null) {
            this.comentarios.forEach(i -> i.setFoto(null));
        }
        if (comentarios != null) {
            comentarios.forEach(i -> i.setFoto(this));
        }
        this.comentarios = comentarios;
    }

    public Foto comentarios(Set<Comentario> comentarios) {
        this.setComentarios(comentarios);
        return this;
    }

    public Foto addComentario(Comentario comentario) {
        this.comentarios.add(comentario);
        comentario.setFoto(this);
        return this;
    }

    public Foto removeComentario(Comentario comentario) {
        this.comentarios.remove(comentario);
        comentario.setFoto(null);
        return this;
    }

    public Album getAlbum() {
        return this.album;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    public Foto album(Album album) {
        this.setAlbum(album);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Foto)) {
            return false;
        }
        return id != null && id.equals(((Foto) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Foto{" +
            "id=" + getId() +
            ", caption='" + getCaption() + "'" +
            ", fecha='" + getFecha() + "'" +
            "}";
    }
}
