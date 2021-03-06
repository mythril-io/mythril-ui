var md = require("markdown-it")();

export const getResourceMixin = {
  data () {
    return {
      loading: false,
      data: null,
      editing: false,
    }
  },
  methods: {
    compiledMarkdown (data) {
      return md.render(data);
    },
  },
  watch: {
      '$route.params': {
          handler() {
              this.getData()
          },
          immediate: true,
      }
  },
}
