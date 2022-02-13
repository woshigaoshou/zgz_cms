<template>
  <div class="menu">
    <page-content :contentConfig="contentConfig" pageName="menu"></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import pageContent from '@/components/page-content';

import { contentConfig } from './config/content.config';

export default defineComponent({
  name: 'menu',
  components: {
    pageContent,
  },
  setup() {
    return {
      contentConfig,
    };
  },
});
</script>

<style scoped></style>
