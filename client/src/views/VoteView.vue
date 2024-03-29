<script setup lang="ts">
import { type ICandidate } from "@/types/candidate";
import { onBeforeMount, reactive, ref } from "vue";
import CardCandidate from "@/components/CardCandidate.vue";
import { loadCandidates } from "@/services/import";

import { useToast } from "vue-toastification";
import { vote } from "@/services/vote";
import { useDisplayStore } from "@/stores/display";

const toast = useToast();
const sectionRefEl = ref<HTMLElement | null>(null);
const displayStore = useDisplayStore();


const viewState = reactive({
  currentStep: 0,
  feminineCandidates: [] as ICandidate[],
  masculinCandidates: [] as ICandidate[]
});

const getCandidates = async () => {
  let { data: { content } } = await loadCandidates()
  content = content.map((candidate: ICandidate) => ({ ...candidate, selected: false, }));
  viewState.feminineCandidates = content.filter((candidate: ICandidate) => candidate.gender === "F");
  viewState.masculinCandidates = content.filter((candidate: ICandidate) => candidate.gender === "M");
}

onBeforeMount(async () => {
  await getCandidates();
  displayStore.setTittleText("FEMININE");
})

const updateCandidate = (candidate: ICandidate, event: boolean) => {
  candidate.selected = event;
  if (event) candidate.vote++;
  else if (!event && candidate.vote > 0) candidate.vote--;
}

const countSelected = (candidates: ICandidate[]) => candidates.filter(candidate => candidate.selected).length;

const scrollToTop = (element: any) => {
  const topPosition = element.getBoundingClientRect().top;
  window.scrollTo({ top: topPosition, behavior: "smooth" });
}

const nextStep = async () => {
  if (viewState.currentStep === 0) {
    const countFeminine = countSelected(viewState.feminineCandidates);
    if (countFeminine > 40) {
      const surplus = countFeminine - 40;
      toast.error(`Hamarino fa mihoatra: ${surplus}`!);
      return
    }
    viewState.currentStep++;
    // if (sectionRefEl.value) sectionRefEl.value.scrollIntoView({  behavior: "smooth", block: "start", top: 64 })
    //  window.scrollTo({top: 0, behavior: "smooth"})
    displayStore.setTittleText("MASCULINE");
  } else {
    const countMasculine = countSelected(viewState.masculinCandidates);
    if (countMasculine > 40) {
      const surplus = countMasculine - 40;
      toast.error(`Hamarino fa mihoatra: ${surplus}`!);
      return
    }
    const candidatesUpdate = [...viewState.feminineCandidates, ...viewState.masculinCandidates];
    await vote(candidatesUpdate);
    await getCandidates();
    viewState.currentStep = 0;
    toast.success("Voaray ! ✔  🤝  ");
    // if (sectionRefEl.value) sectionRefEl.value.scrollIntoView({ behavior: "smooth", block: "start", top: 64 })
    //  window.scrollTo({ top: 0, behavior:"smooth"})
    displayStore.setTittleText("FEMININE");
  }
}
const getCurrentCandidates = () =>
  viewState.currentStep === 0 ? viewState.feminineCandidates : viewState.masculinCandidates
</script>
<template>
  <div class="vote" ref="sectionRefEl">
    <div class="candidates">
      <div class="candidate-item" v-for="candidate in getCurrentCandidates()" :key="candidate.id">
        <CardCandidate :candidate="candidate" @select:candidate="updateCandidate(candidate, $event)" />
      </div>
    </div>
    <div class="btn" @click="nextStep">
      {{ viewState.currentStep === 0 ? 'Lehilahy >>' : 'Raisina' }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vote {
  display: flex;
  flex-direction: column;

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
    padding: 30px 40px;
    display: flex;
    flex-wrap: wrap;
    
    justify-content: space-evenly;
    
    .candidate-item {
      width: 100%;
      max-width: 45%;
    }
  }

  .btn {
    align-self: end;
    margin-bottom: 80px;
  }

}
</style>
