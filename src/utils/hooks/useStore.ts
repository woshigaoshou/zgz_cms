import { useStore, mapState, mapGetters, createNamespacedHelpers } from 'vuex';
import { computed } from 'vue';

interface IExtension {
  [key: string]: any;
}

export function useMapper(mapper: string[], mapFn: any) {
  const store = useStore();
  const mapFns = mapFn(mapper);
  const res: IExtension = {};
  console.log(mapFns);

  Object.keys(mapFns).forEach(key => {
    const fn = mapFns[key].bind({ $store: store });
    res[key] = computed(fn);
  });
  return res;
}

export function useState(moduleName: any | string[], mapper?: any) {
  let mapperFn = mapState;
  if (typeof moduleName === 'string' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName)['mapState'];
  } else {
    mapper = moduleName;
  }
  return useMapper(mapper, mapperFn);
}

export function useGetter(moduleName: any | string[], mapper?: any) {
  let mapperFn = mapGetters;
  if (typeof moduleName === 'string' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName)['mapGetters'];
  } else {
    mapper = moduleName;
  }
  return useMapper(mapper, mapperFn);
}
