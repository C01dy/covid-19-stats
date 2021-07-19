<template>
  <i
    class="fas fa-virus has-text-primary-dark has-text-grey-lighter background-virus"
  ></i>
  <header
    class="main-header is-flex is-flex-direction-column is-align-items-center"
  >
    <h1 class="title is-1 mt-5 ">
      C<i class="fas fa-virus has-text-primary-dark"></i>VID-19 CORONAVIRUS
      PANDEMIC
    </h1>
    <span class="last-info">
      <span
        class="last last-reported has-background-info-light pl-3 pr-3 pt-1 pb-1 m-2 is-underlined"
      >
        Last reported: {{ totalNumbers.lastReported }}
      </span>
      <span
        class="last last-checked has-background-info-light pl-3 pr-3 pt-1 pb-1 m-2 is-underlined"
      >
        Last checked: {{ lastChecked }}
      </span>
    </span>
  </header>
  <section
    class="search-bar-container is-flex is-flex-direction-column is-align-items-center mt-5"
    style="width: 800px"
  >
    <div class="control has-icons-right">
      <input
        v-model="currentCountry"
        @input="getCountryStats"
        class="input is-medium "
        type="text"
        placeholder="Country name"
        style="width: 800px"
      />
      <span class="icon is-right">
        <i class="fas fa-search"></i>
      </span>
    </div>
    <div class="location is-align-self-flex-start">
      <h3 class="subtitle is-3 has-background-link-light pl-3 pr-3 mt-2">
        Location: {{ totalNumbers.location }}
      </h3>
    </div>
  </section>
  <section class="total-stats columns is-desktop is-vcentered">
    <div class="total-stats__cases column">
      <div class="card total-stats-card has-background-warning-dark">
        <div
          class="card-content is-flex is-flex-direction-column is-align-items-center"
        >
          <i class="fas fa-lungs-virus is-size-3 has-text-white mb-3"></i>
          <h3 class="title is-3 has-text-white">Coronavirus Cases:</h3>
          <h2 class="title is-2 has-text-white">
            {{ totalNumbers.confirmed }}
          </h2>
        </div>
      </div>
    </div>

    <div class="total-stats__deaths column">
      <div
        class="card total-stats-card total-stats-card has-background-danger-dark"
      >
        <div
          class="card-content is-flex is-flex-direction-column is-align-items-center"
        >
          <i class="fas fa-skull is-size-3 has-text-white mb-3"></i>
          <h3 class="title is-3 has-text-white">Deaths:</h3>
          <h2 class="title is-2 has-text-white">{{ totalNumbers.deaths }}</h2>
        </div>
      </div>
    </div>

    <div class="total-stats__recovered column">
      <div class="card total-stats-card has-background-success">
        <div
          class="card-content is-flex is-flex-direction-column is-align-items-center"
        >
          <i class="fas fa-star-of-life is-size-3 has-text-white mb-3"></i>
          <h3 class="title is-3 has-text-white">Recovered:</h3>
          <h2 class="title is-2 has-text-white">
            {{ totalNumbers.recovered || '-' }}
          </h2>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getTotalNumbers } from './api';
import anime from 'animejs/lib/anime.es.js';
import _ from 'lodash';
export default {
  name: 'App',
  data() {
    return {
      topMovieList: [],
      totalNumbers: {},
      currentCountry: '',
      selectedCountryStats: null,
      lastChecked: null,
    };
  },
  methods: {
    getCountryStats: _.debounce(function() {
      getTotalNumbers(this.currentCountry).then((res) => {
        anime
          .timeline({
            duration: 600,
          })
          .add({
            targets: '.total-stats-card',
            scale: 1.2,
          })
          .add({
            targets: '.total-stats-card',
            scale: 1,
          });
        this.totalNumbers = res.data;
        this.lastChecked = res.data.lastChecked;
      });
    }, 500),
  },
  mounted() {
    getTotalNumbers().then((res) => {
      this.totalNumbers = res.data;
      this.lastChecked = res.data.lastChecked;
    });
  },
};
</script>

<style>
body {
  font-family: 'Cabin', sans-serif;
}

h1,
h2,
h3 {
  text-align: center;
}

.total-stats {
  height: 60vh;
  margin: 0 1.5em;
}

.background-virus {
  position: absolute;
  font-size: 500px;
  right: -12%;
  z-index: -999;
  top: 5%;
}

.search-bar-container {
  margin: 0 auto;
}
</style>
