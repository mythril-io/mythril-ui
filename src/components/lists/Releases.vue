<template>
<div>

  <Loading v-if="loading" :simple="true" />
  <div v-else>
    <div class="md:flex md:justify-end mb-4">
      <button type="button" @click="showCreateModal" class="button button-primary leading-5">
        Create
      </button>
    </div>
    <div class="col-span-3 mt-6 md:mt-0">
      <div class="flex flex-col">
        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table class="min-w-full">
              <thead>
                <tr>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Alt. Title
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Platform
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Publisher
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Co-Developer
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Region
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Date Type
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                </tr>
              </thead>
              <tbody v-if="releases.length > 0">
                <tr class="bg-white even:bg-gray-50" v-for="(release, index) in releases" :key="index">
                  <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                    {{ release.alternate_title ? release.alternate_title : '-' }}
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    {{ release.platform.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    {{ release.publisher.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    {{ release.codeveloper ? release.codeveloper.name : '-' }}
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    {{ release.region.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    {{ release.date_type ? release.date_type.format : '-' }}
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    {{ release.date ? release.date : '-' }}
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                    <a href="#" @click="showEditModal(release)" class="is-link">Edit</a>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                    <a href="#" @click="showDeleteModal(release)" class="is-link">Delete</a>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr >
                  <td class="p-4 text-center" colspan="9">No releases</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Create Modal -->
  <ReleaseModal
    :open="createModal"
    :gameId="gameId"
    v-on:create="update"
    v-on:cancel="closeModals"
  />

  <!-- Edit Modal -->
  <ReleaseModal
    :release="selectedRelease"
    :open="editModal"
    :gameId="gameId"
    v-on:update="update"
    v-on:cancel="closeModals"
  />

  <!-- Delete Modal -->
  <Modal
    action="DELETE"
    :open="deleteModal"
    :title="'Delete Release?'"
    :message="modalMessage"
    proceedLabel="Delete"
    v-on:proceed="deleteRelease"
    v-on:cancel="closeModals"
  />

</div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import Modal from '@/components/modals/Modal.vue';
import ReleaseModal from '@/components/modals/Release.vue';
import { releaseService } from '@/services';

export default {
  name: 'ReleasesList',
  props: ['gameId'],
  components: {
    Loading, Modal, ReleaseModal
  },
  data () {
    return {
      releases: [],
      loading: true,
      selectedRelease: null,
      createModal: false,
      editModal: false,
      deleteModal: false,
    }
  },
  computed: {
      modalMessage () {
          // let resource = this.selectedItem ? '"' + (this.selectedItem.name || this.selectedItem.title )+ '"' : 'this resource';
          return `Are you sure you want to delete this release? This action cannot be undone.`;
      }
  },
  methods: {
    getReleases() {
      const { dispatch } = this.$store;
      this.loading = true;
      releaseService.getByGame(this.gameId).then(
        response => {
          this.releases = response.data;
          this.loading = false;
        },
        error => {
          this.loading = false;
          dispatch('alert/error', error, { root: true });
        }
      );
    },
    deleteRelease() {
      const { dispatch } = this.$store;
      releaseService.deleteResource(this.selectedRelease.id).then(
        response => {
          this.update();
          this.selectedRelease = null;
        },
        error => {
          this.closeModals();
          this.selectedRelease = null;
          dispatch('alert/error', error, { root: true });
        }
      );

    },
    showCreateModal() {
      this.selectedRelease = null;
      this.createModal = true;
    },
    showEditModal(release) {
      this.selectedRelease = release;
      this.editModal = true;
    },
    showDeleteModal(release) {
      this.selectedRelease = release;
      this.deleteModal = true;
    },
    update() {
      this.closeModals();
      this.getReleases();
    },
    closeModals() {
      this.createModal = false;
      this.editModal = false;
      this.deleteModal = false;
    },
  },
  watch: {
      'gameId': {
          handler() {
            this.getReleases();
          },
          immediate: true,
      }
  },
}
</script>
