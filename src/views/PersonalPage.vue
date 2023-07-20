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
              <form-input
                v-model.trim="dataSend.name"
                placeholderInput="Название"
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
              />
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              class="form__validator"
              rules="required"
              v-slot="{ errors }"
            >
              <form-input
                v-model.trim="dataSend.deadline"
                placeholderInput="Дедлайн"
              />
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <p v-if="error" class="form__error-message">{{ error }}</p>
          </form>
        </ValidationObserver>
      </template>
      <template v-slot:footer>
        <form-button
          label="Создать"
          @click="validateCreateCourse"
          type="submit"
        />
      </template>
    </modal-window>
    <modal-window ref="imageChanger" title="Изменение картинки">
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
        <form-button label="Готово" @click="setAvatar" type="submit" />
      </template>
    </modal-window>
    <div class="personal__container">
      <div class="main">
        <div class="information">
          <div class="information__avatar">
            <img class="information__image" :src="imageUrl" alt="" />
            <a
              @click.prevent="$refs.imageChanger.open()"
              href="#"
              class="editor-image"
            >
              <img class="personal__image" src="../assets/pencil.svg" alt="" />
            </a>
          </div>
          <div class="information__name">{{ user.name }}</div>
          <div class="information__registration-date">{{ date }}</div>
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
      date: null,
      subscriptions: [],
      FILE: null,
      imageUrl: null,
    };
  },
  async mounted() {
    this.subscriptions = await this.getSubscriptions();
    console.log(this.subscriptions);
    this.imageUrl = await this.getAvatar();
    this.date = await this.getDate();
  },
  computed: {
    ...mapGetters("mAuth", ["getUser"]),
    user() {
      return this.getUser;
    },
    formatedData() {
      return this.date.to;
    },
  },
  methods: {
    ...mapActions("mReq", ["sendRequest"]),
    clearData() {
      this.name = "";
      this.description = "";
      this.FILE = null;
    },
    async validateCreateCourse() {
      const success = await this.$refs.observer.validate();
      if (success && this.FILE) this.createCourseAndCloseModal();
    },
    async validateChangeAvatar() {
      const success = await this.$refs.observer.validate();
      if (success && this.FILE) this.uploadImage(this.FILE);
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
        await this.uploadImage(FILE, id);
      } catch (error) {
        console.error(error);
        this.error = error;
      }
    },
    async uploadImage(FILE, id = null) {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_BACKEND_URL}photo/upload/${id}`,
          {
            method: "POST",
            credentials: "include",
            body: FILE,
          }
        );

        if (response.ok) {
          console.log(response);
        } else {
          throw new Error("Ошибка при загрузке файла.");
        }
      } catch (error) {
        console.error(error);
        this.error = error;
      }
    },
    async setAvatar() {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_BACKEND_URL}users/avatar`,
          {
            method: "POST",
            credentials: "include",
            body: this.FILE,
          }
        );

        if (response.ok) {
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
    async getAvatar() {
      try {
        const response = await this.sendRequest({
          request: "GET",
          url: `users/get/avatar`,
        });
        if (response.ok) {
          return await response.text();
        }
      } catch (error) {
        console.log(error);
      }
    },
    handleFileChange(data) {
      this.FILE = data;
    },
    async createCourseAndCloseModal() {
      try {
        await this.upload(this.dataSend, this.FILE);
        this.$refs.courseCreator.close();
      } catch (error) {
        console.error(error);
        this.error = "Ошибка при создании курса.";
      }
    },
    async getDate() {
      try {
        const response = await this.sendRequest({
          request: "GET",
          url: `users/get-date/formated`,
        });
        if (response.ok) {
          return await response.json();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.personal {
  padding: 60px 0px;
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
  border-radius: 100px;
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
  border-radius: 100px;
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
</style>
