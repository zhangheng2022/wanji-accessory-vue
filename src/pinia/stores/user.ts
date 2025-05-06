import type { MenuItem } from "@/router/config"
import { pinia } from "@/pinia"
import { resetRouter } from "@/router"
import { routerConfig } from "@/router/config"
import { getCurrentUserApi, getMenuDataApi } from "@@/apis/users"
import { setToken as _setToken, getToken, removeToken } from "@@/utils/cache/cookies"
import { useSettingsStore } from "./settings"
import { useTagsViewStore } from "./tags-view"

/**
 * 从菜单生成权限资源
 *
 * @param menus 授予用户的菜单列表
 * @returns Map<string, string[]> 权限资源
 */
// function buildMenuPermission(menus: MenuItem[]) {
//   const ret = new Map<string, string[]>()

//   menus.forEach((item) => {
//     if (item.type === "menu" && item.children && item.children.length > 0) {
//       const tmp = buildMenuPermission(item.children)
//       if (tmp.size > 0) {
//         tmp.forEach((value, key) => {
//           if (ret.has(key)) {
//             ret.set(key, [...new Set([...(ret.get(key) as string[]), ...value])])
//           } else {
//             ret.set(key, value)
//           }
//         })
//       }
//     } else if (item.type === "page" && item.children && item.children.length > 0) {
//       const res: string[] = []

//       item.children?.forEach((child) => {
//         if (child.name !== "") {
//           res.push(child.name)
//         }
//       })

//       if (res.length > 0) {
//         ret.set(item.name, res)
//       }
//     }
//   })

//   return ret
// }

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "")
  const roles = ref<string[]>([])
  const username = ref<string>("")
  const avatar = ref<string>("")
  const dynamicMenus = ref<MenuItem[]>([])
  // const permission = reactive<Map<string, string[]>>(new Map())

  const tagsViewStore = useTagsViewStore()
  const settingsStore = useSettingsStore()

  // 设置 Token
  const setToken = (value: string) => {
    _setToken(value)
    token.value = value
  }

  // 获取用户详情
  const getInfo = async () => {
    const data = await getCurrentUserApi()
    console.log("获取到的用户信息", data)

    username.value = data.user.userName
    avatar.value = data.user.avatar
    // 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
    roles.value = data.roles?.length > 0 ? data.roles : routerConfig.defaultRoles
  }

  /** 获取菜单 */
  const getMenus = async () => {
    try {
      const { data } = await getMenuDataApi()
      if (data && data.length > 0) {
        dynamicMenus.value = data
        // const permissionMap = buildMenuPermission(data)
        // permissionMap.forEach((value, key) => {
        //   permission.set(key, value)
        // })
      }
    } catch (error) {
      console.error(error)
      dynamicMenus.value = []
    }
  }

  // 模拟角色变化
  const changeRoles = (role: string) => {
    const newToken = `token-${role}`
    token.value = newToken
    _setToken(newToken)
    // 用刷新页面代替重新登录
    console.log("模拟角色变化，刷新页面！")
    // location.reload()
  }

  // 登出
  const logout = () => {
    removeToken()
    token.value = ""
    roles.value = []
    resetRouter()
    resetTagsView()
  }

  // 重置 Token
  const resetToken = () => {
    removeToken()
    token.value = ""
    roles.value = []
  }

  // 重置 Visited Views 和 Cached Views
  const resetTagsView = () => {
    if (!settingsStore.cacheTagsView) {
      tagsViewStore.delAllVisitedViews()
      tagsViewStore.delAllCachedViews()
    }
  }

  return { token, roles, username, setToken, getInfo, changeRoles, logout, resetToken, getMenus, dynamicMenus, avatar }
})

/**
 * @description 在 SPA 应用中可用于在 pinia 实例被激活前使用 store
 * @description 在 SSR 应用中可用于在 setup 外使用 store
 */
export function useUserStoreOutside() {
  return useUserStore(pinia)
}
