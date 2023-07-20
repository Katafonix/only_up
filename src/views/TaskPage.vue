<template>
  <div class="test">
    <modal-window ref="mark" title="Оценка">
      <template v-slot:default>
        Твоя оценка: {{ studentMark }}/{{ totalMark }}
      </template>
      <template v-slot:footer>
        <form-button
          label="Заебись"
          @click="$router.push({ name: `task` })"
          type="submit"
        />
      </template>
    </modal-window>
    <div class="test__container">
      <div class="row">
        <div class="test__title"><h1>Тест 1</h1></div>
        <div class="test__questions">
          <question-element
            :showSetAnswer="true"
            class="question"
            v-for="question in questions"
            :key="question.id"
            :question="question"
            @answer="setAnswer"
          />
        </div>
        <div class="test__buttons">
          <div @click="finish" class="to-finish">Завершить</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionElement from "@/components/QuestionElement.vue";
import { mapActions } from "vuex";
import ModalWindow from "@/components/ModalWindow.vue";
import FormButton from "@/components/FormButton.vue";

export default {
  components: { QuestionElement, ModalWindow, FormButton },
  data() {
    return {
      questions: [],
      answer: null,
      studentMark: null,
      totalMark: null,
    };
  },
  async mounted() {
    this.questions = await this.getQuestions();
  },
  methods: {
    ...mapActions("mReq", ["sendRequest"]),
    async getQuestions() {
      try {
        const response = await this.sendRequest({
          request: "GET",
          url: `question/from-task/${this.$attrs.taskId}`,
        });
        return await response.json();
      } catch (error) {
        console.log(error);
      }
    },
    async setAnswer(answer) {
      console.log(answer.answer);
      try {
        const response = await this.sendRequest({
          request: "PATCH",
          url: `option/check/${answer.id}`,
          data: { userAnswer: true },
        });
        return await response.json();
      } catch (error) {
        console.log(error);
      }
    },
    async getStudentMark() {
      try {
        const response = await this.sendRequest({
          request: "GET",
          url: `task/student-mark/${this.$attrs.taskId}`,
        });
        return await response.json();
      } catch (error) {
        console.log(error);
      }
    },
    async getTotalMark() {
      try {
        const response = await this.sendRequest({
          request: "GET",
          url: `task/total-mark/${this.$attrs.taskId}`,
        });
        return await response.json();
      } catch (error) {
        console.log(error);
      }
    },

    async finish() {
      this.studentMark = await this.getStudentMark();
      this.totalMark = await this.getTotalMark();
      this.$refs.mark.open();
    },
  },
};
</script>

<style scoped>
.test {
  padding: 40px 0;
}

.test__container {
}
.row {
}
.test__title {
}
.test__questions {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.question {
}
.test__buttons {
}
.to-back {
}
.to-finish {
}

.question__title {
  color: var(--black-blue, #202430);
  text-align: justify;
  font-family: Gadugi;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 20px;
}
.question input {
  margin-left: 40px;
  margin-bottom: 16px;
  padding-left: 20px;
  color: var(--black-blue, #202430);
  text-align: justify;
  font-family: Gadugi;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.test__title {
  color: var(--black-blue, #202430);
  font-family: Gadugi;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
input[type="radio"]:checked + label,
input[type="checkbox"]:checked + label {
  background-color: purple;
  color: white;
}
.question .textAnswer {
  width: 100%;
  margin-left: 0;
  display: flex;
  width: 1200px;
  height: 65px;
  padding: 0px 1087px 0px 25px;
  align-items: center;
  flex-shrink: 0;
  border-radius: 100px;
  border: 1px solid var(--black-blue-20, rgba(32, 36, 48, 0.2));
  background: var(--white, #fff);
}
.test__buttons {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
}
.to-back {
  display: inline-flex;
  padding: 13px 40px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  border: 1px solid var(--cta, #4640de);
  cursor: pointer;
}
.to-finish {
  display: inline-flex;
  padding: 13px 40px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: var(--cta, #4640de);
  color: #fff;
  cursor: pointer;
}
</style>
