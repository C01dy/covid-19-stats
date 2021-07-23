<template>
  <div class="column">
    <div class="card total-stats-card" :class="background">
      <div
        class="card-content is-flex is-flex-direction-column is-align-items-center"
      >
        <i :class="icon" class="fas is-size-3 has-text-white mb-3"></i>
        <h3 class="title is-3 has-text-white">{{ title }}:</h3>
        <h2 class="title is-2 has-text-white">
          {{ stat || '-' }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stat: Number,
    title: String,
    background: String,
    icon: String,
  },
};
</script>
