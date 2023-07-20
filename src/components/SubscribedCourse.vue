<template>
  <div class="subscribedCourse" @click="click">
    <div class="subscribedCourse__date">23</div>
    <div class="subscribedCourse__name">
      {{ subscribedCourse.subject.name }}
    </div>
    <div class="subscribedCourse__status">Подписан</div>
    <div class="subscribedCourse__progress">20%</div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    subscribedCourse: Object,
  },
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>
<style scoped>
.subscribedCourse {
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
}
.subscribedCourse__date {
  max-width: 80px;
  width: 100%;
}
.subscribedCourse__name {
  max-width: 300px;
  width: 100%;
}
.subscribedCourse__status {
  max-width: 250px;
  width: 100%;
}
.subscribedCourse__progress {
  max-width: 80px;
  width: 100%;
}
</style>
