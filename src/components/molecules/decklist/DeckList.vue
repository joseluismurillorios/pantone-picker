<template>
  <div id="DeckList">
    <div class="speed-buttons">
      <button v-for="type in shuffleTypes"
        :key="type"
        class="button is-small"
        :class="{ 'is-light': shuffleSpeed != `shuffle${type}` }"
        @click="shuffleSpeed = `shuffle${type}`"
      >
        {{ type }}
      </button>
    </div>
    <div class="main-buttons">
      <button
        v-if="isDeckShuffled"
        @click="displayInitialDeck"
        class="button is-primary is-outlined"
      >
        Reset <i class="fas fa-undo"></i>
      </button>
      <button @click="shuffleDeck" class="button is-primary">
        Shuffle <i class="fas fa-random"></i>
      </button>
    </div>
    <transition-group :name="shuffleSpeed" tag="div" class="deck">
      <div
        v-for="card in cards"
        :key="card.id"
        class="card"
        :class="suitColor[card.suit]"
      >
        <span class="card__suit card__suit--top">{{ card.suit }}</span>
        <span class="card__number">{{ card.rank }} </span>
        <span class="card__suit card__suit--bottom">{{ card.suit }}</span>
      </div>
    </transition-group>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'DeckList',
  props: {
    msg: String,
  },
  data: () => ({
    ranks: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
    suits: ['♥', '♦', '♠', '♣'],
    cards: [],
    suitColor: {
      '♠': 'black',
      '♣': 'black',
      '♦': 'red',
      '♥': 'red',
    },
    shuffleSpeed: 'shuffleMedium',
    shuffleTypes: ['Slow', 'Medium', 'Fast'],
    isDeckShuffled: false,
  }),
  created() {
    this.displayInitialDeck();
  },
  methods: {
    displayInitialDeck() {
      let id = 1;
      this.cards = [];

      for (let s = 0; s < this.suits.length; s += 1) {
        for (let r = 0; r < this.ranks.length; r += 1) {
          const card = {
            id,
            rank: this.ranks[r],
            suit: this.suits[s],
          };
          this.cards.push(card);
          id += 1;
        }
      }

      this.isDeckShuffled = false;
    },
    shuffleDeck() {
      for (let i = this.cards.length - 1; i > 0; i -= 1) {
        const randomIndex = Math.floor(Math.random() * i);

        const temp = this.cards[i];
        Vue.set(this.cards, i, this.cards[randomIndex]);
        Vue.set(this.cards, randomIndex, temp);
      }

      this.isDeckShuffled = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto+Slab:300,400,700");

html, body, #app {
  height: 100%;
  background: ghostwhite;
}

.speed-buttons {
  text-align: center;
  padding-top: 30px;
}
.speed-buttons .button {
  height: 2.50em;
}

.main-buttons {
  display: block;
  margin: 0 auto;
  text-align: center;
  padding-top: 30px;
  margin-bottom: 0 !important;
}

.count-section {
  position: absolute;
  top: 10px;
  right: 10px;
}

.fas {
  padding-left: 5px;
}

.deck {
  margin-left: 30px;
  padding-top: 30px;
}

.card {
  width: 75px;
  height: 100px;
  float: left;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 2px;

  background-color: #fff;
  box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  color: #4a4a4a;
  max-width: 100%;
  position: relative;

  // display: flex;
  // align-items: center;
}

.card__suit {
  width: 100%;
  display: block;
}

.card__suit--top {
  text-align: left;
  padding-left: 5px;
}

.card__suit--bottom {
  position: absolute;
  bottom: 0px;
  text-align: left;
  transform: rotate(180deg);
  padding-left: 5px;
}

.card__number {
  // width: 100%;
  position: absolute;
  top: 38%;
  text-align: center;
}

.red {
  color: #FF0000;
}

.black {
  color: #000;
}

.twitter-section {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.twitter-section .fa-twitter-square {
  color: #00d1b2;
  font-size: 30px;
}

.shuffleSlow-move {
  transition: transform 2s;
}

.shuffleMedium-move {
  transition: transform 1s;
}

.shuffleFast-move {
  transition: transform 0.5s;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 1210px) {
  .deck {
    position: initial;
    top: 0;
  }

  .twitter-section {
    display: none;
  }
}

</style>
