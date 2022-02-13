<template>
  <div class="gz-form">
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :style="itemStyle"
            >
              <el-input
                v-if="item.type === 'input' || item.type === 'password'"
                :model-value="modelValue[item.field]"
                v-bind="item.otherOptions"
                :placeholder="item.placeholder"
                :show-password="item.type === 'password'"
                @update:modelValue="handleValueChange($event, item.field)"
              />
              <el-select
                v-else-if="item.type === 'select'"
                :model-value="modelValue[item.field]"
                v-bind="item.otherOptions"
                :placeholder="item.placeholder"
                @update:modelValue="handleValueChange($event, item.field)"
              >
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :value="option.value"
                  :label="option.label"
                >
                  {{ option.label }}
                </el-option>
              </el-select>
              <el-date-picker
                v-else-if="item.type === 'datepicker'"
                :model-value="modelValue[item.field]"
                v-bind="item.otherOptions"
                @update:modelValue="handleValueChange($event, item.field)"
              />
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IFormItem } from '../types';

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => [],
    },
    labelWidth: {
      type: String,
      default: '100px',
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      }),
    },
    itemStyle: {
      type: Object,
      default: () => ({
        padding: '4px 12px',
      }),
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // const formData = ref({ ...props.modelValue });
    // console.log(formData.value.id);

    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', {
        ...props.modelValue,
        [field]: value,
      });
    };

    // watch(
    //   formData,
    //   (newValue: any) => {
    //     emit('update:modelValue', newValue);
    //   },
    //   {
    //     deep: true,
    //   },
    // );
    return {
      // formData,
      handleValueChange,
    };
  },
});
</script>

<style scoped lang="scss">
.gz-form {
  padding: 16px 16px 0 16px;
  ::v-deep .el-date-editor {
    width: 100%;
  }
}
</style>
