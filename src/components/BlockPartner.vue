<template>
    <div>
        <component
            class="block__item-content"
            :is="item.GUIDПартнера ? 'router-link' : 'div'"
            :to="item.GUIDПартнера ? '/partners/' + item.GUIDПартнера : null"
        >
            <p class="ttu"> {{ item.Партнер }} </p>
            <p v-if="item.Роль"> {{ item.Роль }} </p>
        </component>
        <div v-if="item.ОтветственныеЛица?.length">
            <component
                class="block__item-content block__item-content--bg"
                :is="itemPerson.GUIDКонтакта ? 'router-link' : 'div'"
                :to="itemPerson.GUIDКонтакта ? '/contacts/' + itemPerson.GUIDКонтакта : null"
                v-for="itemPerson in item.ОтветственныеЛица"
                :key="itemPerson.Наименование"
            >
                <p><b> {{ itemPerson.Наименование }} </b></p>
                <p v-if="itemPerson.Должность"> {{ itemPerson.Должность }} </p>
            </component>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        item: Object,
    },
}
</script>
