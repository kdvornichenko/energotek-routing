<template>
    <svg aria-hidden="true">
        <use :href="symbolId" />
    </svg>
</template>
  
<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
    name: 'SvgIcon',
    props: {
        prefix: {
            type: String,
            default: 'i',
        },
        name: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const symbolId = computed(() => `#${props.prefix}-${props.name}`)
        return { symbolId }
    },
})
</script>