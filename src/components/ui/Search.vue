<template>
  <div class="search form__input-wrap">
    <input class="form__input" :value="search" type="text" placeholder="Поиск" @input="input">
    <SvgIcon class="search__icon" :name="'search'" />
    <Button @click-handler="setSearchToQuery('')" v-show="search?.length" class="search__btn-reset" :mod="'icon'" :icon="'close'" />
  </div>
</template>

<script>
import { debounce } from '../../assets/ts/helpers'
import { useSearchStore } from '../../stores/search'
import { storeToRefs } from 'pinia'

export default {
  setup() {
    const searchStore = useSearchStore()

    const { search } = storeToRefs(searchStore)
    const { setSearchToQuery } = searchStore
    return { search, setSearchToQuery }
  },
  emits: ['search-handler'],
  created(){
    this.debounsedInput = debounce(function(e) {
      this.setSearchToQuery(e.target.value)
    }, 500)
  },
  methods: {
    debounsedInput(){},
    input(e) {
      this.debounsedInput(e)
    },
  },
}
</script>
