import moment from 'moment';

export default {
  now () {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
  }
};
