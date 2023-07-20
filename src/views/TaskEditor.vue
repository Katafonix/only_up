<template>
  <div class="task-editor">
    <modal-window ref="createQuestion" title="Создание курса">
      <template v-slot:default>
        <ValidationObserver ref="observer">
          <form @submit.prevent method="post">
            <ValidationProvider
              class="form__validator"
              rules="required"
              v-slot="{ errors }"
            >
              <form-input
                v-model.trim="dataSend.title"
                placeholderInput="Вопрос"
              />
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
          </form>
        </ValidationObserver>
      </template>
      <template v-slot:footer>
        <form-button label="Создать" @click="validate" type="submit" />
      </template>
    </modal-window>
    <div class="task-editor__container">
      <form-button
        class="task-editor__button"
        label="Создать вопрос"
        @click="$refs.createQuestion.open()"
      />
      <div class="task-editor__list">
        <question-element
          :showAddAnswer="true"
          class="task-editor__item"
          v-for="question in questions"
          :key="question.id"
          :question="question"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FormButton from "@/components/FormButton";
import { mapActions } from "vuex";
import FormInput from "@/components/FormInput";
import ModalWindow from "@/components/ModalWindow";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import "@/validators/validation-rules";
import QuestionElement from "@/components/QuestionElement.vue";
export default {
  components: {
    FormButton,
    FormInput,
    ModalWindow,
    ValidationObserver,
    ValidationProvider,
    QuestionElement,
  },
  async mounted() {
    this.questions = await this.getQuestions();
  },
  data() {
    return {
      dataSend: {
        id_task: this.$attrs.taskId,
        type: "VICTORINA",
        title: "",
      },
      questions: [],
    };
  },
  methods: {
    ...mapActions("mReq", ["sendRequest"]),
    async setQuestion() {
      try {
        console.log(this.dataSend);
        const response = await this.sendRequest({
          request: "POST",
          url: `question`,
          data: this.dataSend,
        });
        const data = await response.json();
        await this.connectVictorina(data.id);
        this.questions.push(data);
      } catch (error) {
        console.log(error);
      }
    },
    async connectVictorina(id) {
      console.log(id);
      try {
        const response = await this.sendRequest({
          request: "POST",
          url: `victorina`,
          data: { id_question: id },
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    async getQuestions() {
      try {
        const response = await this.sendRequest({
          request: "GET",
          url: `question/from-task/${this.$attrs.taskId}`,
        });
        if (!response.ok) throw new Error("Ошибка при получении курса");
        return await response.json();
      } catch (error) {
        console.log(error);
      }
    },
    async validate() {
      const success = await this.$refs.observer.validate();
      if (success) await this.setQuestion();
      this.questions = await this.getQuestions();
      this.$refs.createQuestion.close();
    },
  },
};
</script>

<style scoped></style>
