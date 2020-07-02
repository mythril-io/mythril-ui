<template>
  <div>
    
      <Loading v-if="!data" :simple="false"/>

      <ResourceList
        resource="Developer"
        :data="data"
        :loading="loading"
        :meta="meta"
        v-on:goto-page="getData($event.page, $event.search)"
        v-on:search="getData(1, $event)"
        v-on:show-form="showForm($event)"
        v-on:delete="deleteResource($event)"
      >
        <template #details="{ item }">
          <div class="text-sm leading-5 font-medium text-primary truncate">
            {{ item.name }}
          </div>
          <div v-if="meta.details" class="mt-2 flex">
            <div class="flex items-center text-sm leading-5 text-gray-500">
              <span>
                Country: {{ item.country }}
              </span>
            </div>
          </div>
        </template>
      </ResourceList>

  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import ResourceList from '@/components/admin/ResourceList.vue'
import { developerService } from '@/services';

export default {
    name: 'AdminDevelopers',
    components: {
      Loading, ResourceList
    },
    data () {
        return {
            data: null,
            loading: false,
            meta: {
              name: 'name',
              details: 'country',
              details_label: 'Country'
            }
        }
    },
    methods: {
        getData (page, search) {
          this.loading = true;
          const { dispatch } = this.$store;
          developerService.getByPage(page, search).then(
            response => {
              this.data = response.data;
              this.loading = false;
            },
            error => {
              dispatch('alert/error', error, { root: true });
              this.loading = false;
            }
          );
        },
        showForm (item) {
          if (item) {
            this.$router.push({ name: 'AdminDeveloperEdit', params: { id: item.id } })
          } else {
            this.$router.push({ name: 'AdminDeveloperCreate' })
          }
        },
        deleteResource (id) {
          const { dispatch } = this.$store;
          developerService.deleteResource(id).then(
            response => {
              this.getData(this.data.page);
              dispatch('alert/success', response.data.message, { root: true });
            },
            error => {
              dispatch('alert/error', error, { root: true });
            }
          );
        }
    },
    created () {
        this.getData();
    },
};
</script>
