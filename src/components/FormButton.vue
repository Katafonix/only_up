<template>
  <div>
    <button class="button" :class="classButton" @click="click">
      {{ label }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    courseId: {
      type: Number,
      required: false,
    },
    classButton: {
      type: String,
      default: "",
    },
  },
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
button {
  display: inline-flex;
  border: none;
  padding: 13px 60px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background-color: #4640de;
  color: #ffffff;
  transition: all 0.3s ease 0s;
}

@media (max-width: 1380px) {
  button {
    padding: 13px 40px;
  }
}

@media (max-width: 660px) {
  button {
    padding: 13px 30px;
  }
}

button:hover {
  background-color: #312bdd;
}
.button_white {
  border: 1px solid white;
}

.button_blue-white {
  background-color: #4640de;
}

.button__blue {
  color: #4640de;
}
</style>
