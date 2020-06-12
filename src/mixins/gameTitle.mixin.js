export const gameTitleMixin = {
  methods: {
    getTitle(data) {
      var title = data.release.alternate_title
        ? data.release.alternate_title
        : data.release.game.title;
      return title;
    },
    getRecommendedTitle(data) {
      var title = data.recommended_release.alternate_title
        ? data.recommended_release.alternate_title
        : data.recommended_release.game.title;
      return title;
    }
  }
}
