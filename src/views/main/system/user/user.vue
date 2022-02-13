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
      pageName="users"
      @create="handleCreate"
      @edit="handleEdit"
    />
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="users"
      :modalConfig="modalConfigRef"
      @updatePageData="handleReset"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { searchFormConfig } from './config/search.config';
import { contentConfig } from './config/content.config';
import { modalConfig } from './config/modal.config';
import pageSearch from '@/components/page-search';
import pageContent from '@/components/page-content';
import { usePageSearch } from '@/utils/hooks/usePageSearch';
import { usePageModal } from '@/utils/hooks/usePageModal';
import { useState } from '@/utils/hooks/useStore';

export default defineComponent({
  name: 'user',
  components: {
    pageSearch,
    pageContent,
  },
  setup() {
    const { pageContentRef, handleReset, handleSearch } = usePageSearch();

    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        item => item.field === 'password',
      );
      passwordItem!.isHidden = false;
    };
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        item => item.field === 'password',
      );
      passwordItem!.isHidden = true;
    };

    const modalConfigRef = computed(() => {
      const { entireDepartment, entireRole } = useState([
        'entireDepartment',
        'entireRole',
      ]);
      const department = modalConfig.formItems.find(
        item => item.field === 'departmentId',
      );
      department!.options = entireDepartment.value;
      const role = modalConfig.formItems.find(item => item.field === 'roleId');
      role!.options = entireRole.value;
      return modalConfig;
    });

    const { pageModalRef, defaultInfo, handleCreate, handleEdit } =
      usePageModal(newCallback, editCallback);
    return {
      searchFormConfig,
      contentConfig,
      modalConfigRef,
      pageContentRef,
      handleReset,
      handleSearch,
      pageModalRef,
      defaultInfo,
      handleCreate,
      handleEdit,
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
