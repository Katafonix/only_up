<template>
  <div class="subscriber-wrapper">
    <div class="subscriber-title">
      <h3 class="subscriber__name">{{ subscriber.student.name }}</h3>
    </div>
    <div class="subscriber__description">
      {{ subscriber.student.email }}
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    subscriber: Object,
  },
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>
<style scoped>
.subscriber-wrapper {
  display: flex;
  align-items: center;
  padding: 5px;
  background-color: #e9e2e2;
  box-shadow: 1px 1px 200px 9px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  justify-content: space-between;
  gap: 15px;
}
.subscriber-header {
  display: flex;
  justify-content: space-between;
}
.subscriber-title {
}
.subscriber__name {
  font-size: 16px;
  font-weight: 700;
  line-height: 27px;
  text-align: left;
}

.subscriber__lection {
}
.subscriber__test {
}
.subscriber__icon {
  width: 65px;
  height: 64px;
}

.subscriber__image {
  width: 100%;
}

.subscriber-wrapper__button {
  align-self: center;
}
</style>
