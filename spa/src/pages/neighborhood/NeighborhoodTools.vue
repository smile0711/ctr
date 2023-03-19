<template>
  <div class="text-center">
    <span href="" class="btn-ui">Information</span>
    <span href="" class="btn-ui">Inbox</span>
    <button class="btn-ui" @click="openMessageboardModal()">Hood Messages</button>
    <span href="" class="btn-ui">Vote</span>
    <router-link
      v-if="this.$store.data.place.colony"
      :to="'/place/'+this.$store.data.place.colony.slug">
      <img src="/assets/img/up.gif" />
      {{ this.$store.data.place.colony.name }}
    </router-link>
    <br/>
    <br/>
    <div v-if="this.$store.data.user.admin && this.$store.data.place.block">
      <span href="" class="btn-ui">Message to All</span>
      <span href="" class="btn-ui">Inbox to All</span>
      <span href="" class="btn-ui">Update</span>
      <span href="" class="btn-ui">Access Rights</span>
    </div >
    <br/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import MessageboardModal from '@/components/modals/MessageboardModal.vue';
import ModalService from '@/components/modals/services/ModalService.vue';

export default Vue.extend({
  name: "NeighborhoodTools",
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

