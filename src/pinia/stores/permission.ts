import type { MenuItem } from "@/router/config"
import type { RouteRecordRaw } from "vue-router"
import type { SvgName } from "~virtual/svg-component"
import { pinia } from "@/pinia"
import { constantRoutes, dynamicRoutes, Layouts } from "@/router"
import { routerConfig } from "@/router/config"
import { flatMultiLevelRoutes } from "@/router/helper"

const modules = import.meta.glob(["@/pages/*.vue", "@/pages/**/*.vue"])

function hasPermission(roles: string[], route: RouteRecordRaw) {
  const routeRoles = route.meta?.roles
  return routeRoles ? roles.some(role => routeRoles.includes(role)) : true
}

function filterDynamicRoutes(routes: RouteRecordRaw[], roles: string[]) {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const tempRoute = { ...route }
    if (hasPermission(roles, tempRoute)) {
      if (tempRoute.children) {
        tempRoute.children = filterDynamicRoutes(tempRoute.children, roles)
      }
      res.push(tempRoute)
    }
  })
  return res
}

function transformMenuToRoute(menuItem: MenuItem): RouteRecordRaw {
  const childrenRoute: RouteRecordRaw[] = []
  const vuePath = `/src${menuItem.component ?? ""}`
  const vuePage = menuItem.component === "ParentView" ? Layouts : modules[vuePath]

  // 如果有 children，则需要递归添加 children 到 route
  if (menuItem.children && menuItem.children.length > 0) {
    for (let i = 0; i < menuItem.children.length; i++) {
      childrenRoute.push(transformMenuToRoute(menuItem.children[i]))
    }
  }

  const routeItem: RouteRecordRaw = {
    path: menuItem.component === "ParentView" ? `/${menuItem.path}` : `${menuItem.path}`,
    name: menuItem.name,
    component: vuePage,
    meta: {
      svgIcon: menuItem.meta.icon && menuItem.meta.icon !== "#" ? menuItem.meta.icon as SvgName : undefined,
      keepAlive: !menuItem.meta.noCache,
      ...menuItem.meta
    },
    children: childrenRoute.length > 0 ? childrenRoute : undefined
  }

  if (menuItem.redirect) {
    routeItem.redirect = menuItem.redirect
  }

  return routeItem
}

export const usePermissionStore = defineStore("permission", () => {
  // 可访问的路由
  const routes = ref<RouteRecordRaw[]>([])

  // 有访问权限的动态路由
  const addRoutes = ref<RouteRecordRaw[]>([])

  // 根据角色生成可访问的 Routes（可访问的路由 = 常驻路由 + 有访问权限的动态路由）
  const setRoutes = (roles: string[], menus: MenuItem[]) => {
    const menuRoute: RouteRecordRaw[] = []
    for (let i = 0; i < menus.length; i++) {
      menuRoute.push(transformMenuToRoute(menus[i]))
    }
    const accessedRoutes = filterDynamicRoutes(menuRoute, roles)
    set(accessedRoutes)
  }

  // 所有路由 = 所有常驻路由 + 所有动态路由
  const setAllRoutes = () => {
    set(dynamicRoutes)
  }

  // 统一设置
  const set = (accessedRoutes: RouteRecordRaw[]) => {
    routes.value = constantRoutes.concat(accessedRoutes)
    addRoutes.value = routerConfig.thirdLevelRouteCache ? flatMultiLevelRoutes(accessedRoutes) : accessedRoutes
  }

  return { routes, addRoutes, setRoutes, setAllRoutes }
})

/**
 * @description 在 SPA 应用中可用于在 pinia 实例被激活前使用 store
 * @description 在 SSR 应用中可用于在 setup 外使用 store
 */
export function usePermissionStoreOutside() {
  return usePermissionStore(pinia)
}
