<script setup lang="ts">
import { usePermissionStore } from "@/pinia/stores/permission"
import { isExternal } from "@@/utils/validate"
import path from "path-browserify"
import Link from "./Link.vue"

const permissionStore = usePermissionStore()
const route = useRoute()

// /** 解析路径 */
function resolvePath(basePath: string, routePath: string) {
  switch (true) {
    case isExternal(routePath):
      return routePath
    case isExternal(basePath):
      return basePath
    default:
      return path.resolve(basePath, routePath)
  }
}

const noHiddenRoutes = computed(() => permissionStore.routes.filter(item => !item.meta?.hidden))

const activeMenu = computed(() => route.meta.activeMenu || route.path)
</script>

<template>
  <div class="w-full h-full px-4 pb-4 select-none">
    <div class="bg-white .dark:bg-black p-4 rounded-md shadow-sm min-h-full">
      <template v-for="item in noHiddenRoutes" :key="item.path">
        <template v-if="item.children?.length === 1 && item.path === '/'">
          <Link :to="resolvePath(item.path, item.children[0].path)">
            <div class="flex items-center" :class="{ 'text-brand!': activeMenu === resolvePath(item.path, item.children[0].path) }">
              <SvgIcon v-if="item.children[0].meta?.svgIcon" :name="item.children[0].meta.svgIcon" class="svg-icon" />
              <component v-else-if="item.children[0].meta?.elIcon" :is="item.children[0].meta.elIcon" class="el-icon" />
              <template v-if="item.children[0].meta?.title">
                <span class="text-size-base font-bold ml-2">{{ item.children[0].meta.title }}</span>
              </template>
            </div>
          </Link>
        </template>
        <template v-else>
          <div class="flex items-center py-6">
            <SvgIcon v-if="item.meta?.svgIcon" :name="item.meta.svgIcon" class="svg-icon" />
            <component v-else-if="item.meta?.elIcon" :is="item.meta.elIcon" class="el-icon" />
            <span v-if="item.meta?.title" class="text-size-base font-bold ml-2">{{ item.meta.title }}</span>
          </div>
          <div class="grid grid-cols-2 gap-y-6">
            <template v-for="subitem in item.children" :key="subitem.path">
              <Link :to="resolvePath(item.path, subitem.path)">
                <div class="flex items-center">
                  <SvgIcon v-if="subitem.meta?.svgIcon" :name="subitem.meta.svgIcon" class="svg-icon" />
                  <component v-else-if="subitem.meta?.elIcon" :is="subitem.meta.elIcon" class="el-icon" />
                  <template v-if="subitem.meta?.title">
                    <span class="text-size-sm flex items-center text-secondary" :class="{ 'text-brand!': activeMenu === resolvePath(item.path, subitem.path) }">{{ subitem.meta.title }}</span>
                  </template>
                </div>
              </Link>
            </template>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>
