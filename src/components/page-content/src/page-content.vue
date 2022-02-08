<template>
  <div class="content">
    <gz-table
      v-bind="contentConfig"
      v-model:page="pageInfo"
      :listData="dataList"
      :total="total"
    >
      <template #headerHandler>
        <el-button size="medium" type="primary">新建用户</el-button>
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
      <template #handler>
        <div>
          <el-button size="mini" type="text">编辑</el-button>
          <el-button size="mini" type="text">删除</el-button>
        </div>
      </template>
    </gz-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import GzTable from '@/components/table';
import { useStore } from '@/store';
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
  setup(props) {
    const store = useStore();

    const pageInfo = ref({ pageSize: 10, currentPage: 1 });

    watch(pageInfo, () => getPageInfo());

    const getPageInfo = (queryInfo: any = {}) => {
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
      // userList,
      // userCount,
    };
  },
});
</script>

<style scoped></style>
