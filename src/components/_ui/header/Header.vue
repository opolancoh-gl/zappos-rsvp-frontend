<template>
  <div class="Header" :class="{ isExpanded: isExtended }">
    <div class="container">
      <div
        class="row"
        :class="{
          'event-nav': isExtended,
          'd-flex': isExtended,
          'align-items-center': isExtended,
        }"
      >
        <div
          :class="{
            'col-4': isExtended,
            'col-xl-5': isExtended,
            col: !isExtended,
            'text-center': !isExtended,
          }"
        >
          <div>
            <div class="Header-title">{{ title }}</div>
            <div class="Header-subtitle" v-if="isSubtitleString">
              {{ subtitle | replaceStateInfo }}
            </div>
            <div class="subheader-subtitle" v-if="!isSubtitleString">
              <div class="d-block" v-for="item in subtitle" :key="item">
                {{ item }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="col text-center d-flex justify-content-end"
          v-if="isExtended"
        >
          <ul
            class="Header-nav nav align-items-center"
            data-old-class="nav-tabs"
          >
            <li
              class="nav-item"
              v-for="(item, index) in navItems"
              :key="index"
              :data-tmp="item.targetRoute.name"
            >
              <router-link
                class="fa-stack"
                :to="item.targetRoute"
              >
                <i
                  class="fas fa-stack-1x fa-fw nav-icon"
                  :class="item.icon"
                ></i>
                <strong
                  class="Header-navLabel fa-stack-1x nav-label"
                  >{{ item.title }}</strong
                >
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <img
      class="Header-wave"
      src="/img/assets/wave.svg"
      alt=""
      srcset=""
    />
  </div>
</template>

<script src="./header.js"></script>

<style lang="scss" src="./header.scss"></style>
