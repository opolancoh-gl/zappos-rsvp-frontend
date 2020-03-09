<template>
  <div class="subheader">
    <div class="container">
      <div class="row">
        <div class="col text-center">
          <div class="subheader-title">{{title}}</div>
          <div class="subheader-subtitle">{{subTitle}}</div>
        </div>
      </div>
    </div>
    <SubHeaderWave />
  </div>
</template>

<script src="./script.js"></script>

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
</style>
