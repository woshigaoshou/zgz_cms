<template>
  <div class="content">
    <gz-table
      v-bind="contentConfig"
      v-model:page="pageInfo"
      :listData="dataList"
      :total="total"
    >
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          size="medium"
          type="primary"
          @click="handleCreate"
        >
          新建用户
        </el-button>
      </template>
      <template #status="scope">
        <el-button
          size="mini"
          :type="scope.row.enable === 1 ? 'success' : 'danger'"
          >{{ scope.row.enable === 1 ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template v-for="item in exactPropSlots" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
      <template #handler="scope">
        <div>
          <el-button
            v-if="isUpdate"
            size="mini"
            type="text"
            @click="handleEdit(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            v-if="isDelete"
            size="mini"
            type="text"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </div>
      </template>
    </gz-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import GzTable from '@/components/table';
import { useStore } from '@/store';
import { usePermission } from '@/utils/hooks/usePermission';
// import { useState } from '@/utils/hooks/useStore';

export default defineComponent({
  components: {
    GzTable,
  },
  props: {
    contentConfig: {
      type: Object,
      required: true,
    },
    pageName: {
      type: String,
      required: true,
    },
  },
  emits: ['create', 'edit'],
  setup(props, { emit }) {
    const store = useStore();

    // 0.获取操作的权限
    const isCreate = usePermission(props.pageName, 'create');
    const isUpdate = usePermission(props.pageName, 'update');
    const isDelete = usePermission(props.pageName, 'delete');
    const isQuery = usePermission(props.pageName, 'query');

    const pageInfo = ref({ pageSize: 10, currentPage: 1 });

    watch(pageInfo, () => getPageInfo());

    const getPageInfo = (queryInfo: any = {}) => {
      if (!isQuery) return;
      store.dispatch('system/getPageInfo', {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage - 1,
          size: pageInfo.value.pageSize,
          ...queryInfo,
        },
      });
    };
    const dataList = computed(() =>
      store.getters['system/pageListData'](props.pageName),
    );

    const total = computed(() =>
      store.getters['system/pageListCount'](props.pageName),
    );

    const fixSlots = ['status', 'createAt', 'updateAt', 'handler'];
    const exactPropSlots = props.contentConfig.propList.filter((item: any) =>
      fixSlots.every(fixSlot => fixSlot !== item.slotName),
    );

    const handleDelete = async (item: any) => {
      console.log(item);
      await store.dispatch('system/deletePageData', {
        pageName: props.pageName,
        id: item.id,
      });
      console.log(1);
      pageInfo.value.currentPage = 1;
      getPageInfo();
      console.log(3);
    };
    const handleCreate = () => {
      emit('create');
    };
    const handleEdit = (item: any) => {
      emit('edit', item);
    };

    getPageInfo();
    // const { userList, userCount } = useState('system', [
    //   'userList',
    //   'userCount',
    // ]);

    return {
      dataList,
      getPageInfo,
      total,
      pageInfo,
      exactPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      isQuery,
      handleDelete,
      handleCreate,
      handleEdit,
      // userList,
      // userCount,
    };
  },
});
</script>

<style scoped></style>
