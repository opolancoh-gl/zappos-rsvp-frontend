<template>
  <!-- arrows -->
  <div class="row" :style="[this.rowStyle]">
    <div class="col"></div>
    <div class="col">
      <div class="mb-4 text-center text-muted">
        <i :class="[arrowClass.leftSide]"></i>
      </div>
    </div>
    <div class="col">
      <div class="mb-4 text-center text-muted">
        <i :class="[arrowClass.rigthSide]"></i>
      </div>
    </div>
  </div>
  <!-- style="margin-top: -75px" -->
</template>

<script>
export default {
  name: 'EventMessageCenterUpdateArrows',
  props: {
    way: { type: String },
    rowStyle: { type: Object },
  },
  computed: {
    arrowClass() {
      let leftSide = 'fas fa-long-arrow-alt-down fa-4x';
      let rigthSide = 'fas fa-long-arrow-alt-down fa-4x';

      if (this.way === 'left') {
        leftSide = 'fas fa-level-down-alt fa-4x fa-rotate-90';
      } else if (this.way === 'right') {
        leftSide = 'fas fa-level-down-alt fa-4x';
        rigthSide = 'fas fa-level-down-alt fa-4x';
      }

      return { leftSide, rigthSide };
    },
  },
};
</script>
