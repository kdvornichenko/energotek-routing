<template>
    <component :is="url ? 'router-link' : 'div'" :to="url ? url : null" class="block">
        <SvgIcon :name="icon" class="block__icon" />
        <div class="block__content">
            <slot></slot>
        </div>
    </component>
</template>

<script lang="ts">
export default {
    props: {
        icon: String,
        id: String,
        router: String,
    },
    computed: {
        url() {
            return (this.router && this.id) ? this.router + this.id : ''
        }
    }
}
</script>
  