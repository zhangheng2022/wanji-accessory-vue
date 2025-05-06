import { request } from "@/http/axios"

/** 获取当前登录用户详情 */
export function getCurrentUserApi() {
  return request<any>({
    url: "/system/user/getInfo",
    method: "get"
  })
}

export function getMenuDataApi() {
  return request<any>({
    url: "/system/menu/acc/getRouters",
    method: "get"
  })
}
