<template>
  <div class="login-phone">
    <el-form :rules="rules" :model="account" :label-width="72">
      <el-form-item label="手机号" prop="name">
        <el-input v-model="account.phone" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <div class="account-code">
          <el-input v-model="account.code" />
          <el-button type="primary">发送验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { rules } from '../config/rule-config';

export default defineComponent({
  setup() {
    const account = reactive({
      phone: '',
      code: '',
    });

    return {
      account,
      rules,
    };
  },
});
</script>

<style scoped lang="scss">
.login-phone {
  .account-code {
    display: flex;
    .el-button {
      margin-left: 10px;
    }
  }
}
</style>
