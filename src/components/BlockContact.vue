<template>
    <div class="block__item-content block__item-content--bg">
        <p><b> {{ item.ФИО }} </b></p>
        <p class="block__item-row" v-if="item.Должность">
            <span>Должность: </span>
            <span><b> {{ item.Должность }} </b></span>
        </p>
        <p class="block__item-row" v-if="item.Телефон">
            <span>Телефон: </span>
            <a @click.stop="" :href="'tel:' + item.Телефон"><b> {{ item.Телефон }} </b></a>
        </p>
        <p class="block__item-row" v-if="item.Email">
            <span>Email: </span>
            <a @click.stop="" :href="'mailto:' + item.Email"><b> {{ item.Email }} </b></a>
        </p>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        item: Object,
    },
}
</script>
