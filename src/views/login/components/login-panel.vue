<template>
  <div class="login-panel">
    <h1>后台管理系统</h1>
    <el-tabs type="border-card" stretch>
      <el-tab-pane label="账号登录">
        <template #label>
          <span>
            <el-icon><Avatar /></el-icon>账号
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane label="手机号登录">
        <template #label>
          <span>
            <el-icon><iphone /></el-icon>手机号
          </span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="handle-btn">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link>忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" @click="handleBtnClick">
      立即登录
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LoginAccount from './login-account.vue';
import LoginPhone from './login-phone.vue';

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone,
  },
  setup() {
    const isKeepPassword = ref(true);
    const accountRef = ref<InstanceType<typeof LoginAccount>>();
    const phoneRef = ref<InstanceType<typeof LoginPhone>>();

    console.log(typeof LoginAccount);

    const handleBtnClick = () => {
      console.log('click');
      console.log(accountRef);
      console.log(accountRef.value);
      accountRef.value?.login(isKeepPassword.value);
    };
    return {
      isKeepPassword,
      handleBtnClick,
      accountRef,
      phoneRef,
    };
  },
});
</script>

<style scoped lang="scss">
.login-panel {
  width: 340px;
  text-align: center;
  .handle-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .login-btn {
    width: 100%;
  }
  ::v-deep .el-tabs__item {
    i {
      vertical-align: -15%;
    }
  }
}
</style>
