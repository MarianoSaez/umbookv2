package edu.um.isa.umbookv2.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Notification.
 */
@Entity
@Table(name = "notification")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Notification implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "contendio")
    private String contendio;

    @JsonIgnoreProperties(value = { "core", "amigos", "albums", "comentarios", "notifications", "friendAssocs" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Usuario emisor;

    @ManyToOne
    @JsonIgnoreProperties(value = { "core", "amigos", "albums", "comentarios", "notifications", "friendAssocs" }, allowSetters = true)
    private Usuario user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Notification id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContendio() {
        return this.contendio;
    }

    public Notification contendio(String contendio) {
        this.setContendio(contendio);
        return this;
    }

    public void setContendio(String contendio) {
        this.contendio = contendio;
    }

    public Usuario getEmisor() {
        return this.emisor;
    }

    public void setEmisor(Usuario usuario) {
        this.emisor = usuario;
    }

    public Notification emisor(Usuario usuario) {
        this.setEmisor(usuario);
        return this;
    }

    public Usuario getUser() {
        return this.user;
    }

    public void setUser(Usuario usuario) {
        this.user = usuario;
    }

    public Notification user(Usuario usuario) {
        this.setUser(usuario);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Notification)) {
            return false;
        }
        return id != null && id.equals(((Notification) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Notification{" +
            "id=" + getId() +
            ", contendio='" + getContendio() + "'" +
            "}";
    }
}
