package edu.um.isa.umbookv2.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Album.
 */
@Entity
@Table(name = "album")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Album implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "album")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "comentarios", "album" }, allowSetters = true)
    private Set<Foto> fotos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "core", "amigos", "albums", "comentarios", "notifications", "friendAssocs" }, allowSetters = true)
    private Usuario user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Album id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Album name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Foto> getFotos() {
        return this.fotos;
    }

    public void setFotos(Set<Foto> fotos) {
        if (this.fotos != null) {
            this.fotos.forEach(i -> i.setAlbum(null));
        }
        if (fotos != null) {
            fotos.forEach(i -> i.setAlbum(this));
        }
        this.fotos = fotos;
    }

    public Album fotos(Set<Foto> fotos) {
        this.setFotos(fotos);
        return this;
    }

    public Album addFoto(Foto foto) {
        this.fotos.add(foto);
        foto.setAlbum(this);
        return this;
    }

    public Album removeFoto(Foto foto) {
        this.fotos.remove(foto);
        foto.setAlbum(null);
        return this;
    }

    public Usuario getUser() {
        return this.user;
    }

    public void setUser(Usuario usuario) {
        this.user = usuario;
    }

    public Album user(Usuario usuario) {
        this.setUser(usuario);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Album)) {
            return false;
        }
        return id != null && id.equals(((Album) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Album{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
