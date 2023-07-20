<template>
  <div class="subscribers-list" v-if="isOpen">
    <div class="subscribers-list__container">
      <div class="subscribers-list__list">
        <subscriber-element
          class="subscribers-list__item"
          v-for="subscriber in subscribers"
          :key="subscriber.id"
          :subscriber="subscriber"
        />
      </div>
      <div class="subscribers-list__footer">
        <slot name="footer"></slot>
        <form-button label="Выйти" @click="close" />
      </div>
    </div>
  </div>
</template>

<script>
import FormButton from "./FormButton.vue";
import SubscriberElement from "./SubscriberElement.vue";

export default {
  components: { FormButton, SubscriberElement },
  props: {
    subscribers: {
      type: Array,
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
    },
  },
};
</script>

<style scoped>
.subscribers-list {
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

.subscribers-list__container {
  padding: 15px;
  background: #fff;
  height: 627px;
  box-shadow: 0px 0px 17px 0px rgba(0, 0, 0, 0.5);
  border-radius: 100px;
  padding: 40px 42px;
}

.subscribers-list__list {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 1px 1px 100px 0px rgba(0, 0, 0, 0.08);
  height: 100%;
  gap: 15px;
}

.subscribers-list__header,
.subscribers-list__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
