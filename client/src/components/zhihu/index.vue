<template>
  <section class="hello" v-if="columnArr">
    <article>
        <column-container v-for="(column, column_index) in columnArr"
                          :key="column_index"
                          :index="column_index"
                          :column="column">
        </column-container>
        <div class="u-loading" ref="loading">
          <img src="https://haitao.nos.netease.com/c11d3b07-378e-42c9-b3da-05c9256030e1_240_240.gif">
        </div>
    </article>
  </section>
</template>

<script>
  import axios from 'axios';
  import ColumnContainer from './components/columnContainer';
  const pageSize = 10;

  export default {
    data() {
      return {
        columnArr: [],
        loadNext: false,
        currPage: 1,
      }
    },
    watch: {
        loadNext(val) {
            if(!val) return;
            this.currPage = this.currPage + 1;
            this.ajaxData(this.currPage);
        }
    },
    mounted() {
      this.loadNext = this.lazyLoadBind();
      this.bindScroll();
    },
    methods: {
      ajaxData(currPage) {
        axios.get('/ajax/column/getList', {
          params: {
              pageSize,
              startIndex: currPage - 1,
          }
        })
        .then((data) => {
          this.columnArr.push(...data);
          this.loadNext = false;
        });
      },
      lazyLoadBind() {
        const loading = this.$refs.loading;
        const top = loading.getBoundingClientRect().top
        if (!loading) {
          return false;
        }
        return top < window.innerHeight && top > 0;
      },
      bindScroll() {
        window.addEventListener('scroll', () => {
          if (!this.loadNext) {
            this.loadNext = this.lazyLoadBind();
          }
        })
      }
    },
    components: {
      ColumnContainer,
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  body {
    background: #f6f6f6;
  }
</style>
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .u-loading {
    width: 100%;height: 30px;
    text-align: center;
  }

  .u-loading img {
    width: 40px; height: 40px;
  }
</style>
