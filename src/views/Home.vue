<template>
  <div>Home</div>
  <div>{{ name }}</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    // const { mapState } = createNamespacedHelpers('user');
    const store = useStore();
    const name = computed(() => store.state);
    return {
      name,
    };
  },
});
</script>

<style lang="scss" scoped></style>
