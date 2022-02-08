import type { RouteRecordRaw } from 'vue-router';
import { IBreadCrumb } from '@/components/breadcrumbs';

let defaultRoute: any = null;

export function handleRoutes(usermenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];
  const allRoutes: RouteRecordRaw[] = [];

  const routeFiles = require.context('../router/main', true, /\.ts$/);
  routeFiles.keys().forEach(key => {
    const route = require(`@/router/main${key.replace('.', '')}`);
    allRoutes.push(route.default);
  });

  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1) {
        _recurseGetRoute(menu.children);
      } else {
        const route = allRoutes.find(route => route.path === menu.url);
        if (route) routes.push(route);
        if (!defaultRoute) defaultRoute = route;
      }
    }
  };
  _recurseGetRoute(usermenus);

  return routes;
}

export function path2Breadcrumbs(menus: any[], path: string) {
  const breadCrumbs: IBreadCrumb[] = [];
  route2menu(menus, path, breadCrumbs);
  return breadCrumbs;
}

export function route2menu(
  menus: any[],
  path: string,
  breadCrumbs?: IBreadCrumb[],
): any {
  for (const menu of menus) {
    if (menu.type === 1) {
      const findRoute = route2menu(menu.children ?? [], path);
      if (findRoute) {
        console.log(menu, findRoute, breadCrumbs);

        breadCrumbs?.push({ name: menu.name });
        breadCrumbs?.push({ name: findRoute.name });
        return findRoute;
      }
    } else if (menu.type === 2 && menu.url === path) {
      return menu;
    }
  }
}

export { defaultRoute };
