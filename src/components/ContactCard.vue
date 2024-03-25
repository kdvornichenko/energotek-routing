<template>
    <component :is="component" class="contact-card" :to="component === 'router-link' ? '/contacts/' + contact.GUID : null">
        <div class="contact-card__main">
            <p class="contact-card__name"> {{ contact.Наименование }} </p>
            <p v-if="contact.Должность" class="contact-card__role"> {{ contact.Должность }} </p>
        </div>
        <div class="contact-card__desc" v-if="contact.Партнер">
            <p><b> {{ contact.Партнер }} </b></p>
        </div>
        <div class="contact-card__desc" v-if="contact.МобильныйТелефон">
            <p>Мобильный телефон <a :href="'tel:' + contact.МобильныйТелефон"><b> {{ contact.МобильныйТелефон }} </b></a></p>
        </div>
        <div class="contact-card__desc" v-if="contact.Телефон">
            <p>Телефон <a :href="'tel:' + contact.Телефон"><b> {{ contact.Телефон }} </b></a></p>
        </div>
        <div class="contact-card__desc" v-if="contact.Email">
            <p>Email <a :href="'mailto:' + contact.Email"><b> {{ contact.Email }} </b></a></p>
        </div>
        <component 
            class="contact-card__desc"
            v-if="contact.Клиент"
            :is="contact.Клиент.GUID ? 'router-link' : 'div'"
            :to="contact.Клиент.GUID ? '/partners/' + contact.Клиент.GUID : null"
        >
            <p>Партнер <b class="ttu"> {{ contact.Клиент.Наименование }} </b></p>
        </component>
    </component>
</template>

<script type="ts">

export default {
    props: {
        contact: Object,
        component: String,
    },
}
</script>