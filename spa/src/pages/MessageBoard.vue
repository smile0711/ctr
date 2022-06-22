<template>
<div class="flex-1 flex">
{{ info.name }}'s Message Board
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
      info: undefined,
    };
  },
  methods: {
    async getPlace(): Promise<void> {
      return this.$http.get("/messageboard/" + this.$route.params.id).then((response) => {
        response.data.info;
      })
    },
  }
});
</script>
