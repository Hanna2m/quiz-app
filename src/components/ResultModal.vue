<template>
    <div v-if="open === true" class="vue-modal">
        <div class="vue-modal-inner">
            <div class="vue-modal-content">
              <slot />
              <button type="button" @click="handleClose">Close</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  props: {
    open: Boolean,
    correctNumber: Number
  },

  methods: {
    handleClose() {
        location.reload()
    }
  }

}
</script>

<style>
*,
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.vue-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.vue-modal-inner {

}

.vue-modal-content {
  max-width: 60%;
  display: flex;
  flex-direction: column;
  margin: 30% auto;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #fff;
  background-clip: padding-box;
  border-radius: 0.3rem;
  padding: 2rem;
}

button {
    padding: 8px 16px 8px 16px;
    font-size: 16px;
    border: none;
    margin: 10px;
    border-radius: 8px;
    background-color: none;
    border: 1px solid rgb(81, 81, 81)
}
</style>