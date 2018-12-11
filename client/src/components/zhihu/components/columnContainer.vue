<template>
  <section class="m-column">
    <div class="u-row">
      <img :src="`${publicPath}${column.base64Img}`" class="u-column-logo"/>
      <div class="u-row-right">
        <h1 class="u-column-title">{{column.title}}</h1>
        <h2 class="u-column-name">专栏</h2>
      </div>
    </div>
    <ul>
      <li v-for="(item, index) in column.contentArr"
          :key="index"
          class="m-article"
          @click="toDetail(item)"
      >
        <h1 class="m-article__title">
          {{item.title}}
        </h1>
        <div class="m-article__row">
          <h2 class="m-article__subtitle">
            {{item.author && item.author.name}}
          </h2>
          <img :src="`${publicPath}${item.authorImg}`"
               class="m-article__author">
          <span class="m-article__create">{{item.updated|getUpdateTime}}</span>
        </div>

        <section class="u-content">
          <div v-if="item.contentImg" class="u-content__logo">
            <img :src="`${publicPath}${item.contentImg}`"
                 class="u-content__image"/>
          </div>
          <p v-if="item.excerpt" v-html="fixImage(item.excerpt)"></p>
          <span v-if="item.ifNew" class="u-fire"></span>
        </section>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    props: {
      column: Object,
    },
    computed: {
      publicPath() {
        return process.env.ROOT_API;
      },
    },
    filters: {
      getUpdateTime(updateTime) {
        if (!updateTime) {
          return '';
        }
        const date = new Date(updateTime * 1000);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`;
      }
    },
    methods: {
      fixImage(htmlStr) {
        if (htmlStr && htmlStr.indexOf('<img') !== -1) {
          return htmlStr.replace(/<img [^>]+>/g, '');
        }
        return htmlStr || '';
      },
      toDetail(article) {
        location.href = article.url;
      },
    },
  };
</script>

<style scoped>
  @import './columnContainer.css';
</style>
