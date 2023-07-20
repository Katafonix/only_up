<template>
  <div class="personal">
    <modal-window ref="courseCreator" title="Создание курса">
      <template v-slot:default>
        <ValidationObserver ref="observer">
          <form @submit.prevent="upload" class="form" method="post">
            <ValidationProvider class="form__validator" v-slot="{ errors }">
              <input-file @handleFileChange="handleFileChange" />
              <span>{{ errors[0] }}</span>
              <div class="personal__preview">
                <img class="personal__img" :src="previewImage" alt="" />
              </div>
            </ValidationProvider>
            <ValidationProvider
              class="form__validator"
              rules="required"
              v-slot="{ errors }"
            >
              <form-input v-model.trim="dataSend.name" label="Название" />
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
            <ValidationProvider
              class="form__validator"
              rules="required"
              v-slot="{ errors }"
            >
              <form-input v-model.trim="dataSend.deadline" label="Описание" />
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <p v-if="error" class="form__error-message">{{ error }}</p>
          </form>
        </ValidationObserver>
      </template>
      <template v-slot:footer>
        <form-button label="Создать" @click="validateAndCreate" type="submit" />
      </template>
    </modal-window>
    <div class="personal__container">
      <div class="main">
        <div class="information">
          <div class="information__avatar">
            <img
              class="information__image"
              src="../assets/smesharik.png"
              alt=""
            />
            <a href="#" class="editor-image">
              <img class="personal__image" src="../assets/pencil.svg" alt="" />
            </a>
          </div>
          <div class="information__name">{{ user.name }}</div>
          <div class="information__registration-date">24/42/3</div>
          <div class="information__fields">
            <form-input
              :readonly="true"
              :disabled="true"
              placeholderInput="email"
              class="information__input"
              :inputClass="'information__input'"
              v-model="user.email"
            />
            <form-input
              :readonly="true"
              :disabled="true"
              placeholderInput="group"
              class="information__input"
            />
            <form-input
              :readonly="true"
              :disabled="true"
              placeholderInput="direction"
              class="information__input"
            />
          </div>
        </div>
        <div class="subscribed-courses">
          <div class="subscribed-course">
            <subscribed-course
              class="subscribed-courses__item"
              v-for="subscription in subscriptions"
              :key="subscription.id"
              :subscribedCourse="subscription"
            />
          </div>
        </div>
      </div>
      <form-button
        v-if="user.role !== `USER`"
        class="personal__button"
        @click="$refs.courseCreator.open()"
        label="Создать курс"
      />
    </div>
  </div>
</template>

<script>
import FormButton from "@/components/FormButton.vue";
import ModalWindow from "@/components/ModalWindow.vue";
import FormInput from "@/components/FormInput.vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import "@/validators/validation-rules";
import mixCourses from "@/mixins/mixCourses";
import { mapGetters, mapActions } from "vuex";
import SubscribedCourse from "@/components/SubscribedCourse.vue";
import InputFile from "@/components/InputFile.vue";

export default {
  components: {
    FormButton,
    ModalWindow,
    FormInput,
    InputFile,
    ValidationProvider,
    ValidationObserver,
    SubscribedCourse,
  },
  mixins: [mixCourses],
  data() {
    return {
      dataSend: {
        name: "",
        description: "",
        deadline: "",
      },
      subscriptions: [],
      FILE: null,
      previewImage: null,
    };
  },
  async mounted() {
    this.subscriptions = await this.getSubscriptions();
    console.log(this.subscriptions);
  },
  computed: {
    ...mapGetters("mAuth", ["getUser"]),
    user() {
      return this.getUser;
    },
  },
  methods: {
    ...mapActions("mReq", ["sendRequest"]),
    clearData() {
      this.name = "";
      this.description = "";
      this.FILE = null;
      this.$refs.courseCreator.close();
    },
    async validateAndCreate() {
      const success = await this.$refs.observer.validate();
      if (success && this.FILE) this.upload(this.dataSend, this.FILE);
    },
    async upload(dataSend, FILE, id = null) {
      try {
        if (id === null) {
          const courseData = await this.sendRequest({
            request: "POST",
            url: "subjects",
            data: dataSend,
          });
          const courseId = await courseData.json();
          id = courseId.id;
        } else await this.sendRequest("PATCH", `subjects/${id}`, dataSend);

        const response = await fetch(
          `${process.env.VUE_APP_BACKEND_URL}photo/upload/${id}`,
          {
            method: "POST",
            credentials: "include",
            headers: {},
            body: FILE,
          }
        );

        if (response.ok) {
          this.$refs.courseCreator.close();
          console.log(response);
        } else {
          throw new Error("Ошибка при загрузке файла.");
        }
      } catch (error) {
        console.error(error);
        this.error = error;
      }
    },

    async getSubscriptions() {
      try {
        const response = await this.sendRequest({
          request: "GET",
          url: `discipline-info/subscriptions`,
        });
        if (!response.ok)
          throw new Error("Не удалось получить информацию о курсе");
        return await response.json();
      } catch (error) {
        console.log(error);
      }
    },
    handleFileChange(data) {
      this.FILE = data;
    },
  },
};
</script>

<style scoped>
.personal {
  padding: 74px 0px;
}
.personal__container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main {
  display: flex;
}

.information {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 50px;
  padding: 40px 42px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 1px 1px 100px 0px rgba(0, 0, 0, 0.08);
}

.information__avatar {
  position: relative;
  width: 220px;
  height: 220px;
  margin: 0px 0px 21px 0px;
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

.information__name {
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0px 0px 10px 0px;
}

.information__registration-date {
  margin: 0 0 30px 0;
  padding: 10px 15px;
  align-items: center;
  border-radius: 100px;
  background: rgba(130, 219, 218, 0.2);
  color: #202430;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.information__fields {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.information__input {
  max-width: 300px;
}

.subscribed-courses {
  display: flex;
  padding: 40px 74px 68px 75px;
  justify-content: center;
  border-radius: 50px;
  background-color: #fff;
  box-shadow: 1px 1px 100px 0px rgba(0, 0, 0, 0.08);
  max-width: 581px;
  width: 100%;
  gap: 25px;
}

/* .subscribed-courses__item {
} */

.personal__button {
  align-self: center;
}

.personal__preview {
  max-width: 100px;
  max-height: 100px;
}
.personal__img {
  width: 100%;
}
@media (max-width: 767px) {
  .information {
    margin-right: 0;
  }
  .personal__container .main {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
