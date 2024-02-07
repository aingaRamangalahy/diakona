<script setup lang="ts">
import { type ICandidate } from "@/types/candidate";
import { reactive } from "vue";
import CardCandidate from "@/components/CardCandidate.vue";

import { useToast } from "vue-toastification";
import { vote } from "@/services/vote";

const toast = useToast();
let FeminineCandidates: ICandidate[] = [
  {
    "id": "001",
    "name": "Fanomezana Razafindrazaka",
    "profileImage": "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "selected": false,
    "vote": 0
  },
  {
    "id": "002",
    "name": "Faneva Rakotomalala",
    "profileImage": "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "selected": false,
    "vote": 0
  },
  {
    "id": "003",
    "name": "Volana Rasoanandrasana",
    "profileImage": "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "selected": false,
    "vote": 0
  },
  {
    "id": "004",
    "name": "Tahina Randriamampianina",
    "profileImage": "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "selected": false,
    "vote": 0
  },
  // ... (continue with 21 more females)

  {
    "id": "049",
    "name": "Tsiry Andriamaholisoa",
    "profileImage": "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "selected": false,
    "vote": 0
  },
  {
    "id": "050",
    "name": "Faharoa Rakotoarisoa",
    "profileImage": "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "selected": false,
    "vote": 0
  }
];
let MasculinCandidates: ICandidate[] = [
  {
    "id": "005",
    "name": "Fanomezana Razafindrazaka",
    "profileImage": "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "selected": false,
    "vote": 0
  },
  {
    "id": "006",
    "name": "Faneva Rakotomalala",
    "profileImage": "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "selected": false,
    "vote": 0
  },
  {
    "id": "007",
    "name": "Volana Rasoanandrasana",
    "profileImage": "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "selected": false,
    "vote": 0
  },
  {
    "id": "008",
    "name": "Tahina Randriamampianina",
    "profileImage": "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "selected": false,
    "vote": 0
  },
  // ... (continue with 21 more males)

  {
    "id": "009",
    "name": "Tsiry Andriamaholisoa",
    "profileImage": "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "selected": false,
    "vote": 0
  },
  {
    "id": "010",
    "name": "Faharoa Rakotoarisoa",
    "profileImage": "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "selected": false,
    "vote": 0
  }
];



const viewState = reactive({
  currentStep: 0,
  feminineCandidates: FeminineCandidates,
  masculinCandidates: MasculinCandidates
})

const updateCandidate = (candidate: ICandidate, event: boolean) => {
  candidate.selected = event;
  if (event) candidate.vote++;
  else if (!event && candidate.vote > 0) candidate.vote--;
}

const reset = () => {
  viewState.feminineCandidates.forEach(candidate => {
    candidate.selected = false;
    candidate.vote = 0
  })
  viewState.masculinCandidates.forEach(candidate => {
    candidate.selected = false;
    candidate.vote = 0
  })
}

const nextStep = async () => {
  if (viewState.currentStep === 0) {
    viewState.currentStep++;
  } else {
    const candidatesUpdate = [...viewState.feminineCandidates, ...viewState.masculinCandidates];
    const results = await vote(candidatesUpdate);
    console.log("results: ", results);
    viewState.currentStep = 0;
    reset()
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
