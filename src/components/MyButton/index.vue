<template>
  <button :class="buttonClass" @click="handleClick">
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup>
// 接受 props
const props = defineProps({
  label: {
    type: String,
    default: '按钮'
  },
  type: {
    type: String,
    default: 'primary' // 可以是 'primary' 或 'secondary'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

// 发送事件
const emit = defineEmits(['click'])

// 按钮样式
const buttonClass = computed(() => {
  return ['btn', `btn-${props.type}`, { 'btn-disabled': props.disabled }]
})

// 按钮点击事件
const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>

<style scoped>
.btn {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid transparent;
}

.btn-primary {
  background-color: #409eff;
  color: white;
}

.btn-secondary {
  background-color: #d3d3d3;
  color: black;
}

.btn-disabled {
  background-color: #c0c0c0;
  cursor: not-allowed;
}
</style>
