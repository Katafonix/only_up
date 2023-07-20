<template>
  <div class="task" @click="click">
    <div class="task__title">
      {{ task.title }}
      {{ task.description }}
    </div>
    <div @click.stop="clickEditor" class="course-element__editor">
      <img src="../assets/pencil.svg" alt="картинка кнопки" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  components: {},
  props: {
    task: Object,
  },
  methods: {
    ...mapActions("mAuth", ["getUser"]),
    click() {
      this.$emit("click");
    },
    clickEditor() {
      this.$emit("clickEditor");
    },
  },
};
</script>
<style scoped>
.task {
  display: flex;
}
.task__title {
  margin: 0px 15px 0px 0px;
}
.task__description {
  margin: 0px 80px 0px 0px;
}
.task__status {
  margin: 0px 76px 0px 0px;
}
.task__progress {
}

.course-element__editor {
  cursor: pointer;
  transition: all 0.3s ease 0s;
}

.course-element__editor:hover {
  transform: scale(1.2);
}
</style>
