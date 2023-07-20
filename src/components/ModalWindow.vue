<template>
  <div class="modalWindow" v-if="isOpen">
    <div class="modalWindow__container">
      <div class="modalWindow__header">
        <div>{{ title }}</div>
      </div>
      <div class="modalWindow__content">
        <slot name="default"></slot>
      </div>
      <div class="modalWindow__footer">
        <slot name="footer"></slot>
        <form-button label="Выйти" @click="close" />
      </div>
    </div>
  </div>
</template>

<script>
import FormButton from "./FormButton.vue";

export default {
  components: { FormButton },
  props: {
    course: {
      type: Object,
      required: false,
    },
    title: {
      type: String,
      default: "Модальное окно",
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
      this.$emit("clearData");
    },
  },
};
</script>

<style scoped>
.modalWindow {
  z-index: 100;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}
.modalWindow__container {
  padding: 15px;
  background: #fff;
  box-shadow: 0px 0px 17px 0px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}
.modalWindow__header,
.modalWindow__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
