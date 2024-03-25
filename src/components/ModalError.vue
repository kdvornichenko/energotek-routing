<template>
    <Modal :isActive="!!error.length" :duration="5000" :transition="'translateToLeft'" :name="'error'" @close-modal="removeError">
        <div class="modal-error">
            <Button @click-handler="removeError" class="modal-error__close" :mod="'icon'" :icon="'close'" />
            <span class="modal-error__text">{{ error }}</span>
        </div>
    </Modal>
</template>

<script>
import { useErrorStore } from '../stores/error'
import { storeToRefs } from 'pinia'

export default {
  setup() {
    const errorStore = useErrorStore()
    const { error } = storeToRefs(errorStore)
    const { removeError } = errorStore
    return { error, removeError }
  },
}
</script>