<template>
  <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" v-bind:class="{ 'pointer-events-none opacity-50': disabled }">
    <div class="flex-1 flex justify-between sm:hidden">
      <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
        Previous
      </a>
      <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
        Next
      </a>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p v-if="totalItems" class="text-sm leading-5 text-gray-700">
          Showing
          <span class="font-medium">{{ firstItem }}</span>
          to
          <span class="font-medium">{{ lastItem }}</span>
          of
          <span class="font-medium">{{ totalItems }}</span>
          results
        </p>
        <p v-else class="text-sm leading-5 text-gray-700">0 results</p>
      </div>
      <div>
        <paginate
          v-model="page"
          :page-count="totalPages"
          :click-handler="gotoPage"
          :container-class="'relative z-0 inline-flex shadow-sm'"
          :page-link-class="'page-item'"
          :prev-link-class="'prev-item'"
          :next-link-class="'next-item'"
          :active-class="'active-item'"
          :break-view-link-class="'break-view'"
          :no-li-surround="true"
          :prev-text="prevSymbol"
          :next-text="nextSymbol">
        </paginate>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      },
      itemsPerPage: {
        type: Number,
        required: true
      },
      totalItems: {
        type: Number,
        required: true
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false
      },
    },
    computed: {
      page() {
        return this.currentPage;
      },
      prevSymbol() {
        return `<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>`;
      },
      nextSymbol() {
        return `<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>`;
      },
      firstItem() {
        if (this.currentPage == 1) {
          return 1;
        }
        return (this.currentPage - 1) * this.itemsPerPage + 1;
      },
      lastItem() {
        return this.firstItem + this.itemsPerPage <= this.totalItems
          ? this.firstItem + this.itemsPerPage - 1
          : this.totalItems;
      }
    },
    methods: {
      gotoPage (page) {
        this.$emit('goto-page', page);
      }
    },
  }
</script>

<style lang="scss">
.pagination {
}
.page-item {
  @apply -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 transition ease-in-out duration-150
}
.page-item:hover {
  @apply text-gray-500
}
.page-item:focus {
  @apply z-10 outline-none border-blue-300 shadow-outline-blue
}
.page-item:active {
  @apply bg-gray-100 text-gray-700
}
.prev-item {
  @apply relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 transition ease-in-out duration-150
}
.prev-item:hover {
  @apply text-gray-400
}
.prev-item:focus {
  @apply z-10 outline-none border-blue-300 shadow-outline-blue
}
.prev-item:active {
  @apply bg-gray-100 text-gray-500
}

.next-item {
  @apply -ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 transition ease-in-out duration-150
}
.next-item:hover {
  @apply text-gray-400
}
.next-item:focus {
  @apply z-10 outline-none border-blue-300 shadow-outline-blue
}
.next-item:active {
  @apply bg-gray-100 text-gray-500
}

.break-view {
  @apply -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 cursor-text #{!important}
}
.break-view:focus {
  @apply shadow-none #{!important}
}
.active-item {
  @apply bg-gray-100 cursor-text #{!important}
}
.disabled {
  @apply opacity-75 cursor-text #{!important}
}
.disabled:hover {
  @apply text-gray-500 #{!important}
}
</style>
