<template>
  <div style="width:100%">
    <div v-if="!gameOngoing" class="d-flex flex-column align-center mb-4">
        <span v-if="gameWon" class="title font-weight-black green--text">You Win!</span>
        <span v-else class="title font-weight-black red--text">You Lose!</span>
    </div>
    <v-card outlined>
      <v-container fluid class="pa-0">
        <v-row no-gutters align="center" justify="center">
          <v-col class="d-flex justify-center" cols="9">
            <v-card-text>
              <span>
                <v-icon small class="mr-2">fas fa-bomb</v-icon>
                <span>Total Bombs: </span>
                <b>{{this.totalBombs}}</b>
              </span>
              <br />
              <span>
                <v-icon small class="mr-2">fas fa-flag</v-icon>
                <span>Total Flagged: </span>
                <b>{{this.totalFlagged}}</b>
              </span>
            </v-card-text>
          </v-col>
          <v-col class="d-flex justify-center" cols="3">
            <v-btn @click="init" depressed fab dark>
              <v-icon>fas fa-sync</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Stats",
  methods: {
    ...mapMutations(["init"])
  },
  computed: {
    ...mapGetters([
      "gridData",
      "gameOngoing",
      "gameWon",
      "totalBombs",
      "totalFlagged"
    ])
  }
};
</script>

<style>
</style>