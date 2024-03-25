<template>
    <div class="acc" :class="{'acc--is-open': isOpen}">
        <button class="btn acc__btn" @click="isOpen = !isOpen">
            <slot name="btn"></slot>
            <SvgIcon :name="'arrow-down'" />
        </button>
        <div class="acc__content" :style="{ height: isOpen ? height + 'px' : 0}">
            <div class="acc__content-inner" ref="content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            isOpen: false,
            height: 0,
        }
    },
    mounted() {
        this.height = this.$refs.content.clientHeight
    },
}
</script>
  