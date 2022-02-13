<template>
  <div class="page-modal">
    <el-dialog
      title="新建用户"
      v-model="dialogVisible"
      width="30%"
      center
      destroy-on-close
    >
      <gz-form v-bind="modalConfig" v-model="formData"></gz-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import GzForm from '@/components/form';
import { useStore } from '@/store';

export default defineComponent({
  components: {
    GzForm,
  },
  props: {
    modalConfig: {
      type: Object,
      required: true,
    },
    defaultInfo: {
      type: Object,
      default: () => ({}),
    },
    pageName: {
      type: String,
      require: true,
    },
    otherInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['updatePageData'],
  setup(props, { emit }) {
    const dialogVisible = ref(false);
    const formData = ref<any>({});

    watch(
      () => props.defaultInfo,
      (newValue: any) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`];
        }
      },
    );

    const store = useStore();
    const handleConfirmClick = async () => {
      dialogVisible.value = false;
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        console.log('编辑用户');
        await store.dispatch('system/editPageData', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id,
        });
      } else {
        // 新建
        console.log('新建用户');
        await store.dispatch('system/createPageData', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo },
        });
      }
      emit('updatePageData');
    };

    return {
      dialogVisible,
      formData,
      handleConfirmClick,
    };
  },
});
</script>

<style scoped></style>
