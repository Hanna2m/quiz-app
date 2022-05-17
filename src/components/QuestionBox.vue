<template>
    <div className="questions-box">
        <div className="questions">
            <div id="questions">
                <h5>{{ decoder(currentQuestion.question) }}</h5>
            </div>
            <div className="question-option">
                <ul>
                    <li v-for="(answer, index) in shuffledAnswers"
                    :key="index"
                    @click="selectAnswer(index)"
                    :class="answerClass(index)"
                    >
                    {{ decoder(answer) }}
                    </li>
                </ul>
                <div className="buttons">
                    <button className="submit"
                        @click="submitAnswer"
                        :disabled="selectedIndex === null || answered"
                        v-if="countModalQuestion < 10">
                        Submit
                    </button>
                    <button className="next"
                        @click="next"
                        :disabled="answered === false"
                        v-if="countModalQuestion < 10">
                        Next
                    </button>
                </div>
            </div>
        </div>
        <Modal :open="isOpen" :correctNumber="countCorrect">
            <h3>You have {{ countCorrect }} correct answers</h3>
            <p v-if="countCorrect <= 2">
                It seems that {{ selectedOption }} is not you field of expertise. Try another one
            </p>
            <p v-if="countCorrect <= 5 & countCorrect > 2">
                Not bad. Perhaps you rely too much on google
            </p>
             <p v-if="countCorrect > 5">
                WOW! You are my hero!
            </p>
        </Modal>
    </div>
    
    
</template>

<script>
import _ from "lodash";
import Modal from './ResultModal.vue';

export default {
  props: {
      selectedOption: String,
      currentQuestion: Object,
      increment: Function,
      next: Function,
      resetQuestion: Function
  },
  
  components: {
      Modal
  },

  data() {
      return {
          selectedIndex: null,
          correctIndex: null,
          shuffledAnswers: [],
          answered: false,
          countCorrect: 0,
          countModalQuestion: 0,
          isOpen: false
      }
  },

  watch: {
    currentQuestion: {
        immediate: true,
            handler() {
            this.selectedIndex = null;
            this.answered = false;
            this.shuffleAnswers();
        }
    }
  },

  methods: {
    shuffleAnswers() {
        let answers = [
           ...this.currentQuestion.incorrect_answers,
            this.currentQuestion.correct_answer 
        ];
        this.shuffledAnswers = _.shuffle(answers);
        this.correctIndex = this.shuffledAnswers.indexOf(this.currentQuestion.correct_answer);
    },

    selectAnswer(index) {
        this.selectedIndex = index;
    },

    submitAnswer() {
        let isCorrect = false;

        if(this.selectedIndex === this.correctIndex) {
            isCorrect = true;
            this.countCorrect++;
        }

        this.answered = true;
        this.countModalQuestion++;
        this.increment(isCorrect);

        if (this.countModalQuestion === 10) {
            this.isOpen = true;
        }
    },

    answerClass(index) {
        let answerClass = '';

        if(!this.answered && this.selectedIndex === index) {
            answerClass = "selected";
        } else if (this.answered && this.correctIndex === index) {
            answerClass = "correct"
        } else if (
            this.answered &&
            this.selectedIndex === index &&
            this.correctIndex !== index) {
            answerClass = "incorrect"
            }
        return answerClass
        },

    decoder(str) {
        let textArea = document.createElement("textarea");
        textArea.innerHTML = str;
        return textArea.value;
    },

    closeModal() {
        this.isShow = false;
    }

    }
  }
</script>

<style scoped>
li {
    padding: 12px;
    border-bottom: 1px solid rgb(166, 166, 166);
    list-style-type:none;
    font-size: 18px
}

h3 {
    margin-bottom: 1rem;
}

h5{
line-height: 1.6rem;
font-stretch: 100%;
 }
.questions-box {
    width:60%;
    display:flex;
    flex-direction: column;
    margin: 24px auto 24px auto;
}

.questions {
    display: flex;
    flex-direction: column;
    padding: 16px;
    
}

#caption, #questions {
    text-align: center;
    font-weight: bold;
}
.selected {
   background-color: lightblue; 
}

.question-option {
    margin-top: 24px;
}

.correct {
   background-color: lightgreen; 
}

.incorrect {
   background-color: red; 
}
.buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
button{
    padding: 8px 16px 8px 16px;
    font-size: 16px;
    border: none;
    margin: 10px;
    border-radius: 8px
}
button.submit:enabled{
    background-color: blueviolet;
    color: white
}

button.next:enabled{
    background-color: rgb(82, 210, 3);
    color: white
}
.modal {
  width: 300px;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 20px;
  text-align: center;
}
@media screen and (max-width: 790px) {
    .questions-box {
    width:90%;
    display:flex;
    flex-direction: column;
    margin: 24px auto 24px auto;
}
}

</style>