<template>
  <div class="goods">
    <page-content :contentConfig="contentConfig" pageName="goods">
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        >
        </el-image>
      </template>
      <template #oldPrice="scope">{{ '¥' + scope.row.oldPrice }}</template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import pageContent from '@/components/page-content';
import { contentConfig } from './config/content.config';

export default defineComponent({
  name: 'goods',
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
