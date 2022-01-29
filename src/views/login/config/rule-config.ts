export const rules = {
  name: [
    {
      required: true,
      message: '账号为必填属性',
      trigger: 'blur',
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '账号需要输入5~10位',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '密码为必填属性',
      trigger: 'blur',
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '密码需要输入3位以上',
      trigger: 'blur',
    },
  ],
  phone: [
    {
      required: true,
      message: '手机号为必填属性',
      trigger: 'blur',
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '手机号需要输入5~10位',
      trigger: 'blur',
    },
  ],
  code: [
    {
      required: true,
      message: '验证码为必填属性',
      trigger: 'blur',
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '验证码需要输入3位以上',
      trigger: 'blur',
    },
  ],
};
