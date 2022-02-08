<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
    <page-content :contentConfig="contentConfig" pageName="role" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { searchFormConfig } from './config/search.config';
import { contentConfig } from './config/content.config';
import pageSearch from '@/components/page-search';
import pageContent from '@/components/page-content';

export default defineComponent({
  name: 'user',
  components: {
    pageSearch,
    pageContent,
  },
  setup() {
    return {
      searchFormConfig,
      contentConfig,
    };
  },
});
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f0f2f5;
}
</style>
