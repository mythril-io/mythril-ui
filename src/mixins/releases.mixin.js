var moment = require('moment');

export const releasesMixin = {
  methods: {
    hasReleased(release) {
      let hasReleased = true;
      let dateType = release.date_type ? release.date_type.format : 'Y-m-d';
      
      const releaseDate = moment(release.date);
      const currentMoment = moment();
      
      switch(dateType) {
        case 'TBD':
          hasReleased = false;
          break;
        case 'Y':
          if ( releaseDate.isAfter(currentMoment, 'year') )
            hasReleased = false
          break;
        case 'Y-m':
          if ( releaseDate.isAfter(currentMoment, 'month') )
            hasReleased = false
          break;
        case 'Y-m-d':
          if ( releaseDate.isAfter(currentMoment, 'day') )
            hasReleased = false
          break;
      }

      return hasReleased;
    },
  },
}
