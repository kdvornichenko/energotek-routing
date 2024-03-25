<template>
    <div class="document-card">
        <a @click="getFile" class="document-card__main">
            <p class="document-card__number"> {{ document.Номер }} </p>
            <p v-if="document.Дата" class="document-card__date"> {{ date }} </p>
            <a ref="pdf" @click.stop class="hidden" href=""></a>
        </a>
        <component
            class="document-card__desc document-card__project"
            :is="document.GUIDПроекта ? 'router-link' : 'p'"
            :to="document.GUIDПроекта ? '/projects/' + document.GUIDПроекта : null"
            v-if="document.Проект"
        >
            <p>Проект: <b> {{ document.Проект }} </b></p>
        </component>
        <component
            class="document-card__desc"
            :is="document.GUIDПартнера ? 'router-link' : 'div'"
            :to="document.GUIDПартнера ? '/partners/' + document.GUIDПартнера : null"
            v-if="document.Партнер"
        >
            <p>Партнер: <b> {{ document.Партнер }} </b></p>
        </component>
        <div class="document-card__desc" v-if="document.Сумма">
            <p>Сумма: <b> {{ total }} </b></p>
        </div>
    </div>
</template>

<script type="ts">
import { getFormattingDate, getFormattingPrice } from '../assets/ts/helpers'
import { useDocumentStore } from '../stores/document'

export default {
    setup() {
        const documentStore = useDocumentStore()
        const { getDocument } = documentStore
        return { getDocument }
    },
    props: {
        document: Object,
        type: String,
    },
    computed: {
        date() {
            return getFormattingDate(this.document.Дата, {time: true})
        },
        total() {
            return getFormattingPrice(this.document.Сумма)
        },
    },
    methods: {
        getFile() {
            const link = this.$refs.pdf
            this.getDocument({id: this.document.GUID, type: this.type})
                .then(data => {
                    const fileURL = window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' })); 
                    link.setAttribute('href', fileURL);
                    link.setAttribute('target', '_blank');
                    link.click();
                })
        },
    },
}
</script>