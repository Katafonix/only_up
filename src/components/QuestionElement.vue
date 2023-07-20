<template>
  <div class="question">
    <h2 class="question__title">{{ question.title }}</h2>
    <ul class="question__list">
      <li class="question__item" v-for="answer in answers" :key="answer.id">
        <input
          class="question__select"
          type="radio"
          :disabled="isDisabled"
          v-model="selectedAnswer"
          :value="answer"
        />
        <div>{{ answer.text }}</div>
      </li>
      <div v-if="showAddAnswer">
        <input type="text" v-model.trim="newAnswer" placeholder="Новый ответ" />
        <input type="checkbox" v-model="newAnswerCorrect" />
        <label> Верный? </label>
        <button @click="addAnswer">Добавить</button>
      </div>
    </ul>
    <button :disabled="isDisabled" v-if="showSetAnswer" @click="submitAnswer">
      Ответить
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    question: Object,
    showAddAnswer: {
      type: Boolean,
      default: false,
    },
    showSetAnswer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedAnswer: null,
      id_victorina: null,
      newAnswer: "",
      newAnswerCorrect: false,
      answers: [],
      isDisabled: false,
    };
  },
  async mounted() {
    await this.showAnswers();
  },
  methods: {
    ...mapActions("mReq", ["sendRequest"]),
    submitAnswer() {
      console.log(this.selectedAnswer);
      this.$emit("answer", this.selectedAnswer);
      this.isDisabled = true;
    },
    async addAnswer() {
      await this.createAnswer();
      await this.showAnswers();
      this.newAnswer = "";
      this.newAnswerCorrect = false;
    },
    async getVictorina() {
      try {
        const response = await this.sendRequest({
          request: "GET",
          url: `victorina/from-question/${this.question.id}`,
        });

        const data = await response.json();
        this.id_victorina = data[0].id;
        console.log("cнизу айди викторины:");
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    async getOption() {
      try {
        console.log("Вызвалась getOption");
        const response = await this.sendRequest({
          request: "GET",
          url: `option/from-vica/${this.id_victorina}`,
        });
        const data = await response.json();
        console.log("cнизу data из getOption:");
        console.log(data);
        this.answers = data;
      } catch (error) {
        console.log(error);
      }
    },
    async createAnswer() {
      try {
        const response = await this.sendRequest({
          request: "POST",
          url: `option`,
          data: {
            text: this.newAnswer,
            isCorrect: this.newAnswerCorrect,
            mark: 1,
            id_victorina: this.id_victorina,
          },
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    async showAnswers() {
      await this.getVictorina();
      await this.getOption();
    },
  },
};
</script>

<style scoped>
.question__item {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
