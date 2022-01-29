<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3+TS</span>
    </div>
    <el-menu
      class="el-menu-vertical"
      default-active="2"
      background-color="#0c2135"
      text-color="#b7bdc3"
      :collapse="collapse"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id.toString()">
            <template #title>
              <el-icon v-if="item.icon">
                <component :is="transformIcon(item.icon)"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="subItem in item.children"
              :key="subItem.id"
              :index="subItem.id.toString()"
            >
              <el-icon v-if="subItem.icon">
                <component :is="transformIcon(subItem.icon)"></component>
              </el-icon>
              <span>{{ subItem.name }}</span>
            </el-menu-item>
          </el-sub-menu>
        </template>
        <template v-else-if="item.type === 2">
          <el-icon v-if="item.icon">
            <component :is="transformIcon(item.icon)"></component>
          </el-icon>
          <el-menu-item :index="item.id.toString()">{{
            item.name
          }}</el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useState } from '@/utils/hooks/useStore';

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { userMenus } = useState('login', ['userMenus']);
    const transformIcon = (icon: string) => {
      const reg = /^el-icon-/;
      const result = icon.replace(reg, '');
      return result;
    };
    return {
      userMenus,
      transformIcon,
    };
  },
});
</script>

<style scoped lang="scss">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
