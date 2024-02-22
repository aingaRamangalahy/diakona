<script setup lang="ts">
import CardCandidate from '@/components/CardCandidate.vue';
import { loadCandidates } from '@/services/import';
import type { ICandidate } from '@/types/candidate';
import { onMounted, reactive } from 'vue';
import { useDisplayStore } from '@/stores/display';


const displayStore = useDisplayStore();

const viewState = reactive({
    candidates: [] as ICandidate[],
    filteredCandidates: [] as ICandidate[]
})

onMounted(async () => {
    await getCandidates();
    await filterCandidate();
    displayStore.setTittleText("RESULTS")

})
const getCandidates = async () => {
  let { data: { content }} = await loadCandidates()
  viewState.candidates = [...content]
}

const filterCandidate = (filter:string = "") => {
    if (filter) {
        viewState.filteredCandidates = [...viewState.candidates.filter(candidate => candidate.gender === filter)]
    } else {
        viewState.filteredCandidates = [...viewState.candidates];
    }

    viewState.filteredCandidates.sort((a,b) => b.vote - a.vote)
}
</script>
<template>
<div class="result-container">
    <div class="buttons">
        <div class="btn" @click="filterCandidate()">Mitambatra</div>
        <div class="btn" @click="filterCandidate('F')">Vehivavy</div>
        <div class="btn" @click="filterCandidate('M')">Lehilahy</div>
    </div>
    <div class="results">
        <div class="resul" v-for="(candidate, index) in viewState.filteredCandidates" :key="index">
            <CardCandidate :candidate="candidate" :is-result="true" />
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.result-container {

    .btn:hover {
        border: none;
    }

    padding: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;

    .buttons {
        display: flex;
    }


    .results {
        width: 70%;
    }
}
</style>