<template>
  <div>
    <a href="#content" class="accessibility">Skip to content</a>

    <app-header @focus-content="focusContent" />

    <div
      id="content"
      ref="content"
      :class="{ js: isBrowser, 'no-js': !isBrowser }"
      tabindex="-1">
      <nuxt />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.accessibility {
  position: absolute;
  top: -1000px;
  left: -1000px;
  height: 1px;
  width: 1px;
  overflow: hidden;
  z-index: 9999;

  &:active,
  &:focus,
  &:hover {
    left: 0;
    top: 0;
    width: auto;
    height: auto;
    overflow: visible;
    background: red;
    color: #fff;
    padding: 4px;
  }
}

#content {
  max-width: 1000px;
  margin: 0 auto;
  min-height: calc(100vh - 5em - 10px);
  overflow: hidden;
  padding: 5em 10px 10px;
}
#content:focus {
  outline: 0;
}
</style>


<script>
import header from '~/components/header';

export default {
  components: {
    'app-header': header
  },
  data() {
    return {
      isBrowser: false
    };
  },
  mounted() {
    if (process.browser) {
      this.isBrowser = true;
    }
  },
  methods: {
    focusContent() {
      this.$refs.content.focus();
    }
  }
};
</script>
