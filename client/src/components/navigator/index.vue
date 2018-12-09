<template>
  <el-menu  :default-active="activeIndex"
            mode="horizontal">
    <el-menu-item v-for="(item, index) in navList"
                  :index="`${index}`"
                  :key="index">
      {{item.name}}
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    props: {
      activeIndex: {
        type: String,
        default: '0',
      }
    },
    data() {
      return {
        navList: [
          {
            name: '知乎',
            url: '#',
          },
          {
            name: '掘金',
            url: '#',
          },
          {
            name: 'Segmentfault',
            url: '#',
          },
        ]
      }
    }
  }
</script>
