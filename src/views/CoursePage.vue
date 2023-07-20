<template>
  <div class="course">
    <modal-window ref="courseChanger" title="Изменение курса">
      <template v-slot:default>
        <ValidationObserver ref="observer">
          <form @submit.prevent method="post" class="course-form">
            <ValidationProvider
              class="form__validator"
              rules="required"
              v-slot="{ errors }"
            >
              <form-input
                v-model.trim="dataSend.name"
                placeholderInput="Название"
                label="Название"
              />
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              class="form__validator"
              rules="required"
              v-slot="{ errors }"
            >
              <form-input
                v-model.trim="dataSend.description"
                placeholderInput="Описание"
                label="Описание"
              />
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
          </form>
        </ValidationObserver>
      </template>
      <template v-slot:footer>
        <form-button
          :class="'courses__button'"
          label="Изменить"
          @click="validateChangeCourse"
          type="submit"
        />
      </template>
    </modal-window>
    <modal-window ref="ImageChanger" title="Изменение картинки">
      <template v-slot:default>
        <ValidationObserver ref="observer">
          <form @submit.prevent="upload" class="form" method="post">
            <ValidationProvider class="form__validator">
              <input-file @handleFileChange="handleFileChange" />
            </ValidationProvider>
          </form>
        </ValidationObserver>
      </template>
      <template v-slot:footer>
        <form-button label="Создать" @click="createCourse" type="submit" />
      </template>
    </modal-window>
    <modal-window
      ref="taskCreator"
      @clearData="clearData"
      title="Создание задания"
    >
      <template v-slot:default>
        <ValidationObserver ref="observer">
          <form @submit.prevent method="post">
            <ValidationProvider
              class="form__validator"
              rules="required"
              v-slot="{ errors }"
            >
              <form-input v-model.trim="dataSend.title" label="Название" />
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              class="form__validator"
              rules="required"
              v-slot="{ errors }"
            >
              <form-input
                v-model.trim="dataSend.description"
                label="Описание"
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
    <subscribers-list :subscribers="subscribers" ref="subList" />

    <div class="info">
      <div class="info__container">
        <div class="info__body">
          <div class="info__name">{{ course.name }}</div>
          <div class="info__description">{{ course.description }}</div>
          <div class="info__subscribers" v-if="getUser.role === `ADMIN`">
            Количество подписчиков: {{ subscribers.length }}
          </div>
        </div>
        <div class="info__logo">
          <img class="info__image" :src="imageUrl" alt="" />
          <a @click.prevent="$refs.ImageChanger.open()" href="#" class="editor">
            <img class="info__image-editor" src="../assets/pencil.svg" alt="" />
          </a>
        </div>
      </div>
    </div>

    <section class="course-elements">
      <div class="course-elements__container">
        <div class="row">
          <task-element
            class="course-element"
            :task="task"
            v-for="task in tasks"
            :key="task.id"
            @click="
              $router.push({
                name: 'task',
                params: { taskId: task.id },
              })
            "
            @clickEditor="
              $router.push({
                name: 'task-editor',
                params: { taskId: task.id },
              })
            "
          />
        </div>
      </div>
    </section>
    <div class="main">
      <form-button
        v-if="!isSubscriber"
        class="courses__button"
        @click="subscribe"
        label="Подписаться"
      />
      <!-- <form-button
        v-if="isSubscriber"
        class="courses__button"
        @click="subscribe"
        label="Начать обучение"
      /> -->
      <form-button
        v-if="getUser.role === `ADMIN`"
        class="courses__button"
        :class="courses__button"
        :course-id="course.id"
        @click="selectCourse(course)"
        label="Изменить"
      />
      <form-button
        v-if="getUser.role === `ADMIN`"
        class="courses__button"
        @click="$refs.taskCreator.open()"
        label="Создать задание"
      />
      <form-button
        v-if="getUser.role === `ADMIN`"
        class="courses__button"
        @click="$refs.subList.open()"
        label="Список подписчиков"
      />
    </div>
    <div class="teachers">
      <div class="container">
        <div class="row">
          <div class="subtitle">
            <h2>Преподователь</h2>
          </div>
          <div class="course__teacher">
            <div class="course__teacher__img">
              <img src="../assets/ava.jpg" alt="аватарка препода" />
            </div>
            <div class="course__teacher__name">Иван Иванович</div>
            <div class="course__teacher__descr">
              Преподаватель кафедры иностранного языка
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixCourses from "@/mixins/mixCourses";
import FormButton from "@/components/FormButton";
import ModalWindow from "@/components/ModalWindow";
import FormInput from "@/components/FormInput";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import "@/validators/validation-rules";
import { mapActions, mapGetters } from "vuex";
import SubscribersList from "@/components/SubscribersList";
import InputFile from "@/components/InputFile.vue";
import TaskElement from "@/components/TaskElement.vue";
export default {
  components: {
    FormButton,
    FormInput,
    ModalWindow,
    ValidationObserver,
    ValidationProvider,
    SubscribersList,
    InputFile,
    TaskElement,
  },
  mixins: [mixCourses],
  data() {
    return {
      dataSend: {
        name: "",
        title: "",
        description: "",
        id_subject: Number(this.$attrs.courseId),
      },
      course: null,
      subscribers: null,
      imageUrl: "",
      isSubscriber: false,
      tasks: null,
    };
  },
  async mounted() {
    this.imageUrl = this.getCourseImageUrl(this.$attrs.courseId);
    this.course = await this.getCourse();
    this.subscribers = await this.getCourseInfo();
    this.isSubscriber = await this.getSubscriber();
    this.tasks = await this.getTasks();
  },
  computed: {
    ...mapGetters("mAuth", ["getUser"]),
  },
  methods: {
    ...mapActions("mReq", ["sendRequest"]),

    selectCourse(course) {
      this.selectedCourse = course;
      this.dataSend.name = this.selectedCourse.name;
      this.dataSend.description = this.selectedCourse.description;
      this.$refs.courseChanger.open();
    },
    clearData() {
      this.selectedCourse = null;
      this.name = "";
      this.description = "";
      this.FILE = null;
      this.$refs.courseChanger.close();
    },
    getCourseImageUrl(id) {
      return `${process.env.VUE_APP_BACKEND_URL}photo/${id}`;
    },
    async getCourse() {
      try {
        const response = await this.sendRequest({
          request: "GET",
          url: `subjects/${this.$attrs.courseId}`,
        });
        if (!response.ok) throw new Error("Ошибка при получении курса");
        return await response.json();
      } catch (error) {
        console.log(error);
      }
    },

    async getTasks() {
      try {
        const response = await this.sendRequest({
          request: "GET",
          url: `task/from-sub/${this.$attrs.courseId}`,
        });
        if (!response.ok) throw new Error("Ошибка при получении задания");
        return await response.json();
      } catch (error) {
        console.log(error);
      }
    },
    async subscribe() {
      try {
        const response = await this.sendRequest({
          request: "GET",
          url: `discipline-info/subscribe/subject/${this.$attrs.courseId}`,
        });
        if (response.ok) this.isSubscriber = await this.getSubscriber();
      } catch (error) {
        console.log(error);
      }
    },
    async getCourseInfo() {
      try {
        const response = await this.sendRequest({
          request: "GET",
          url: `discipline-info/subscribers/${this.$attrs.courseId}`,
        });
        if (!response.ok)
          throw new Error("Не удалось получить информацию о курсе");
        return await response.json();
      } catch (error) {
        console.log(error);
      }
    },
    async getSubscriber() {
      try {
        const response = await this.sendRequest({
          request: "GET",
          url: `discipline-info/find-subscriber/${this.$attrs.courseId}`,
        });
        if (!response.ok) throw new Error("Вы не подпищек");
        return await response.json();
      } catch (error) {
        console.log(error);
      }
    },
    async createCourse() {
      const success = await this.$refs.observer.validate();
      if (success && this.FILE) this.upload(this.dataSend, this.FILE);
    },
    async upload(dataSend, FILE) {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_BACKEND_URL}photo/upload/${this.$attrs.courseId}`,
          {
            method: "POST",
            credentials: "include",
            headers: {},
            body: FILE,
          }
        );

        if (response.ok) {
          this.imageUrl = this.getCourseImageUrl(this.$attrs.courseId);
          console.log(response);
        } else {
          throw new Error("Ошибка при загрузке файла.");
        }
      } catch (error) {
        console.error(error);
        this.error = error;
      }
    },
    async changeCourse(dataSend) {
      try {
        const response = await this.sendRequest({
          request: "PATCH",
          url: `subjects/${this.$attrs.courseId}`,
          data: dataSend,
        });

        if (response.ok) {
          this.getCourse();
          console.log(response);
        } else {
          throw new Error("Ошибка при загрузке файла.");
        }
      } catch (error) {
        console.error(error);
        this.error = error;
      }
    },
    async validate() {
      const success = await this.$refs.observer.validate();
      if (success) this.createTask();
    },
    async createTask() {
      try {
        const response = await this.sendRequest({
          request: "POST",
          url: `task`,
          data: {
            title: this.dataSend.title,
            description: this.dataSend.description,
            id_subject: Number(this.dataSend.id_subject),
          },
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    async validateChangeCourse() {
      const success = await this.$refs.observer.validate();
      if (success) this.changeCourse(this.dataSend);
    },
    handleFileChange(data) {
      this.FILE = data;
    },
  },
};
</script>

<style scoped>
.course {
  background: #fff;
}

.info {
  background-color: #82dbda;
  border-radius: 0px 0px 100px 100px;
  padding: 47px 0px;
  margin-bottom: 10px;
}

.info__container {
  display: flex;
  justify-content: space-between;
}
.info__body {
}
.info__name {
  color: #202430;
  font-size: 30px;
  font-weight: 700;
  line-height: 40px;
  margin: 0px 0px 20px 0px;
}
.info__description {
  color: #202430;
  max-width: 610px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.info__logo {
  position: relative;
  max-width: 164px;
  height: 162px;
  flex-shrink: 0;
}
.info__image {
  width: 100%;
}

.editor {
  position: absolute;
  right: -30px;
  top: -20px;
  border-radius: 50%;
}
.info__image-editor {
}

.information__image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.editor-image {
  position: absolute;
  right: 0;
  top: 5px;
  border-radius: 50%;
  /* background-color: black; */
}

.course-elements {
  padding: 30px 0 60px 0;
}
.course-element {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  min-height: 15px;
  padding: 18px 25px;
  align-items: center;
  justify-content: space-between;
  border-radius: 50px;
  background-color: #edf6fa;
  padding: 23px 25px;
  margin-bottom: 15px;
}
.course-element__title {
  width: 50%;
  color: var(--black-blue, #202430);
  font-family: Gadugi;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.course-element__arrow {
  width: 50%;
}
.course-element__arrow img {
  float: right;
}
.course__start-button {
  margin-top: 30px;
  display: inline-flex;
  padding: 13px 60px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  width: 274px;
  background: var(--cta, #4640de);
  color: var(--white, #fff);
  font-family: Gadugi;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
}
.course__teachers {
  padding: 60px 0 90px 0;
  background: var(--light-blue, #edf6fa);
}
.course__teacher {
  margin: 0 auto;
}
.course__teacher__img img {
  border-radius: 100px;
  display: block;
  margin: 0 auto;
  margin-bottom: 10px;
}
.course__teacher__name {
  text-align: center;
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  margin-bottom: 15px;
}
.course__teacher__descr {
  color: var(--black-blue-50, rgba(32, 36, 48, 0.5));
  text-align: center;
  font-family: Gadugi;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.subtitle {
  padding-left: 20px;
}
.subtitle h2 {
  font-weight: 400px;
  text-decoration: bold;
  font-weight: bold;
  font-size: 20px;
}
.courses__button {
  display: block;
}
.course-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
}
.main {
  display: flex;
  width: 50%;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
}
.teachers {
  padding: 90px 0;
  background: var(--light-blue, #edf6fa);
}

@media (max-width: 1200px) {
  .main {
    width: 80%;
  }
}

@media (max-width: 991px) {
  .main {
    width: 80%;
  }
  button[data-v-7d061c46] {
    padding: 13px 10px;
  }
  .info__body[data-v-4b28ae04] {
    width: 25%;
  }
}

@media (max-width: 768px) {
  .main {
    width: 90%;
  }
  .info {
    border-radius: 0;
  }
}
@media (max-width: 575px) {
  .subtitle h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  .main {
    flex-direction: column;
    gap: 10px;
  }

  .courses__button[data-v-4b28ae04] {
    margin: 0 auto;
    padding: 0px 10px;
  }
}
</style>
