<template>
  <!-- archive template: property/action_standard.tmpl -->
  <div class="text-center" v-if="loaded">
    <span class="btn-ui" >Information</span>
    <button class="btn-ui" @click="openMessageboardModal()">Home Messages</button>
    <router-link
      v-if="this.$store.data.place.block"
      :to="'/block/'+this.$store.data.place.block.id">
      <img src="/assets/img/up.gif" />
      {{ this.$store.data.place.block.name }}
    </router-link>
    <br/>
    <br/>
    <div v-if="this.$store.data.user.id == this.$store.data.place.member_id">
      <router-link
        :to="'/home/update'"
        class="btn-ui">
        Update
      </router-link>
    </div>
    <br/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import MessageboardModal from '@/components/modals/MessageboardModal.vue';
import ModalService from '@/components/modals/services/ModalService.vue';

export default Vue.extend({
  name: "HomeTools",
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
    console.log('home tools');
    console.log(this.$store.data.place);
  },
});
</script>

