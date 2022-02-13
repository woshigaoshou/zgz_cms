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
      pageName="role"
      @create="handleCreate"
      @edit="handleEdit"
    />
    <page-modal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      :modalConfig="modalConfig"
      pageName="role"
      @updatePageData="handleReset"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        ></el-tree>
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue';
import { searchFormConfig } from './config/search.config';
import { contentConfig } from './config/content.config';
import { modalConfig } from './config/modal.config';

import { ElTree } from 'element-plus';
import pageSearch from '@/components/page-search';
import pageContent from '@/components/page-content';
import pageModal from '@/components/page-modal';

import { menuMapLeafKeys } from '@/utils/handleMenu';
import { usePageSearch } from '@/utils/hooks/usePageSearch';
import { usePageModal } from '@/utils/hooks/usePageModal';
import { useState } from '@/utils/hooks/useStore';

export default defineComponent({
  name: 'user',
  components: {
    pageSearch,
    pageContent,
    pageModal,
  },
  setup() {
    const { pageContentRef, handleReset, handleSearch } = usePageSearch();
    const elTreeRef = ref<InstanceType<typeof ElTree>>();
    const editCallBack = (item: any) => {
      console.log(item.menuList);
      const leafKeys: any[] = menuMapLeafKeys(item.menuList);
      console.log(leafKeys);
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false);
      });
    };
    const { pageModalRef, defaultInfo, handleCreate, handleEdit } =
      usePageModal(undefined, editCallBack);

    const otherInfo = ref({});
    const { entireMenu: menus } = useState(['entireMenu']);
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys;
      const halfCheckedKeys = data2.halfCheckedKeys;
      const menuList = [...checkedKeys, ...halfCheckedKeys];
      otherInfo.value = { menuList };
    };

    return {
      searchFormConfig,
      contentConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleCreate,
      handleEdit,
      elTreeRef,
      otherInfo,
      menus,
      handleCheckChange,
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
