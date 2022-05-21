<template>
<div class="messageboard">
{{placename}}'s Message Board
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
      place: undefined,
    };
  },
});

getPlace(): Promise<void> {
  return Promise.all([
    this.$http.get("/msb/" + this.$route.params.id),
  ]).then((response) => {
    this.place = response[0].data.place;
    document.title = this.place.name + " - Message Board - Cybertown";
    this.placename = this.place.name;
  }
  )
}
</script>
