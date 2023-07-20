<template>
  <div class="course-wrapper">
    <div class="course-header">
      <div class="course-title">
        <h3 class="course__name">{{ course.name }}</h3>
        <div class="course__volume">
          <div href="#" class="course__test display-block">
            <span>Количество тестов: {{ countTasks }}</span>
          </div>
        </div>
      </div>
      <div class="course__icon">
        <img
          :src="imageUrl"
          alt="Здесь должна быть картинка"
          class="course__image"
        />
      </div>
    </div>
    <div class="course__description">{{ course.description }}</div>
    <form-button
      class="course-wrapper__button"
      classButton="btn__blue-white"
      @click="click"
      label="Подробнее"
    />

    <slot></slot>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import FormButton from "@/components/FormButton.vue";
export default {
  components: {
    FormButton,
  },
  props: {
    course: Object,
    imageUrl: String,
  },
  async mounted() {
    this.countTasks = await this.getCountTasks();
  },
  data() {
    return {
      countTasks: null,
    };
  },
  methods: {
    ...mapActions("mReq", ["sendRequest"]),
    click() {
      this.$emit("click");
    },
    async getCountTasks() {
      try {
        const response = await this.sendRequest({
          request: "GET",
          url: `task/subject-task/${this.course.id}`,
        });
        if (!response.ok) throw new Error("Ошибка при получении задания");
        return await response.json();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
.course-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 40px 45px;
  height: 293px;
  background-color: #fff;
  box-shadow: 1px 1px 200px 9px rgba(0, 0, 0, 0.06);
  border-radius: 40px;
}
.course-header {
  display: flex;
  justify-content: space-between;
}
.course-title {
}
.course__name {
  font-size: 20px;
  font-weight: 700;
  line-height: 27px;
  text-align: left;
  margin: 0px 0px 15px 0px;
}
.course__volume {
  display: flex;
  align-content: flex-start;
  width: 100%;
  margin: 0px 0px 25px 0px;
}

.display-block {
  margin-right: 10px;
  padding: 10px 15px;
  border-radius: 100px;
  font-size: 14px;
  line-height: 19px;
  background: rgba(130, 219, 218, 0.2);
}
.course__lection {
}
.course__test {
}
.course__icon {
  width: 65px;
  height: 64px;
}

.course__image {
  width: 100%;
}

.course__description {
  margin: 0px 0px 20px 0px;
}
.course-wrapper__button {
  align-self: center;
}
</style>
