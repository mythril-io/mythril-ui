<template>
<div>

  <Title title="Dashboard" />

  <Loading v-if="!data" :simple="true"/>
  <div v-else>
    
    <div class="mt-5">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Recently Created Games
      </h3>
      <div class="mt-5 flex flex-col">
        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table class="min-w-full">
              <thead>
                <tr>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Date Created
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white even:bg-gray-50" v-for="game in data.recent_games" :key="game.id">
                  <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium is-link">
                    <router-link :to="{ name: 'Game', params: { id: game.id, slug: game.slug }}">{{ game.title }}</router-link>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    {{ game.created_at | ago }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Statistics
      </h3>
      <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <dl>
              <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
                Games
              </dt>
              <dd class="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                {{ data.games_count | commaSeparated }}
              </dd>
            </dl>
          </div>
        </div>
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <dl>
              <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
                Releases
              </dt>
              <dd class="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                {{ data.releases_count | commaSeparated }}
              </dd>
            </dl>
          </div>
        </div>
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <dl>
              <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
                Platforms
              </dt>
              <dd class="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                {{ data.platform_count | commaSeparated }}
              </dd>
            </dl>
          </div>
        </div>
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <dl>
              <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
                Genres
              </dt>
              <dd class="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                {{ data.genres_count | commaSeparated }}
              </dd>
            </dl>
          </div>
        </div>
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <dl>
              <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
                Developers
              </dt>
              <dd class="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                {{ data.developers_count | commaSeparated }}
              </dd>
            </dl>
          </div>
        </div>
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <dl>
              <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
                Publishers
              </dt>
              <dd class="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                {{ data.publishers_count | commaSeparated }}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Recently Registered Users
      </h3>
      <div class="mt-5 flex flex-col">
        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table class="min-w-full">
              <thead>
                <tr>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Date Joined
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr v-for="user in data.recent_users" :key="user.id">
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full" :src="getUserAvatar(user)" :alt="user.username" />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm leading-5 font-medium is-link">
                          <router-link :to="{ name: 'UserProfile', params: { username: user.username }}">{{ user.username }}</router-link>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                    {{ user.created_at | dateFormat }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>    

  </div>

</div>
</template>

<script>
import Title from '@/components/admin/Title.vue'
import Loading from '@/components/Loading.vue'
import { adminService } from '@/services';
import { iconsMixin } from '@/mixins';

export default {
    name: 'AdminDashboard',
    components: {
      Title, Loading
    },
    mixins: [iconsMixin],
    data () {
        return {
            data: null,
            loading: false,
        }
    },
    methods: {
        getData (page, search) {
          this.loading = true;
          const { dispatch } = this.$store;
          adminService.getDashboard().then(
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
    },
    created () {
        this.getData();
    },
};
</script>
