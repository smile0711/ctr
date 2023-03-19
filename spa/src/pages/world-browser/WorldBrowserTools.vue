<template>
<div>
  <br /><button class="btn-ui" @click="openMessageboardModal()">World Messages</button>
</div>
</template>

<script lang="ts">
import Vue from 'vue';

import MessageboardModal from '@/components/modals/MessageboardModal.vue';
import ModalService from '@/components/modals/services/ModalService.vue';

export default Vue.extend({
  name: "WorldBrowserTools",
  components: {
    
  },
  
  data: () => {
    return {
      loaded: false,
    };
  },
  methods: {
    openMessageboardModal(): void {
      ModalService.open(MessageboardModal);
    }
  }
});
</script>

