<script lang="ts" setup>
// import { useAppStore } from "@/pinia/stores/app"
import { useSettingsStore } from "@/pinia/stores/settings"
import { useUserStore } from "@/pinia/stores/user"
import Notify from "@@/components/Notify/index.vue"
import Screenfull from "@@/components/Screenfull/index.vue"
import SearchMenu from "@@/components/SearchMenu/index.vue"
import ThemeSwitch from "@@/components/ThemeSwitch/index.vue"
// import { UserFilled } from "@element-plus/icons-vue"

// const { isMobile } = useDevice()
// const { isTop } = useLayoutMode()
// const router = useRouter()
// const appStore = useAppStore()
const userStore = useUserStore()
const settingsStore = useSettingsStore()
const { showNotify, showThemeSwitch, showScreenfull, showSearchMenu } = storeToRefs(settingsStore)

const LOGIN_PATH = import.meta.env.VITE_LOGIN_PATH

/** 切换侧边栏 */
// function toggleSidebar() {
//   appStore.toggleSidebar(false)
// }

/** 登出 */
function logout() {
  userStore.logout()
  location.replace(LOGIN_PATH)
  // router.push("/login")
}
</script>

<template>
  <div class="navigation-bar">
    <!-- <Hamburger
      v-if="!isTop || isMobile"
      :is-active="appStore.sidebar.opened"
      class="hamburger"
      @toggle-click="toggleSidebar"
    /> -->
    <!-- <Breadcrumb v-if="!isTop || isMobile" class="breadcrumb" /> -->
    <!-- <Sidebar v-if="isTop && !isMobile" class="sidebar" /> -->
    <SearchMenu v-if="showSearchMenu" />
    <div class="right-menu">
      <Screenfull v-if="showScreenfull" class="right-menu-item" />
      <ThemeSwitch v-if="showThemeSwitch" class="right-menu-item" />
      <Notify v-if="showNotify" class="right-menu-item" />
      <div class="bg-white py-1 px-2 rounded-full flex items-center right-menu-item">
        <SvgIcon name="service" class=" text-brand" style="width: 18px;height: 18px;" />
        <span class="text-base ml-1">在线帮助</span>
      </div>
      <el-dropdown>
        <div class="right-menu-item user bg-white py-1 px-2 rounded-full">
          <el-avatar :src="userStore.avatar" :size="24" />
          <span class="mx-1">{{ userStore.username }}</span>
          <el-icon><ArrowDownBold /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navigation-bar {
  height: var(--v3-navigationbar-height);
  overflow: hidden;
  color: var(--v3-navigationbar-text-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  .hamburger {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 15px;
    cursor: pointer;
  }
  .breadcrumb {
    flex: 1;
    // 参考 Bootstrap 的响应式设计将宽度设置为 576
    @media screen and (max-width: 576px) {
      display: none;
    }
  }
  .sidebar {
    flex: 1;
    // 设置 min-width 是为了让 Sidebar 里的 el-menu 宽度自适应
    min-width: 0px;
    :deep(.el-menu) {
      background-color: transparent;
    }
    :deep(.el-sub-menu) {
      &.is-active {
        .el-sub-menu__title {
          color: var(--el-color-primary);
        }
      }
    }
  }
  .right-menu {
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    &-item {
      margin: 0 10px;
      cursor: pointer;
      &:last-child {
        margin-left: 20px;
      }
    }
    .user {
      display: flex;
      align-items: center;
      .el-avatar {
        margin-right: 10px;
      }
      span {
        font-size: 16px;
      }
    }
  }
}
</style>
