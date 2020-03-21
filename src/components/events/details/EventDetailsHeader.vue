<template>
  <div class="row event-nav d-flex align-items-center">
    <div class="col-4 col-xl-5">
      <HeaderTitle :title="name">
        <div class="d-block">{{ date | dateTimeAtShort | upperCase }}</div>
        <div class="d-block">{{ location | upperCase }}</div>
      </HeaderTitle>
    </div>
    <div class="col text-center d-flex justify-content-end">
      <ul class="nav nav-tabs align-items-center">
        <li class="nav-item">
          <router-link class="fa-stack" :to="{ name: 'EventOverview', params: { id } }">
            <i class="fas fa-home fa-stack-1x fa-fw nav-icon"></i>
            <strong class="fa-stack-1x nav-label">OVERVIEW</strong>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="fa-stack" :to="{ name: 'EventAccess', params: { id } }">
            <i class="fas fa-lock fa-stack-1x fa-fw nav-icon"></i>
            <strong class="fa-stack-1x nav-label">ACCESS</strong>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="fa-stack" :to="{ name: 'EventMessageCenter', params: { id } }">
            <i class="fas fa-comment-alt fa-stack-1x fa-fw nav-icon"></i>
            <strong class="fa-stack-1x nav-label">
              MESSAGE
              <br />CENTER
            </strong>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="fa-stack" :to="{ name: 'EventAttendees', params: { id } }">
            <i class="fas fa-user fa-stack-1x fa-fw nav-icon"></i>
            <strong class="fa-stack-1x nav-label">ATTENDEES</strong>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="fa-stack" :to="{ name: 'EventBlastCenter', params: { id } }">
            <i class="fas fa-rocket fa-stack-1x fa-fw nav-icon"></i>
            <strong class="fa-stack-1x nav-label">
              BLAST
              <br />CENTER
            </strong>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import HeaderTitle from '@/components/_ui/HeaderTitle.vue';

export default {
  props: {
    name: { type: String, required: true },
    date: { type: Number, required: true },
    location: { type: String, required: true },
    id: { type: [String, Number], required: true },
  },
  components: { HeaderTitle },
};
</script>

<style scoped>
.nav-tabs {
  border-bottom: none;
}

.nav-label {
  line-height: 1;
}
</style>
