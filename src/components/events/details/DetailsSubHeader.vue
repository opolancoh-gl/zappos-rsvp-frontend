<template>
  <div class="subheader">
    <div class="container">
      <div class="row event-nav d-flex align-items-center">
        <div class="col-4 col-xl-5">
          <div class="subheader-title">Event 1</div>
          <div class="subheader-subtitle">
            <div class="d-block">FEB 25, 2020 AT 2:00PM</div>
            <div class="d-block">SAN FRANCISCO</div>
          </div>
        </div>
        <div class="col text-center d-flex justify-content-end">
          <ul class="nav nav-tabs align-items-center">
            <li class="nav-item">
              <router-link class="fa-stack" to="/events/1">
                <!-- <i class="fas fa-circle fa-stack-2x nav-circle"></i> -->
                <i class="fas fa-home fa-stack-1x fa-fw nav-icon"></i>
                <!-- <i class="fas fa-house fa-stack-1x fa-fw nav-icon"></i> -->
                <strong class="fa-stack-1x nav-label">OVERVIEW</strong>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="fa-stack" to="/events/1/users">
                <!-- <i class="fas fa-circle fa-stack-2x nav-circle"></i> -->
                <i class="fas fa-lock fa-stack-1x fa-fw nav-icon"></i>
                <!-- <i class="fas fa-lock-alt fa-stack-1x fa-fw nav-icon"></i> -->
                <strong class="fa-stack-1x nav-label">ACCESS</strong>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="fa-stack" to="/events/1/message-center">
                <!-- <i class="fas fa-circle fa-stack-2x nav-circle"></i> -->
                <i class="fas fa-comment-alt fa-stack-1x fa-fw nav-icon"></i>
                <!-- <i class="fas fa-comment-alt-lines fa-stack-1x fa-fw nav-icon"></i> -->
                <strong class="fa-stack-1x nav-label">
                  MESSAGE
                  <br />CENTER
                </strong>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="fa-stack" to="/events/1/attendees">
                <!-- <i class="fas fa-circle fa-stack-2x nav-circle"></i> -->
                <i class="fas fa-user fa-stack-1x fa-fw nav-icon"></i>
                <!-- <i class="fas fa-user fa-stack-1x fa-fw nav-icon"></i> -->
                <strong class="fa-stack-1x nav-label">ATTENDEES</strong>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="fa-stack" to="/events/1/blast-center">
                <!-- <i class="fas fa-circle fa-stack-2x nav-circle"></i> -->
                <i class="fas fa-rocket fa-stack-1x fa-fw nav-icon"></i>
                <!-- <i class="fas fa-rocket-launch fa-stack-1x fa-fw nav-icon"></i> -->
                <strong class="fa-stack-1x nav-label">
                  BLAST
                  <br />CENTER
                </strong>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <SubHeaderWave />
  </div>
</template>

<script >
import SubHeaderWave from '@/components/_ui/Wave.vue';

export default {
  name: 'EventDetailsSubHeader',
  props: {
    title: { type: String, required: true },
    subTitle: String,
  },
  components: { SubHeaderWave },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/bootstrap';

.subheader {
  position: relative;
  padding: 4rem 0 6rem;
  color: white;
  background-color: $primary;

  .subheader-title {
    margin-bottom: 0.5rem;
    font-size: 2.5rem;
    line-height: 1;
    font-weight: bold;
  }

  .subheader-subtitle {
    margin-top: 0;
    font-size: 1.2rem;
    font-weight: 100;
    line-height: 1.2;
  }

  .nav-tabs {
    border-bottom: none;
  }
}

.nav-label {
  line-height: 1;
}
</style>
