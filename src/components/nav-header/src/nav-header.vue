<template>
  <div class="nav-header">
    <el-icon @click="handleFoldClick">
      <fold v-show="!isFold" />
      <expand v-show="isFold" />
    </el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup(props, { emit }) {
    const isFold = ref(false);
    const handleFoldClick = () => {
      isFold.value = !isFold.value;
      emit('foldChange', isFold.value);
    };
    return {
      isFold,
      handleFoldClick,
    };
  },
});
</script>

<style scoped lang="scss">
.nav-header {
  padding: 8px 0;
  .el-icon {
    font-size: 18px;
    cursor: pointer;
  }
}
</style>
