<template>
  <header
    class="main-header is-flex is-flex-direction-column is-align-items-center"
  >
    <h1 class="title is-1 mt-5 ">
      C<i class="fas fa-virus has-text-primary-dark"></i>VID-19
      CORONAVIRUS PANDEMIC
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
        Last checked: {{ totalNumbers.lastChecked }}
      </span>
    </span>
  </header>
  <section class="total-stats columns is-desktop is-vcentered">
    <div class="total-stats__cases column">
      <div class="card has-background-warning-dark">
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
      <div class="card has-background-danger-dark">
        <div
          class="card-content is-flex is-flex-direction-column is-align-items-center"
        >
          <i class="fas fa-skull is-size-3 has-text-white mb-3"></i>
          <h3 class="title is-3 has-text-white">Deaths:</h3>
          <h2 class="title is-2 has-text-white">{{ totalNumbers.deaths }}</h2>
        </div>
      </div>
    </div>

    <div class="total-stats__deaths column">
      <div class="card has-background-success">
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
export default {
  name: 'App',
  data() {
    return {
      topMovieList: [],
      totalNumbers: {},
    };
  },
  methods: {},
  mounted() {
    getTotalNumbers().then((res) => (this.totalNumbers = res.data));
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
  height: 80vh;
  margin: 0 1.5em;
}
</style>
