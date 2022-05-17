<template>
<Header
  :countCorrect="countCorrect"
  :totalQuestions="questions.length"
  :countQuestions="questions.length ? index + 1 : index"
/>
<Menu :fetchApi="fetchApi"/>
<div v-if="selectedOption && !questions.length">
  <p>Loading...</p>
</div>
<div v-else>
  <QuestionBox
    v-if="questions.length"
    :selectedOption="selectedOption"
    :currentQuestion="questions[index]"
    :increment="increment"
    :next="next"
  />
</div>
</template>

<script>

//fetch data
import axios from "axios";
import Header from "./components/HeaderBox.vue";
import Menu from "./components/MenuBox.vue"
import QuestionBox from "./components/QuestionBox.vue"
export default {
    name: "App",
    components: {
    Header,
    Menu,
    QuestionBox
},
    data() {
        return {
            questions: [],
            index: 0,
            countCorrect: 0,
            selectedOption: "",
            api: "https://opentdb.com/api.php?amount=10&type=multiple"
        };
    },
    methods: {
      next() {
        this.index++
      },

      increment(isCorrect) {
        if (isCorrect) {
          this.countCorrect++;
        }
      },

      fetchApi(api, name) {
        this.selectedOption = name;
        console.log("1:", this.selectedOption)
        if (api) {
          this.api = api;
          this.loadData();
        }
      },

      async loadData() {
        try {
            const res = await axios.get(this.api);
            console.log("2:", res.data.results)
            this.questions = res.data.results;
            console.log("3:", this.questions);
        }
        catch (error) {
            console.log(error);
        }
      }
    }
}

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

body {
  background-color: white;
}
</style>
