<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar
        size="small"
        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      />
      <span>{{ userInfo.name }}</span>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item style="display: flex; align-items: center">
          退出登录
          <circle-close
            style="
              width: 16px;
              height: 16px;
              line-height: 36px;
              margin-left: 8px;
            "
          />
        </el-dropdown-item>
        <el-dropdown-item>用户信息</el-dropdown-item>
        <el-dropdown-item divided>系统管理</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useState } from '@/utils/hooks/useStore';

export default defineComponent({
  setup() {
    const { userInfo } = useState('login', ['userInfo']);

    return {
      name,
      userInfo,
    };
  },
});
</script>

<style scoped lang="scss">
.el-dropdown-link {
  display: flex;
  align-items: center;
  .el-avatar {
    margin-right: 8px;
  }
}
</style>
