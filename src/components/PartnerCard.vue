<template>
    <component :is="component" class="partner-card" :to="component === 'router-link' ? '/partners/' + partner.GUID : null">
        <div class="partner-card__main">
            <p class="partner-card__name"> {{ partner.Наименование || 'Без названия'}} </p>
            <p v-if="partner.ОсновнаяРоль" class="partner-card__role"> {{ partner.ОсновнаяРоль }} </p>
        </div>
        <div class="partner-card__desc" v-if="partner.ИНН">
            <p>ИНН <b> {{ partner.ИНН }} </b></p>
        </div>
        <div class="partner-card__desc" v-if="partner.Город  || partner.ОсновнойМенеджер">
            <p v-if="partner.Город"><b> {{ partner.Город }} </b></p>
            <p v-if="partner.ОсновнойМенеджер"><b> {{ partner.ОсновнойМенеджер }} </b></p>
        </div>
        <div class="partner-card__desc" v-if="partner.Адрес">
            <p><b> {{ partner.Адрес }} </b></p>
        </div>
    </component>
</template>

<script type="ts">

export default {
    props: {
        partner: Object,
        component: String,
    },
}
</script>