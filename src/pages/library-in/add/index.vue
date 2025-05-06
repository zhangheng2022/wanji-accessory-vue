<script lang="ts" setup>
import { ref } from "vue"

defineOptions({
  name: "AddLibraryIn"
})

const input = ref("")
</script>

<template>
  <div>
    <el-input v-model="input" style="width: 240px" placeholder="Please input" />
  </div>
</template>
