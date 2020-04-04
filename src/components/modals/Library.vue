<template>
  <BaseModal :open="open" width="sm:max-w-4xl">
    <template #body>

      <div class="mt-3 text-center sm:mt-0 sm:text-left">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Library - {{ game.title }}
        </h3>
        <Loading v-if="loading" :simple="true"/>
        <div v-else class="flex flex-wrap justify-between mt-2">
          <transition name="fade" mode="out-in">
            <div v-if="!editing" class="w-full mt-5" key="display">

              <Message v-if="!userLibrary.length" content="You have no releases for this game in your library." />

              <div class="flex flex-col" v-if="userLibrary.length">
                <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                  <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                    <table class="min-w-full">
                      <thead>
                        <tr>
                          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Platform
                          </th>
                          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Play Status
                          </th>
                          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Score
                          </th>
                          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Hours
                          </th>
                          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Notes
                          </th>
                          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="bg-white even:bg-gray-50" v-for="entry in userLibrary" :key="entry.id">
                          <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                            <span :aria-label="moreInfo(entry)" data-balloon-pos="right">{{ entry.release.platform.acronym }}</span>
                            <span v-if="entry.own" class="ml-2 bg-primary text-white tag">Own</span>
                            <span v-if="entry.digital" class="ml-2 bg-gray-200 tag">Digital</span>
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                            {{ entry.play_status.name }}
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                            {{ entry.score ? entry.score : '-' }}
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                            {{ entry.hours ? entry.hours : '-' }}
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                            <span v-if="entry.notes" :aria-label="entry.notes" data-balloon-length="xlarge" data-balloon-pos="left">View Notes</span>
                            <span v-else>-</span>
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                            <a href="#" @click="startEdit(entry)" class="is-link">Edit</a>
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                            <a href="#" @click="startDelete(entry)" class="is-link-danger">Delete</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>


              <div class="mt-3 py-3 sm:flex sm:flex-row-reverse">
                <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                  <button type="button" @click="editing=true" class="inline-flex justify-center w-full button button-primary">
                    New
                  </button>
                </span>
                <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                  <button @click="$emit('cancel')" type="button" class="inline-flex justify-center w-full button button-white">
                    Cancel
                  </button>
                </span>
              </div>

            </div>
            <div v-if="editing" class="w-full" key="editing">

              <LibraryForm
                class="mt-4"
                :deleting="deleting"
                :releases="game.releases"
                :library="userLibrary"
                :playStatuses="playStatuses"
                :selected="selected"
                v-on:post="updateReleases($event)"
                v-on:patch="updateLibraryEntry()"
                v-on:delete="deleteLibraryEntry($event)"
                v-on:cancel="cancel"
              />

            </div>
          </transition>
        </div>
      </div>

    </template>
  </BaseModal>
</template>

<script>
import BaseModal from '@/components/modals/Base.vue'
import Loading from '@/components/Loading.vue'
import Message from '@/components/Message.vue'
import LibraryForm from '@/components/forms/Library.vue'
import { libraryService, playStatusService } from '@/services';

export default {
    name: 'LibraryModal',
    components: {
      BaseModal, Loading, LibraryForm, Message
    },
    props: {
      open: {
        type: Boolean,
        required: true,
      },
      game: {
        type: Object,
        required: true
      },
    },
    data () {
      return {
        editing: false,
        deleting: false,
        loading: true,
        userLibrary: [],
        playStatuses: [],
        selected: null
      }
    },
    methods: {
      moreInfo (entry) {
        const info = entry.release.platform.name + ' - ' + entry.release.region.name + (entry.release.alternate_title ? ' - ' + entry.release.alternate_title: '');
        return info
      },
      startEdit (entry) {
        this.selected = entry;
        this.editing = true;
      },
      startDelete (entry) {
        this.selected = entry;
        this.deleting = true;
        this.editing = true;
      },
      cancel() {
        this.editing = false;
        this.deleting = false;
        this.selected = null;
        this.$emit('update', this.userLibrary.length)
      },
      updateLibraryEntry () {
        this.getUserLibrary(this.$route.params.id)
        this.cancel();
      },
      updateReleases (release) {
        this.userLibrary.push(release);
        this.cancel();
      },
      deleteLibraryEntry (entry) {
        const index = this.userLibrary.findIndex(item => item.id == entry.id);
        this.userLibrary.splice(index, 1);
        this.cancel();
      },
      getUserLibrary (id) {
        this.loading = true;
        const { dispatch } = this.$store;
        libraryService.getByGameAndUser(id).then(
          response => {
            this.userLibrary = response.data;
            this.loading = false;
          },
          error => {
            this.loading = false;
            dispatch('alert/error', error, { root: true });
          }
        );
      },
      getPlayStatuses (id) {
        const { dispatch } = this.$store;
        playStatusService.getAll().then(
          response => {
            this.playStatuses = response.data;
          },
          error => {
            dispatch('alert/error', error, { root: true });
          }
        );
      }
    },
    created () {
        if (this.$route.params.id) {
          this.getUserLibrary(this.$route.params.id)
          this.getPlayStatuses()
        }
    }
};
</script>
