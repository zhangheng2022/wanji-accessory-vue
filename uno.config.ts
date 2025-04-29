import type { PresetUnoTheme } from "unocss"
import { defineConfig, presetAttributify, presetWind3 } from "unocss"

export default defineConfig({
  // 预设
  presets: [
    // 属性化模式 & 无值的属性模式
    presetAttributify({
      prefix: "un-",
      prefixedOnly: false
    }),
    // 默认预设
    presetWind3({
      important: "#app"
    })
  ],
  // 自定义主题
  theme: {
    colors: {
      brand: "var(--el-color-primary)"
    },
    boxShadow: {
      // 自定义阴影
      sm: "0px 0px 12px 0px rgba(0,0,0,0.05);",
      base: "var(--el-box-shadow)",
      light: "var(--el-box-shadow-light)",
      lighter: "var(--el-box-shadow-lighter)",
      dark: "var(--el-box-shadow-dark)"
    }
  },
  // 自定义主题扩展
  extendTheme: (theme: PresetUnoTheme) => {
    return {
      ...theme,
      textColor: {
        ...theme.textColor,
        primary: "var(--el-text-color-primary)",
        secondary: "var(--el-text-color-secondary)",
        tertiary: "var(--el-text-color-tertiary)",
        placeholder: "var(--el-text-color-placeholder)",
        disabled: "var(--el-text-color-disabled)"
      }
    }
  },
  // 自定义规则
  rules: [],
  // 自定义快捷方式
  shortcuts: {
    "wh-full": "w-full h-full",
    "flex-center": "flex justify-center items-center",
    "flex-x-center": "flex justify-center",
    "flex-y-center": "flex items-center"
  }
})
