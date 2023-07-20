<template>
  <div class="courses">
    <div class="main">
      <div class="main__container">
        <div class="main__content">
          <h2 class="main__title">Lorem ipsum dolor sit amet</h2>
          <p class="main__text">
            Lorem ipsum dolor sit ametLorem ipsum dolor sit amet
          </p>
          <div class="main__search">
            <form-input
              class="main__input"
              v-model.trim="description"
              placeholderInput="поиск"
            />
            <form-button
              class="main__button"
              classButton="btn__blue-white"
              @click="$router.push({ name: 'personal' })"
              label="Поиск"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="courses-block">
      <div class="courses-block__container">
        <!-- <div class="courses-filter">
          <div class="courses-filter__type">
            <h3>Тип</h3>
            <ul>
              <li>
                <input
                  type="radio"
                  value="man"
                  checked
                  name="gender"
                />Комбинированный
              </li>
              <li>
                <input type="radio" value="man" checked name="gender" />Лекции
              </li>
              <li>
                <input type="radio" value="man" checked name="gender" />Тесты
              </li>
            </ul>
          </div>
          <div class="courses-filter__subject">
            <h3>Тематика</h3>
            <ul>
              <li><input type="checkbox" checked name="html5" />Математика</li>
              <li>
                <input type="checkbox" checked name="html5" />Программирование
              </li>
              <li><input type="checkbox" checked name="html5" />История</li>
              <li>
                <input type="checkbox" checked name="html5" />Мобильная
                разработка
              </li>
              <li>
                <input type="checkbox" checked name="html5" />Английский язык
              </li>
              <li>
                <input type="checkbox" checked name="html5" />Тестирование
              </li>
            </ul>
          </div>
        </div> -->
        <div class="available-courses">
          <h2 class="available-courses__title">
            Доступные курсы({{ courses.length }})
          </h2>
          <div class="available-courses__list">
            <course-element
              class="available-courses__item"
              v-for="course in courses"
              :key="course.id"
              :course="course"
              :imageUrl="getCourseImageUrl(course.id)"
              @click="
                $router.push({
                  name: 'course',
                  params: { courseId: course.id },
                })
              "
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseElement from "@/components/CourseElement";
import FormInput from "@/components/FormInput";
import FormButton from "@/components/FormButton";
import mixCourses from "@/mixins/mixCourses";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    CourseElement,
    FormButton,
    FormInput,
  },
  mixins: [mixCourses],
  data() {
    return {};
  },
  async mounted() {
    this.courses = await this.getCourses();
    console.log(this.courses);
  },
  computed: {
    ...mapGetters("mAuth", ["getUser"]),
  },
  methods: {
    ...mapActions("mReq", ["sendRequest"]),
    async logOut() {
      try {
        const response = await this.sendRequest({
          request: "POST",
          url: "auth/log-out",
        });
        if (!response.ok) throw new Error("Ошибка при выходе");
        this.$router.push("/authorization");
      } catch (error) {
        console.log(error);
      }
    },
    async getCourses() {
      try {
        const response = await this.sendRequest({
          request: "GET",
          url: "subjects",
        });
        return await response.json();
      } catch (error) {
        console.log(error);
      }
    },
    async subscriptions() {
      try {
        const response = await this.sendRequest({
          request: "GET",
          url: `discipline-info/subscriptions/${
            this.$store.dispatch("mAuth/getUser").id
          }`,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    getCourseImageUrl(id) {
      return `${process.env.VUE_APP_BACKEND_URL}photo/${id}`;
    },
  },
};
</script>

<style scoped>
.courses {
  background: #fff;
}

.main {
  padding: 138px 0px 119px 0px;
  background: #edf6fa;
}
.main__container {
  width: 80%;
}
.main__content {
}
.main__title {
  font-size: 64px;
  line-height: 85px;
  color: #202430;
}
.main__text {
  font-size: 20px;
  line-height: 27px;
  color: #20243080;
  margin: 0px 0px 50px 0px;
}
.main__search {
  display: flex;
  align-items: center;
  gap: 21px;
}
.main__input {
  padding: 20px 20px;
}
.main__button {
}
.courses-block {
  padding: 70px 0px 76px 0px;
}
.courses-block__container {
}
.courses-filter {
}

.courses-filter__type {
}
.courses-filter__subject {
}
.available-courses {
}
.available-courses__title {
  margin: 0px 0px 40px 0px;
  text-align: center;
}
.available-courses__list {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}
.available-courses__item {
  flex: 0 1 370px;
}
.error-message {
}
</style>
