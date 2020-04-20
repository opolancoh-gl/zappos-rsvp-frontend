import { mapState } from 'vuex';
import { replaceStateInfo } from '@/utils/text-utils';

const storageContainer = {};


export default {
  filters: {
    replaceStateInfo: replaceStateInfo(storageContainer),
  },
  data() {
    return {
      id: -1,
    };
  },
  mounted() {
    storageContainer.store = this.$store;
    // this.isExtended = this.$slots.default && this.$slots.default.length > 0;
  },
  computed: {
    ...mapState('header', {
      title: (state) => state.headerTitle,
      subtitle: (state) => state.headerSubtitle,
      navItems: (state) => state.headerSubmenuItems,
    }),
    isExtended() {
      return this.navItems.length > 0;
    },
    isSubtitleString() {
      return !Array.isArray(this.subtitle);
    },
  },
};
