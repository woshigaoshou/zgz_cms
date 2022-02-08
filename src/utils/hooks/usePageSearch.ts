import { ref } from 'vue';
import pageContent from '@/components/page-content';

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof pageContent>>();
  const handleReset = () => {
    console.log('reset');
    pageContentRef.value.getPageInfo();
  };
  const handleSearch = (queryInfo: any) => {
    console.log('search');
    pageContentRef.value.getPageInfo(queryInfo);
  };
  return {
    pageContentRef,
    handleReset,
    handleSearch,
  };
}
