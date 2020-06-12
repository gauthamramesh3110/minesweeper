import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gridData: [],
    gameOngoing: true,
    gameWon: false,
    totalBombs: 0,
    totalFlagged: 0,
    navigation: false,
    currentDifficulty: "easy",
    currentGridSize: 7,
    currentNumberOfBombs: 10,
    difficulties: [
      {
        name: "easy",
        gridSize: 7,
        numberOfBombs: 10,
      },
      {
        name: "medium",
        gridSize: 10,
        numberOfBombs: 15,
      },
      {
        name: "hard",
        gridSize: 13,
        numberOfBombs: 20
      }
    ],
  },
  getters: {
    navigation: (state) => {
      return state.navigation;
    },

    currentDifficulty: (state) => {
      return state.currentDifficulty;
    },

    currentDifficultySettings: (state) => {
      return {
        gridSize: state.currentGridSize,
        numberOfBombs: state.numberOfBombs
      }
    },

    difficulties: (state) => {
      return state.difficulties.map((difficulty)=>{
        return difficulty.name;
      });
    },

    gridData: (state) => {
      return state.gridData;
    },
    gameOngoing: (state) => {
      return state.gameOngoing;
    },
    gameWon: (state) => {
      return state.gameWon;
    },
    totalBombs: (state) => {
      return state.totalBombs;
    },
    totalFlagged: (state) => {
      return state.totalFlagged;
    },
  },



  mutations: {
    updateDifficulty(state, d){
      state.currentDifficulty = d;

      let diff = state.difficulties.filter((difficulty)=>{
        return (difficulty.name == state.currentDifficulty)
      })[0]

      state.currentGridSize = diff.gridSize
      state.currentNumberOfBombs = diff.numberOfBombs
    },

    toggleNavigation(state) {
      state.navigation = !state.navigation;
    },

    gameOver(state) {
      state.gameOngoing = false;
    },

    openAll(state) {
      for (let i = 0; i < state.currentGridSize; i++) {
        for (let j = 0; j < state.currentGridSize; j++) {
          state.gridData[i][j].isOpened = true;
        }
      }
    },

    openOne(state, indices) {
      let i = indices[0];
      let j = indices[1];

      state.gridData[i][j].isOpened = true;
    },

    setDisplayText(state, params) {
      let i = params[0];
      let j = params[1];
      let sum = params[2];
      state.gridData[i][j].displayText = String(sum);
    },

    flag(state, [i, j]) {
      if (state.gridData[i][j].isOpened) {
        return;
      }

      state.gridData[i][j].isFlagged = !state.gridData[i][j].isFlagged;
      state.totalFlagged +=
        state.gridData[i][j].isFlagged - !state.gridData[i][j].isFlagged;

      if (state.totalBombs == state.totalFlagged) {
        state.gameOngoing = false;
        state.gameWon = true;
        for (let i = 0; i < state.currentGridSize; i++) {
          for (let j = 0; j < state.currentGridSize; j++) {
            state.gridData[i][j].isOpened = true;
            if(state.gridData[i][j].hasBomb && !state.gridData[i][j].isFlagged){
              state.gameWon = false
            }
          }
        }
      }
    },

    init(state) {
      state.gameOngoing = true;
      state.gameWon = false;
      state.totalBombs = 0;
      state.totalFlagged = 0;
      state.gridData = [];

      for (let i = 0; i < state.currentGridSize; i++) {
        let row = [];
        for (let j = 0; j < state.currentGridSize; j++) {
          row.push({
            isFlagged: false,
            hasBomb: false,
            isOpened: false,
            displayText: "",
          });
        }
        state.gridData.push(row);
      }

      for (let i = 0; i < state.currentNumberOfBombs; i++) {
        let x = Math.floor(Math.random() * state.currentGridSize);
        let y = Math.floor(Math.random() * state.currentGridSize);

        if (!state.gridData[x][y].hasBomb) {
          state.totalBombs++;
        }
        state.gridData[x][y].hasBomb = true;
      }
    },
  },
});
