<template>
  <section>
    <div class="u-row">
      <img :src="column.image_url"
           class="u-row-left"/>
      <div class="u-row-right">
        <h1>{{column.title}}</h1>
        <h2>{{column.author.name}}</h2>
      </div>
    </div>
    <ul>
      <li v-for="(item, index) in column.contentArr"
          :key="index"
      >
        {{index}} 测试
      </li>
    </ul>
  </section>
</template>
<script>
  export default {
    props: {
      column: Object,
    }
  }
</script>
<style>
</style>
