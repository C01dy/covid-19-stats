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
        Last reported: {{ totalNumbers.lastReported || '-' }}
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
        @input="getTotalStats"
        class="input is-medium "
        type="text"
        placeholder="Country name"
        style="width: 800px"
      />
      <span class="icon is-right">
        <i class="fas fa-search"></i>
      </span>
    </div>
    <div class="location is-align-self-flex-start is-flex">
      <h3
        class="subtitle is-3 has-background-link-light pl-3 pr-3 mt-2 location-text"
      >
        Location: {{ location }}
      </h3>
      <template v-if="isVisibleDropdown">
        <dropdown-with-input
          @get-regions="getCountryStats"
          @select-item="selectRegion"
          :list="regions"
          :selectedRegion="currentRegion"
        />
      </template>
    </div>
  </section>

  <section class="total-stats columns is-desktop is-vcentered">
    <stats-card
      title="Coronavirus Cases"
      icon="fa-lungs-virus"
      background="has-background-warning-dark"
      :stat="totalNumbers.confirmed"
    />

    <stats-card
      title="Deaths"
      icon="fa-skull"
      background="has-background-danger-dark"
      :stat="totalNumbers.deaths"
    />

    <stats-card
      title="Recovered"
      icon="fa-star-of-life"
      background="has-background-success"
      :stat="totalNumbers.recovered"
    />
  </section>
</template>

<script>
import { getTotalNumbers, getTargetCountryStats } from './api';
import StatsCard from './components/StatsCard';
import DropdownWithInput from './components/DropdownWithInput';
import _ from 'lodash';
export default {
  name: 'App',
  components: {
    StatsCard,
    DropdownWithInput,
  },
  data() {
    return {
      totalNumbers: {},
      currentCountry: '',
      currentRegion: '',
      location: '',
      selectedCountryStats: [],
      lastChecked: null,
    };
  },
  methods: {
    getTotalStats: _.debounce(function() {
      getTotalNumbers(this.currentCountry).then((res) => {
        this.totalNumbers = res.data;
        this.lastChecked = res.data.lastChecked;
        this.location = res.data.location;
      });
    }, 500),
    getCountryStats: function() {
      getTargetCountryStats(this.currentCountry).then((res) => {
        this.selectedCountryStats = res.data.covid19Stats;
        this.lastChecked = res.data.lastChecked;
      });
    },
    selectRegion(region) {
      this.currentRegion = region;
    },
  },
  mounted() {
    getTotalNumbers().then((res) => {
      this.totalNumbers = res.data;
      this.lastChecked = res.data.lastChecked;
      this.location = res.data.location;
    });
  },
  watch: {
    currentRegion() {
      this.totalNumbers = {
        confirmed: this.selectedRegion.confirmed,
        deaths: this.selectedRegion.deaths,
        recovered: this.selectedRegion.recovered,
      };
    },
  },
  computed: {
    isVisibleDropdown() {
      return this.location && this.location !== 'Global';
    },
    regions() {
      return this.selectedCountryStats.map((el) => el.province);
    },
    selectedRegion() {
      return this.selectedCountryStats.find(
        (el) => el.province === this.currentRegion
      );
    },
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

.location-text {
  border-radius: 4px;
}

.dropdown-regions-list {
  overflow-y: scroll;
  max-height: 320px;
}
</style>
