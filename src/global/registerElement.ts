import { App } from 'vue';
import 'element-plus/dist/index.css';
import {
  ElButton,
  ElInput,
  ElForm,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElLink,
  ElIcon,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElDropdown,
  ElAvatar,
  ElRow,
  ElCol,
  ElFormItem,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElImage,
  ElDialog,
} from 'element-plus';
import * as ElIconModules from '@element-plus/icons';

const components = [
  ElButton,
  ElInput,
  ElForm,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElLink,
  ElIcon,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElDropdown,
  ElAvatar,
  ElRow,
  ElCol,
  ElFormItem,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElImage,
  ElDialog,
];

export default function (app: App): void {
  for (const component of components) {
    // console.log(component);
    app.component(component.name, component);
  }
  for (const iconName in ElIconModules) {
    // console.log(iconName);
    app.component(
      iconName,
      ElIconModules[iconName as keyof typeof ElIconModules],
    );
  }
}
