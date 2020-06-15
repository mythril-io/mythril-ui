<template>
  <div>
      <Loading v-if="!data" :simple="false"/>

      <ResourceList
        resource="Game"
        :data="data"
        :loading="loading"
        v-on:goto-page="getData($event.page, $event.search)"
        v-on:search="getData(1, $event)"
        v-on:show-form="showForm($event)"
        v-on:delete="deleteResource($event)"
      >
        <template #details="{ item }">
          <div class="flex">
            <div class="flex-shrink-0">
              <img class="z-1 inline-block h-14 w-14 rounded-md" :src="'https://mythril.nyc3.cdn.digitaloceanspaces.com/games/icons/' + item.icon" :alt="item.title" />
            </div>
            <div class="flex-1 ml-4">
              <div class="text-sm leading-5 font-medium text-primary truncate">
                {{ item.title }}
              </div>
              <div class="mt-2 flex">
                <div class="flex items-center text-sm leading-5 text-gray-500">
                  <span>
                    {{ item.synopsis }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </ResourceList>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import ResourceList from '@/components/admin/ResourceList.vue'
import { gameService } from '@/services';

export default {
    name: 'AdminGames',
    components: {
      Loading, ResourceList
    },
    data () {
        return {
            data: null,
            loading: false,
            meta: {
              name: 'title',
              details: 'synopsis',
              details_label: 'Synopsis'
            }
        }
    },
    methods: {
        getData (page, search='') {
          this.loading = true;
          const { dispatch } = this.$store;
          gameService.getByPage(page, { 'search' : search }).then(
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
            this.$router.push({ name: 'AdminGameEdit', params: { id: item.id } })
          } else {
            this.$router.push({ name: 'AdminGameCreate' })
          }
        },
        deleteResource (id) {
          const { dispatch } = this.$store;
          gameService.deleteResource(id).then(
            response => {
              // Refresh data for same page
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
