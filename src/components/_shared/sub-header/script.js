import SubHeaderWave from './SubHeaderWave.vue';

export default {
  name: 'SubHeader',
  props: {
    title: { type: String, required: true },
    subTitle: String,
  },
  components: {
    SubHeaderWave,
  },
};
