<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="item in breadcrumbs"
      :key="item.path"
      :to="{ path: item.path }"
      >{{ item.name }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IBreadCrumb } from '../types';

export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadCrumb[]>,
      default: () => [],
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
