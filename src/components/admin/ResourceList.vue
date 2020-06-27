<template>
<div>

  <div class="md:flex md:items-center md:justify-between mb-4" v-if="data">
    <div class="flex-1 min-w-0">
      <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
        {{ resource }}s
      </h2>
      <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
        <div class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6">
          Entries currently in the Database: {{ data.total }}
        </div>
      </div>
    </div>
    <div class="mt-4 flex md:mt-0 md:ml-4">
      <button type="button" @click="$emit('show-form')" class="relative inline-flex items-center leading-5 button button-primary">
        Create
      </button>
    </div>
  </div>

  <div v-if="data" class="bg-white overflow-hidden shadow rounded-md">

    <Loading
      v-if="loading"
      :simple="true"
      heightClass="min-h-1/4"
    />

    <div v-else>
      <div class="px-4 py-5 sm:px-6">
        <div class="w-full">
          <label for="search" class="sr-only">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input id="search" v-on:keyup.enter="search" v-model="searchQuery" class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:shadow-outline-blue sm:text-sm transition duration-150 ease-in-out" placeholder="Search" />
          </div>
        </div>
      </div>
      <ul>
        <li class="border-t border-gray-200" v-for="item in data.data" :key="item.id">
          <a href="#" @click="$emit('show-form', item)" class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
            <div class="px-4 py-4 flex items-center sm:px-6">
              <div class="min-w-0 flex-1 sm:flex">
                <div>
                  <slot name="details" v-bind:item="item"></slot>
                </div>
              </div>
              <div class="ml-5 flex-shrink-0">
                <button type="button" @click="deletePrompt(item)" v-on:click.stop class="inline-flex items-center text-base text-base leading-6 button button-danger-alt">
                  <svg class="-ml-1 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                  </svg>
                </button>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>

    <Pagination
    class="mx-5"
      :currentPage="data.current_page"
      :totalPages="data.last_page"
      :totalItems="data.total"
      :itemsPerPage="data.per_page"
      :disabled="loading"
      v-on:goto-page="gotoPage($event)"
    />
  </div>

  <Modal
    action="DELETE"
    :open="modal"
    :title="'Delete ' + this.resource + '?'"
    :message="modalMessage"
    proceedLabel="Delete"
    v-on:proceed="deleteResource"
    v-on:cancel="closeModal"
  />

</div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import Modal from '@/components/modals/Modal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  props: {
    resource: {
      type: String,
      required: true
    },
    data: {
      required: true
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    Loading, Modal, Pagination
  },
  data () {
      return {
          selectedItem: null,
          modal: false,
          searchQuery: ''
      }
  },
  computed: {
      modalMessage () {
          let resource = this.selectedItem ? '"' + (this.selectedItem.name || this.selectedItem.title )+ '"' : 'this resource';
          return `Are you sure you want to delete ${ resource }? This action cannot be undone.`;
      }
  },
  methods: {
      gotoPage (page) {
        this.$emit('goto-page', { 'page': page, 'search': this.searchQuery });
      },
      search () {
        this.$emit('search', this.searchQuery);
      },
      closeModal () {
        this.modal = false;
      },
      deletePrompt (item) {
        this.selectedItem = item;
        this.modal = true;
      },
      deleteResource () {
        this.$emit('delete', this.selectedItem.id);
        this.closeModal();
        this.selectedItem = null;
      }
  },
};
</script>
