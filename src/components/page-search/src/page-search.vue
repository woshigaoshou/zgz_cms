<template>
  <div>
    <GzForm v-model="formData" v-bind="searchFormConfig">
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleReset">重置</el-button>
          <el-button @click="handleSearch" type="primary">搜索</el-button>
        </div>
      </template>
    </GzForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import GzForm, { IForm } from '@/components/form';

export default defineComponent({
  components: {
    GzForm,
  },
  props: {
    searchFormConfig: {
      type: Object as PropType<IForm>,
      required: true,
    },
  },
  emits: ['reset', 'search'],
  setup(props, { emit }) {
    const formItems = props.searchFormConfig?.formItems ?? [];
    const originData: any = {};
    for (const item of formItems) {
      originData[item.field] = '';
    }
    const formData = ref(originData);
    const handleReset = () => {
      formData.value = originData;
      emit('reset');
    };
    const handleSearch = () => {
      emit('search', formData.value);
    };
    return {
      formData,
      handleReset,
      handleSearch,
    };
  },
});
</script>

<style scoped lang="scss">
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
