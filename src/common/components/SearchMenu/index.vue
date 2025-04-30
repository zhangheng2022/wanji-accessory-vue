<script lang="ts" setup>
import Modal from "./Modal.vue"

/** 控制 modal 显隐 */
const visible = ref<boolean>(false)

/** 打开 modal */
function handleOpen() {
  visible.value = true
}
</script>

<template>
  <div>
    <!-- <el-tooltip effect="dark" content="搜索菜单" placement="bottom">
      <SvgIcon name="search" @click="handleOpen" class="svg-icon" />
    </el-tooltip> -->
    <div un-w-md un-bg-white un-rounded-md un-cursor-pointer un-p-2 un-flex un-items-center un-border="1px color3 solid" @click="handleOpen">
      <el-icon size="16" class="text-color4">
        <Search />
      </el-icon>
      <span class="text-color4 text-size-sm ml-1">搜索导航菜单</span>
    </div>
    <Modal v-model="visible" />
  </div>
</template>

<style lang="scss" scoped>
.svg-icon {
  font-size: 20px;
  &:focus {
    outline: none;
  }
}
</style>
