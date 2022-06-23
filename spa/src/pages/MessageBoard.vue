<template>
<div class="Messageboard">
{{ info.name }}'s Message Board
</div>
</template>
<script lang="ts">
import Vue from 'vue';

/*import {
  debugMsg,
  environment,
} from '@/helpers';
*/

export default Vue.extend({
  name: "message_board",
  data: () => {
    return {
      info: "",
    };
  },
  methods: {
    async getPlace(): Promise<void> {
      return this.$http.get("/messageboard/" + this.$route.params.id).then((response) => {
        info: response.data.info;
      })
    },
  },
  mounted() {
    this.getPlace();
  },
});
</script>
