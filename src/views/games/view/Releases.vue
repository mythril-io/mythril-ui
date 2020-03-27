<template>
  <div>
    <Title title="Releases" />
    <Loading v-if="!game" :simple="true" />
    <div v-else>
      <div class="w-full" v-show="game.releases.length > 0">
        <div class="flex flex-col">
          <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
              <table class="min-w-full">
                <thead>
                  <tr>
                    <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Platform
                    </th>
                    <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Alt. Title
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
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white even:bg-gray-50" v-for="(release, index) in sortedReleases" :key="index">
                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                      {{ release.platform.name }}
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                      {{ release.alternate_title ? release.alternate_title : '-' }}
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
                      {{ release.date | dateFormat((release.date_type ? release.date_type.id : 1)) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Message v-if="game.releases.length == 0" content="No releases found." />
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import Message from '@/components/Message.vue'
import Title from '@/components/Title.vue'
import _ from 'lodash';

export default {
  name: 'GameReleases',
  components: {
    Loading, Title, Message
  },
  props: ['game'],
  computed: {
    sortedReleases() {
      return _.orderBy(this.game.releases, 'platform.name', 'asc');
    }
  },
}
</script>
