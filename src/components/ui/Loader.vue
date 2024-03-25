<template>
    <div class="loader" v-if="isActive">
        <div class="lds-ellipsis"><span></span><span></span><span></span></div>
    </div>
</template>

<script>
export default {
    props: {
        isActive: Boolean,
    },
}
</script>
