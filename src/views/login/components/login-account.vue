<template>
  <div>
    <el-form ref="formRef" :rules="rules" :model="account" :label-width="72">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" type="password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, reactive, ref } from 'vue';
import { ElForm } from 'element-plus';
import { rules } from '../config/rule-config';
import storage from '@/utils/storage';

export default defineComponent({
  setup() {
    const store = useStore();
    const account = reactive({
      name: storage.getCache('name') ?? '',
      password: storage.getCache('password') ?? '',
    });
    const formRef = ref<InstanceType<typeof ElForm>>();
    const login = (isKeepPassword: boolean) => {
      console.log('登录');
      formRef.value?.validate(valid => {
        if (valid) {
          console.log('登录成功');
          if (isKeepPassword) {
            storage.setCache('name', account.name);
            storage.setCache('password', account.password);
          } else {
            storage.deleteCache('name');
            storage.deleteCache('password');
          }
          store.dispatch('login/loginAction', { ...account });
        }
      });
    };

    return {
      account,
      rules,
      formRef,
      login,
    };
  },
});
</script>

<style scoped></style>
