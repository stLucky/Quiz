<template>
  <div v-if="isOpen" class="backdrop" @click="close">
    <div class="popup" @click.stop>
      <div class="popup__content">
        <slot></slot>
      </div>
      <div class="footer">
        <button @click="close">Ок</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalPopup",

  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },

  emits: {
    close: null,
  },

  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  },

  methods: {
    handleKeydown(e) {
      if (this.isOpen && e.key === "Escape") {
        this.close();
      }
    },

    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.popup {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 50%;
  min-width: 250px;
  height: 50%;
  margin: auto;
  padding: 20px;
  background-color: white;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  text-align: center;
}

.popup__content {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
}

.footer {
  margin-top: auto;
}
</style>
