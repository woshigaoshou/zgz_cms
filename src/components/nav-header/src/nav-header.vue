<template>
  <div class="nav-header">
    <el-icon @click="handleFoldClick">
      <fold v-show="!isFold" />
      <expand v-show="isFold" />
    </el-icon>
    <div class="contain">
      <gz-bread-crumbs :breadcrumbs="breadcrumbs" />
    </div>
    <user-info />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import userInfo from './user-info.vue';
import GzBreadCrumbs from '@/components/breadcrumbs';
import { path2Breadcrumbs } from '@/utils/handleRoutes';
import { useState } from '@/utils/hooks/useStore';

export default defineComponent({
  components: {
    userInfo,
    GzBreadCrumbs,
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false);
    const handleFoldClick = () => {
      isFold.value = !isFold.value;
      emit('foldChange', isFold.value);
    };
    const { userMenus } = useState('login', ['userMenus']);
    const breadcrumbs = computed(() => {
      const route = useRoute();
      return path2Breadcrumbs(userMenus.value, route.path);
    });
    return {
      isFold,
      breadcrumbs,
      handleFoldClick,
    };
  },
});
</script>

<style scoped lang="scss">
.nav-header {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 0;
  .el-icon {
    font-size: 18px;
    cursor: pointer;
  }
  .contain {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    padding: 0 20px;
    line-height: 18px;
  }
}
</style>
