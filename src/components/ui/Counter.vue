<template>
    <span class="counter"> {{ count }} </span>
</template>
  
<script lang="ts">
export default {
    props: {
        count: Number,
    },
}
</script>
  