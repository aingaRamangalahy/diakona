<script setup lang="ts">
import type { ICandidate } from '@/types/candidate';
import { reactive, type PropType } from 'vue';
const emit = defineEmits(["select:candidate"])

defineProps({
    candidate: { type: Object as PropType<ICandidate>, required: true }
})

const viewState = reactive({
    selected: false
})

const selectCandidate = () => {
    viewState.selected = !viewState.selected
    emit("select:candidate", viewState.selected)
}
</script>
<template>
    <div class="candidate" @click.stop="selectCandidate()">
        <input class="select-box" type="checkbox" v-model="viewState.selected" />
        <img :src="candidate.profileImage" :alt="candidate.name">
        <div class="info">
            <div class="name">{{ candidate.name }}</div>
            <div class="vote">{{ candidate.vote }}</div>
        </div>
    </div>
</template>
  
<style lang="scss">
.candidate {
    border: 1px solid $secondary-border-color;
    width: 100%;
    display: flex;
    margin: 10px 0;
    border-radius: 5px;
    cursor: pointer;

    .select-box {
        width: 100px;
        height: 100px;
    }

    img {
        width: 100px;
        height: 100px;
        object-fit: cover;
    }

    .info {
        display: flex;
        flex-direction: column;
        padding: 0 20px;
        font-size: 20px;

        .name {
            color: $secondary-text-color;
        }
        
        .vote {
            font-weight: bold;
        }
    }
}
</style>