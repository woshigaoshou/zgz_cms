<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @reset="handleReset"
      @search="handleSearch"
    />
    <page-content
      ref="pageContentRef"
      :contentConfig="contentConfig"
      pageName="user"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { searchFormConfig } from './config/search.config';
import { contentConfig } from './config/content.config';
import pageSearch from '@/components/page-search';
import pageContent from '@/components/page-content';
import { usePageSearch } from '@/utils/hooks/usePageSearch';

export default defineComponent({
  name: 'user',
  components: {
    pageSearch,
    pageContent,
  },
  setup() {
    const { pageContentRef, handleReset, handleSearch } = usePageSearch();
    return {
      searchFormConfig,
      contentConfig,
      pageContentRef,
      handleReset,
      handleSearch,
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
