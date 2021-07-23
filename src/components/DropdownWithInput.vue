<template>
  <div
    class="dropdown mt-2 ml-2 dropdown-regions"
    ref="dropdown-ref"
    :class="{ 'is-active': isVisible }"
  >
    <div class="dropdown-trigger">
      <button
        @click="this.isVisible = !this.isVisible"
        class="button"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
      >
        <span>{{ selectedRegion || 'Region' }}</span>
        <span class="icon is-small">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content m-0 dropdown-regions-list">
        <div class="dropdown-item">
          <div class="control has-icons-right">
            <input
              v-model="currentRegion"
              class="input is-small"
              type="text"
              placeholder="Region name"
            />
            <span class="icon is-right">
              <i class="fas fa-search"></i>
            </span>
          </div>
        </div>
        <span v-show="!list.length" class="dropdown-item">
          Loading...
        </span>
        <a
          v-for="item in filteredList"
          @click="selectItem(item)"
          :key="item"
          href="#"
          class="dropdown-item"
        >
          {{ item }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
      currentRegion: '',
    };
  },
  props: {
    list: Array,
    selectedRegion: String,
  },
  methods: {
    close(e) {
      if (!this.$refs['dropdown-ref'].contains(e.target)) {
        this.isVisible = false;
      }
    },
    selectItem(region) {
      this.$emit('select-item', region);
      this.isVisible = false;
    },
    getRegions() {
      this.$emit('get-regions');
    },
  },
  mounted() {
    document.addEventListener('click', this.close);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.close);
  },
  computed: {
    filteredList() {
      return this.list.filter((el) => el.indexOf(this.currentRegion) > -1);
    },
  },
  watch: {
    isVisible(newState) {
      if (newState) {
        this.getRegions();
      }
    },
  },
};
</script>
