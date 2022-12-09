package edu.um.isa.umbookv2.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Usuario.
 */
@Entity
@Table(name = "usuario")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private User core;

    @JsonIgnoreProperties(value = { "usuarios" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private FriendAssoc amigos;

    @OneToMany(mappedBy = "user")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "fotos", "user" }, allowSetters = true)
    private Set<Album> albums = new HashSet<>();

    @OneToMany(mappedBy = "user")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "foto", "user" }, allowSetters = true)
    private Set<Comentario> comentarios = new HashSet<>();

    @OneToMany(mappedBy = "user")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "emisor", "user" }, allowSetters = true)
    private Set<Notification> notifications = new HashSet<>();

    @ManyToMany(mappedBy = "usuarios")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "usuarios" }, allowSetters = true)
    private Set<FriendAssoc> friendAssocs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Usuario id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getCore() {
        return this.core;
    }

    public void setCore(User user) {
        this.core = user;
    }

    public Usuario core(User user) {
        this.setCore(user);
        return this;
    }

    public FriendAssoc getAmigos() {
        return this.amigos;
    }

    public void setAmigos(FriendAssoc friendAssoc) {
        this.amigos = friendAssoc;
    }

    public Usuario amigos(FriendAssoc friendAssoc) {
        this.setAmigos(friendAssoc);
        return this;
    }

    public Set<Album> getAlbums() {
        return this.albums;
    }

    public void setAlbums(Set<Album> albums) {
        if (this.albums != null) {
            this.albums.forEach(i -> i.setUser(null));
        }
        if (albums != null) {
            albums.forEach(i -> i.setUser(this));
        }
        this.albums = albums;
    }

    public Usuario albums(Set<Album> albums) {
        this.setAlbums(albums);
        return this;
    }

    public Usuario addAlbum(Album album) {
        this.albums.add(album);
        album.setUser(this);
        return this;
    }

    public Usuario removeAlbum(Album album) {
        this.albums.remove(album);
        album.setUser(null);
        return this;
    }

    public Set<Comentario> getComentarios() {
        return this.comentarios;
    }

    public void setComentarios(Set<Comentario> comentarios) {
        if (this.comentarios != null) {
            this.comentarios.forEach(i -> i.setUser(null));
        }
        if (comentarios != null) {
            comentarios.forEach(i -> i.setUser(this));
        }
        this.comentarios = comentarios;
    }

    public Usuario comentarios(Set<Comentario> comentarios) {
        this.setComentarios(comentarios);
        return this;
    }

    public Usuario addComentario(Comentario comentario) {
        this.comentarios.add(comentario);
        comentario.setUser(this);
        return this;
    }

    public Usuario removeComentario(Comentario comentario) {
        this.comentarios.remove(comentario);
        comentario.setUser(null);
        return this;
    }

    public Set<Notification> getNotifications() {
        return this.notifications;
    }

    public void setNotifications(Set<Notification> notifications) {
        if (this.notifications != null) {
            this.notifications.forEach(i -> i.setUser(null));
        }
        if (notifications != null) {
            notifications.forEach(i -> i.setUser(this));
        }
        this.notifications = notifications;
    }

    public Usuario notifications(Set<Notification> notifications) {
        this.setNotifications(notifications);
        return this;
    }

    public Usuario addNotification(Notification notification) {
        this.notifications.add(notification);
        notification.setUser(this);
        return this;
    }

    public Usuario removeNotification(Notification notification) {
        this.notifications.remove(notification);
        notification.setUser(null);
        return this;
    }

    public Set<FriendAssoc> getFriendAssocs() {
        return this.friendAssocs;
    }

    public void setFriendAssocs(Set<FriendAssoc> friendAssocs) {
        if (this.friendAssocs != null) {
            this.friendAssocs.forEach(i -> i.removeUsuario(this));
        }
        if (friendAssocs != null) {
            friendAssocs.forEach(i -> i.addUsuario(this));
        }
        this.friendAssocs = friendAssocs;
    }

    public Usuario friendAssocs(Set<FriendAssoc> friendAssocs) {
        this.setFriendAssocs(friendAssocs);
        return this;
    }

    public Usuario addFriendAssoc(FriendAssoc friendAssoc) {
        this.friendAssocs.add(friendAssoc);
        friendAssoc.getUsuarios().add(this);
        return this;
    }

    public Usuario removeFriendAssoc(FriendAssoc friendAssoc) {
        this.friendAssocs.remove(friendAssoc);
        friendAssoc.getUsuarios().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Usuario)) {
            return false;
        }
        return id != null && id.equals(((Usuario) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Usuario{" +
            "id=" + getId() +
            "}";
    }
}
