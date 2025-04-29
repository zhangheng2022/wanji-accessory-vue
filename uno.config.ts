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
      "brand": "var(--el-color-primary)",
      "brand3": "var(--el-color-primary-light-3)",
      "brand5": "var(--el-color-primary-light-5)",
      "brand7": "var(--el-color-primary-light-7)",
      "brand8": "var(--el-color-primary-light-8)",
      "brand9": "var(--el-color-primary-light-9)",
      "brand-dark2": "var(--el-color-primary-dark-2)",
      "success": "var(--el-color-success)",
      "success3": "var(--el-color-success-light-3)",
      "success5": "var(--el-color-success-light-5)",
      "success7": "var(--el-color-success-light-7)",
      "success8": "var(--el-color-success-light-8)",
      "success9": "var(--el-color-success-light-9)",
      "success-dark2": "var(--el-color-success-dark-2)",
      "warning": "var(--el-color-warning)",
      "warning3": "var(--el-color-warning-light-3)",
      "warning5": "var(--el-color-warning-light-5)",
      "warning7": "var(--el-color-warning-light-7)",
      "warning8": "var(--el-color-warning-light-8)",
      "warning9": "var(--el-color-warning-light-9)",
      "warning-dark2": "var(--el-color-warning-dark-2)",
      "danger": "var(--el-color-danger)",
      "danger3": "var(--el-color-danger-light-3)",
      "danger5": "var(--el-color-danger-light-5)",
      "danger7": "var(--el-color-danger-light-7)",
      "danger8": "var(--el-color-danger-light-8)",
      "danger9": "var(--el-color-danger-light-9)",
      "danger-dark2": "var(--el-color-danger-dark-2)",
      "info": "var(--el-color-info)",
      "info3": "var(--el-color-info-light-3)",
      "info5": "var(--el-color-info-light-5)",
      "info7": "var(--el-color-info-light-7)",
      "info8": "var(--el-color-info-light-8)",
      "info9": "var(--el-color-info-light-9)",
      "info-dark2": "var(--el-color-info-dark-2)"
    },
    boxShadow: {
      // 自定义阴影
      sm: "0px 0px 12px 0px rgba(0,0,0,0.05);",
      base: "var(--el-box-shadow)",
      light: "var(--el-box-shadow-light)",
      lighter: "var(--el-box-shadow-lighter)",
      dark: "var(--el-box-shadow-dark)"
    },
    textColor: {
      color1: "var(--el-text-color-primary)",
      color2: "var(--el-text-color-secondary)",
      color3: "var(--el-text-color-tertiary)",
      color4: "var(--el-text-color-placeholder)",
      color5: "var(--el-text-color-disabled)"
    }
  },
  // 自定义主题扩展
  // extendTheme: (theme: PresetUnoTheme) => {
  //   return {
  //     ...theme,
  //     textColor: {
  //       ...theme.textColor,
  //       color1: "var(--el-text-color-primary)",
  //       color2: "var(--el-text-color-secondary)",
  //       color3: "var(--el-text-color-tertiary)",
  //       color4: "var(--el-text-color-placeholder)",
  //       color5: "var(--el-text-color-disabled)"
  //     }
  //   }
  // },
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
