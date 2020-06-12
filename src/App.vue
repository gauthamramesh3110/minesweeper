<template>
  <v-app>
    <v-app-bar app flat dark>
      <v-app-bar-nav-icon @click="toggleNavigation"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer color="#EFEFEF" app :value="navigation">
      <v-form class="ma-12">
        <v-select
          label="difficulty"
          filled
          rounded
          :items="difficulties"
          v-model="difficulty"
          @change="setDifficulty(difficulty)"
        ></v-select>
      </v-form>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid class="fill-height">
        <v-row no-gutters align="center" justify="center">
          <v-col cols="12" sm="6" class="d-flex justify-center">
            <grid></grid>
          </v-col>
          <v-col cols="12" sm="4" class="d-flex justify-center pa-3">
            <stats></stats>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import grid from "./components/Grid";
import stats from "./components/Stats";

export default {
  name: "App",

  components: {
    grid,
    stats
  },

  data() {
    return {
      difficulty: "easy",
      navigation: null,
    };
  },

  methods: {
    ...mapMutations(["init", "updateDifficulty"]),
    setDifficulty(difficulty){
      this.updateDifficulty(difficulty)
      this.init()
    },
    toggleNavigation(){
      this.navigation = !this.navigation
    }
  },

  computed: {
    ...mapGetters([
      "currentDifficulty",
      "difficulties",
      "gridData",
      "gameOngoing",
      "gameWon",
      "totalBombs",
      "totalFlagged"
    ])
  },

  created() {
    this.difficulty = this.currentDifficulty;
    this.init();
  }
};
</script>
