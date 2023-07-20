<template>
  <div>
    <input type="file" :rules="rules" @change="fileChange($event)" :id="id" />

    <div class="personal__preview">
      <img class="personal__img" :src="previewImage" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rules: {
      type: String,
      default: "file",
    },
    id: {
      type: String,
      required: false,
    },
  },
  beforeUnmount() {
    this.clearPreviewImage();
  },
  data() {
    return {
      previewImage: null,
    };
  },
  methods: {
    fileChange(event) {
      let data = new FormData();
      const file = event.target.files[0];
      data.append("file", file);
      this.previewImage = URL.createObjectURL(file);
      this.$emit("handleFileChange", data);
      console.log(file);
    },
  },

  clearPreviewImage() {
    if (this.previewImage) {
      URL.revokeObjectURL(this.previewImage);
      this.previewImage = null;
    }
  },
};
</script>

<style scoped>
.personal__preview {
  max-width: 100px;
  max-height: 100px;
}

.personal__img {
  width: 100%;
}
</style>
