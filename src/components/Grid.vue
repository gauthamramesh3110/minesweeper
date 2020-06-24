<template>
  <v-card
    :width="$vuetify.breakpoint.smAndUp ? '80vh' : '95vw' "
    outlined
    class="pa-1"
    color="#EFEFEF"
  >
    <v-responsive :aspect-ratio="1/1">
      <v-container fluid class="pa-0 fill-height">
        <v-row
          v-for="i in currentDifficultySettings.gridSize"
          :key="i"
          style="flex-wrap:nowrap;"
          no-gutters
        >
          <v-col
            v-for="j in currentDifficultySettings.gridSize"
            :key="j"
            cols="12"
            class="flex-shrink-1"
          >
            <v-card
              :elevation="gridData[i-1][j-1].isOpened ? 0 : 5"
              :color="(gridData[i-1][j-1].isFlagged && gameOngoing) ? 'blue' : 'white'"
              class="ma-1"
              @click="onClick([i-1, j-1])"
              @contextmenu.prevent="flag([i-1, j-1])"
            >
              <v-responsive :aspect-ratio="1/1">
                <div
                  v-if="gridData[i-1][j-1].isOpened"
                  class="d-flex justify-center align-center fill-height"
                >
                  <span>{{gridData[i-1][j-1].displayText}}</span>
                  <v-icon
                    v-if="gridData[i-1][j-1].hasBomb"
                    small
                    :color="(gridData[i-1][j-1].hasBomb && gridData[i-1][j-1].isFlagged) ? 'blue' : 'red'"
                  >fas fa-bomb</v-icon>
                </div>
                <div
                  v-if="!gridData[i-1][j-1].isOpened"
                  class="d-flex justify-center align-center fill-height"
                >
                  <v-icon v-if="gridData[i-1][j-1].isFlagged" small color="white">fas fa-flag</v-icon>
                </div>
              </v-responsive>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-responsive>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Grid",
  methods: {
    ...mapMutations([
      "gameOver",
      "openAll",
      "openOne",
      "setDisplayText",
      "flag",
      "init"
    ]),
    onClick(arr) {
      let i = arr[0];
      let j = arr[1];
      if (
        i < 0 ||
        j < 0 ||
        i > this.currentDifficultySettings.gridSize - 1 ||
        j > this.currentDifficultySettings.gridSize - 1
      ) {
        return;
      }

      if (this.gridData[i][j].isOpened) {
        return;
      }

      if (this.gridData[i][j].hasBomb) {
        this.gameOver();
        this.openAll();
        return;
      }

      this.openOne([i, j]);

      let tl = i > 0 && j > 0 ? !this.gridData[i - 1][j - 1].hasBomb : true;
      let t = i > 0 ? !this.gridData[i - 1][j].hasBomb : true;
      let tr =
        i > 0 && j < this.currentDifficultySettings.gridSize - 1
          ? !this.gridData[i - 1][j + 1].hasBomb
          : true;

      let bl =
        i < this.currentDifficultySettings.gridSize - 1 && j > 0
          ? !this.gridData[i + 1][j - 1].hasBomb
          : true;
      let b =
        i < this.currentDifficultySettings.gridSize - 1
          ? !this.gridData[i + 1][j].hasBomb
          : true;
      let br =
        i < this.currentDifficultySettings.gridSize - 1 &&
        j < this.currentDifficultySettings.gridSize - 1
          ? !this.gridData[i + 1][j + 1].hasBomb
          : true;

      let l = j > 0 ? !this.gridData[i][j - 1].hasBomb : true;
      let r =
        j < this.currentDifficultySettings.gridSize - 1
          ? !this.gridData[i][j + 1].hasBomb
          : true;

      if (tl && t && tr && bl && b && br && l && r) {
        this.onClick([i - 1, j - 1]);
        this.onClick([i - 1, j]);
        this.onClick([i - 1, j + 1]);
        this.onClick([i + 1, j - 1]);
        this.onClick([i + 1, j]);
        this.onClick([i + 1, j + 1]);
        this.onClick([i, j - 1]);
        this.onClick([i, j + 1]);
        return;
      }
      let sum = !tl + !t + !tr + !bl + !b + !br + !l + !r;
      this.setDisplayText([i, j, sum]);
    }
  },
  computed: {
    ...mapGetters([
      "currentDifficultySettings",
      "gridData",
      "gameOngoing",
      "gameWon",
      "totalBombs",
      "totalFlagged"
    ])
  }
};
</script>

<style scoped>
</style>