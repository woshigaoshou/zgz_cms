<template>
  <div>
    <el-container>
      <el-aside :width="collapse ? '65px' : '210px'">
        <nav-menu :collapse="collapse" />
      </el-aside>
      <el-container>
        <el-header>
          <nav-header @foldChange="handleFoldChange" />
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import NavHeader from '@/components/nav-header';
import NavMenu from '@/components/nav-menu';

export default defineComponent({
  components: {
    NavHeader,
    NavMenu,
  },
  setup() {
    const collapse = ref(false);
    const handleFoldChange = (isFold: boolean) => {
      collapse.value = isFold;
    };
    return {
      handleFoldChange,
      collapse,
    };
  },
});
</script>

<style scoped lang="scss">
.common-layout {
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 60px;
  }

  .el-footer {
    line-height: 60px;
  }

  .el-aside {
    background-color: #d3dce6;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #e9eef3;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
}
</style>
