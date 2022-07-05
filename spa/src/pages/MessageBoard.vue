<template>
<div class="Messageboard">
{{ place.name }}'s Message Board
</div>
</template>
<script lang="ts">
import Vue from 'vue';

import {
  debugMsg,
  environment,
} from '@/helpers';

export default Vue.extend({
  name: "MessageBoard",
  data: () => {
    return {
      place: [],
    };
  },
  methods: {
    async getInfo(): Promise<void> {
      return this.$http.get("/messageboard/" + this.$route.params.id).then((response) => {
        this.place = response.data.place;
      });
    },
  },
  mounted() {
    this.getInfo();
  },
});
</script>
