<template>
  <section class="hello">
    <article>
        <column-container v-for="(column, column_index) in columnArr"
                          :index="column_index"
                          :column="column">
        </column-container>
    </article>
  </section>
</template>

<script>
  import axios from 'axios';
  import ColumnContainer from './components/columnContainer';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        columnArr: [],
      };
    },
    mounted() {
      axios.get('/ajax/column/getList')
      .then((data) => {
        this.columnArr = data;
        console.log(data);
      })
    },
    components: {
      ColumnContainer,
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
