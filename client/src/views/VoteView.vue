<script setup lang="ts">
import { type ICandidate } from "@/types/candidate";
import { onBeforeMount, reactive } from "vue";
import CardCandidate from "@/components/CardCandidate.vue";
import { loadCandidates } from "@/services/import";

import { useToast } from "vue-toastification";
import { vote } from "@/services/vote";

const toast = useToast();


const viewState = reactive({
  currentStep: 0,
  feminineCandidates: [] as ICandidate[],
  masculinCandidates: [] as ICandidate[]
});

const getCandidates = async () => {
  let { data: { content }} = await loadCandidates()
  content = content.map((candidate:ICandidate) => ({...candidate, selected: false,}));
  viewState.feminineCandidates = content.filter((candidate: ICandidate) => candidate.gender === "F");
  viewState.masculinCandidates = content.filter((candidate: ICandidate) => candidate.gender === "M");
}
onBeforeMount(async () => {
  await getCandidates();
})

const updateCandidate = (candidate: ICandidate, event: boolean) => {
  candidate.selected = event;
  if (event) candidate.vote++;
  else if (!event && candidate.vote > 0) candidate.vote--;
}

const nextStep = async () => {
  if (viewState.currentStep === 0) {
    viewState.currentStep++;
  } else {
    const candidatesUpdate = [...viewState.feminineCandidates, ...viewState.masculinCandidates];
    await vote(candidatesUpdate);
    await getCandidates();
    viewState.currentStep = 0;
    toast.success("Voaray ! ✔  🤝  ")
  }
}
const getCurrentCandidates = () => 
    viewState.currentStep === 0 ? viewState.feminineCandidates : viewState.masculinCandidates
</script>
<template>
  <div class="vote">
    <div class="current-vote">
      {{ viewState.currentStep === 0 ? 'Vehivavy' : 'Lehilahy' }}
    </div>
    <div class="candidates">
      <div class="candidate-item" v-for="candidate in getCurrentCandidates()" :key="candidate.id">
        <CardCandidate :candidate="candidate" @select:candidate="updateCandidate(candidate, $event)"/>
      </div>
    </div>
    <div class="btn" @click="nextStep">
      {{ viewState.currentStep === 0 ? 'Lehilahy >>': 'Raisina' }}
    </div>
  </div>
</template>

<style lang="scss">
.current-vote {
  text-align: center;
  font-size: 20px;
  border: 1px solid $accent-text-color;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto;
  width: 10%;
}
.candidates {
  padding: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  .candidate-item {
    width: 45%;
  }
}

.btn {
  background: $dark-background-color;
  color: $white-text-color;
  padding: 10px 15px;
  display: inline;
  border-radius: 5px;
  float: right;
  margin-right: 90px;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    background: $accent-background-color;
    color: $primary-text-color;
    border: 1px solid $dark-background-color;
  }
}
</style>
