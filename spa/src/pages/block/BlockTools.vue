<template>
  <div class="text-center" v-if="loaded">
    <span class="btn-ui" >Information</span>
    <button class="btn-ui" @click="openMessageboardModal()">Block Messages</button>
    <router-link
      v-if="this.$store.data.place.hood"
      :to="'/neighborhood/'+this.$store.data.place.hood.id">
      <img src="/assets/img/up.gif" />
      {{ this.$store.data.place.hood.name }}
    </router-link>
    <br/>
    <br/>
    <div v-if="this.$store.data.user.admin && this.$store.data.place.block">
      <span class="btn-ui">Message to All</span>
      <span class="btn-ui">Inbox</span>
      <router-link
        :to="'/block/'+this.$store.data.place.block.id+'/wizard'"
        class="btn-ui">
        Update
      </router-link>
      <span class="btn-ui" title="Check Images">Check</span>
      <span class="btn-ui">Access Rights</span>
    </div>
    <br/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import MessageboardModal from '@/components/modals/MessageboardModal.vue';
import ModalService from '@/components/modals/services/ModalService.vue';

export default Vue.extend({
  name: "BlockTools",
  data: () => {
    return {
      loaded: false,
    };
  },
  methods: {
    openMessageboardModal(): void {
      ModalService.open(MessageboardModal);
    }
  },
  mounted() {
    this.loaded = true;
  },
});
</script>

