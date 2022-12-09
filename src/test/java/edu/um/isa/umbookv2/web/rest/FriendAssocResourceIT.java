package edu.um.isa.umbookv2.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import edu.um.isa.umbookv2.IntegrationTest;
import edu.um.isa.umbookv2.domain.FriendAssoc;
import edu.um.isa.umbookv2.repository.FriendAssocRepository;
import edu.um.isa.umbookv2.service.FriendAssocService;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link FriendAssocResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class FriendAssocResourceIT {

    private static final String ENTITY_API_URL = "/api/friend-assocs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private FriendAssocRepository friendAssocRepository;

    @Mock
    private FriendAssocRepository friendAssocRepositoryMock;

    @Mock
    private FriendAssocService friendAssocServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFriendAssocMockMvc;

    private FriendAssoc friendAssoc;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FriendAssoc createEntity(EntityManager em) {
        FriendAssoc friendAssoc = new FriendAssoc();
        return friendAssoc;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FriendAssoc createUpdatedEntity(EntityManager em) {
        FriendAssoc friendAssoc = new FriendAssoc();
        return friendAssoc;
    }

    @BeforeEach
    public void initTest() {
        friendAssoc = createEntity(em);
    }

    @Test
    @Transactional
    void createFriendAssoc() throws Exception {
        int databaseSizeBeforeCreate = friendAssocRepository.findAll().size();
        // Create the FriendAssoc
        restFriendAssocMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(friendAssoc)))
            .andExpect(status().isCreated());

        // Validate the FriendAssoc in the database
        List<FriendAssoc> friendAssocList = friendAssocRepository.findAll();
        assertThat(friendAssocList).hasSize(databaseSizeBeforeCreate + 1);
        FriendAssoc testFriendAssoc = friendAssocList.get(friendAssocList.size() - 1);
    }

    @Test
    @Transactional
    void createFriendAssocWithExistingId() throws Exception {
        // Create the FriendAssoc with an existing ID
        friendAssoc.setId(1L);

        int databaseSizeBeforeCreate = friendAssocRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restFriendAssocMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(friendAssoc)))
            .andExpect(status().isBadRequest());

        // Validate the FriendAssoc in the database
        List<FriendAssoc> friendAssocList = friendAssocRepository.findAll();
        assertThat(friendAssocList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllFriendAssocs() throws Exception {
        // Initialize the database
        friendAssocRepository.saveAndFlush(friendAssoc);

        // Get all the friendAssocList
        restFriendAssocMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(friendAssoc.getId().intValue())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllFriendAssocsWithEagerRelationshipsIsEnabled() throws Exception {
        when(friendAssocServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restFriendAssocMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(friendAssocServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllFriendAssocsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(friendAssocServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restFriendAssocMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(friendAssocRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getFriendAssoc() throws Exception {
        // Initialize the database
        friendAssocRepository.saveAndFlush(friendAssoc);

        // Get the friendAssoc
        restFriendAssocMockMvc
            .perform(get(ENTITY_API_URL_ID, friendAssoc.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(friendAssoc.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingFriendAssoc() throws Exception {
        // Get the friendAssoc
        restFriendAssocMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingFriendAssoc() throws Exception {
        // Initialize the database
        friendAssocRepository.saveAndFlush(friendAssoc);

        int databaseSizeBeforeUpdate = friendAssocRepository.findAll().size();

        // Update the friendAssoc
        FriendAssoc updatedFriendAssoc = friendAssocRepository.findById(friendAssoc.getId()).get();
        // Disconnect from session so that the updates on updatedFriendAssoc are not directly saved in db
        em.detach(updatedFriendAssoc);

        restFriendAssocMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedFriendAssoc.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedFriendAssoc))
            )
            .andExpect(status().isOk());

        // Validate the FriendAssoc in the database
        List<FriendAssoc> friendAssocList = friendAssocRepository.findAll();
        assertThat(friendAssocList).hasSize(databaseSizeBeforeUpdate);
        FriendAssoc testFriendAssoc = friendAssocList.get(friendAssocList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingFriendAssoc() throws Exception {
        int databaseSizeBeforeUpdate = friendAssocRepository.findAll().size();
        friendAssoc.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFriendAssocMockMvc
            .perform(
                put(ENTITY_API_URL_ID, friendAssoc.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(friendAssoc))
            )
            .andExpect(status().isBadRequest());

        // Validate the FriendAssoc in the database
        List<FriendAssoc> friendAssocList = friendAssocRepository.findAll();
        assertThat(friendAssocList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchFriendAssoc() throws Exception {
        int databaseSizeBeforeUpdate = friendAssocRepository.findAll().size();
        friendAssoc.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFriendAssocMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(friendAssoc))
            )
            .andExpect(status().isBadRequest());

        // Validate the FriendAssoc in the database
        List<FriendAssoc> friendAssocList = friendAssocRepository.findAll();
        assertThat(friendAssocList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamFriendAssoc() throws Exception {
        int databaseSizeBeforeUpdate = friendAssocRepository.findAll().size();
        friendAssoc.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFriendAssocMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(friendAssoc)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the FriendAssoc in the database
        List<FriendAssoc> friendAssocList = friendAssocRepository.findAll();
        assertThat(friendAssocList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateFriendAssocWithPatch() throws Exception {
        // Initialize the database
        friendAssocRepository.saveAndFlush(friendAssoc);

        int databaseSizeBeforeUpdate = friendAssocRepository.findAll().size();

        // Update the friendAssoc using partial update
        FriendAssoc partialUpdatedFriendAssoc = new FriendAssoc();
        partialUpdatedFriendAssoc.setId(friendAssoc.getId());

        restFriendAssocMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFriendAssoc.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFriendAssoc))
            )
            .andExpect(status().isOk());

        // Validate the FriendAssoc in the database
        List<FriendAssoc> friendAssocList = friendAssocRepository.findAll();
        assertThat(friendAssocList).hasSize(databaseSizeBeforeUpdate);
        FriendAssoc testFriendAssoc = friendAssocList.get(friendAssocList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateFriendAssocWithPatch() throws Exception {
        // Initialize the database
        friendAssocRepository.saveAndFlush(friendAssoc);

        int databaseSizeBeforeUpdate = friendAssocRepository.findAll().size();

        // Update the friendAssoc using partial update
        FriendAssoc partialUpdatedFriendAssoc = new FriendAssoc();
        partialUpdatedFriendAssoc.setId(friendAssoc.getId());

        restFriendAssocMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFriendAssoc.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFriendAssoc))
            )
            .andExpect(status().isOk());

        // Validate the FriendAssoc in the database
        List<FriendAssoc> friendAssocList = friendAssocRepository.findAll();
        assertThat(friendAssocList).hasSize(databaseSizeBeforeUpdate);
        FriendAssoc testFriendAssoc = friendAssocList.get(friendAssocList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingFriendAssoc() throws Exception {
        int databaseSizeBeforeUpdate = friendAssocRepository.findAll().size();
        friendAssoc.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFriendAssocMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, friendAssoc.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(friendAssoc))
            )
            .andExpect(status().isBadRequest());

        // Validate the FriendAssoc in the database
        List<FriendAssoc> friendAssocList = friendAssocRepository.findAll();
        assertThat(friendAssocList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchFriendAssoc() throws Exception {
        int databaseSizeBeforeUpdate = friendAssocRepository.findAll().size();
        friendAssoc.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFriendAssocMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(friendAssoc))
            )
            .andExpect(status().isBadRequest());

        // Validate the FriendAssoc in the database
        List<FriendAssoc> friendAssocList = friendAssocRepository.findAll();
        assertThat(friendAssocList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamFriendAssoc() throws Exception {
        int databaseSizeBeforeUpdate = friendAssocRepository.findAll().size();
        friendAssoc.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFriendAssocMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(friendAssoc))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the FriendAssoc in the database
        List<FriendAssoc> friendAssocList = friendAssocRepository.findAll();
        assertThat(friendAssocList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteFriendAssoc() throws Exception {
        // Initialize the database
        friendAssocRepository.saveAndFlush(friendAssoc);

        int databaseSizeBeforeDelete = friendAssocRepository.findAll().size();

        // Delete the friendAssoc
        restFriendAssocMockMvc
            .perform(delete(ENTITY_API_URL_ID, friendAssoc.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FriendAssoc> friendAssocList = friendAssocRepository.findAll();
        assertThat(friendAssocList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
