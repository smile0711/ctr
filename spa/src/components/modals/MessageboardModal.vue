<template>
  <Modal>
    <template v-slot:header>
        <button type="button" class="btn-ui-inline" @click="close('Modal closed')">X</button>
    </template>
    <template v-slot:body>
    <div name="first" class="justify-center overflow-y-auto" style="height: 55vh;">
      <div v-if="success" class="text-chat"><center>{{ success }}</center></div>
      <div v-if="error" class="text-red-500"><center>{{ error }}</center></div>
      <div class="justify-center">
        <button class="btn-ui" @click="openPostModal()">POST</button>
      </div>
      <div class="justify-center">
        <button class="btn-ui" @click="openManageModal()" v-show="$store.data.user.admin">MANAGE</button>
      </div>
    
      <p><h2><center>{{ $store.data.place.name }}'s Message Board</center></h2></p>
      <p><div class="content" v-html="place.messageboard_intro" /></p>
      <hr/>
      <div v-if="messageboardmessages <= 0">
        No messages to display
      </div>
      <div>
        <p v-for="(id, index) in messageboardmessages" :key="id.id">
        <span v-if="id.reply === 1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <a href="#"
        @click.prevent="showMessage(
        id.id,
        id.date,
        id.user,
        id.subject,
        id.parent_id,
        id.reply);">{{ id.date }}</a>
        From: {{ id.user }}
        Subject: <span v-if="id.reply === 1">RE: </span> {{ id.subject }}
        </p>
      </div>
    </div>
  <div v-if="!display" class="w-full">
    <hr/>
  </div>
  <div v-if="display" class="w-full overflow-y-auto" style="height: 30vh;">
    <hr/>
    <div class="border-black border-4"/>
    <div class="w-full flex flex-row">
      <div class="flex-grow border-2 border-black"/>
      <div class="flex-grow" style="width:80%">
        <p>Date: {{ ddate }}</p>
        <p>Subject: <span v-if="dreply === 1">RE: </span>{{ dsubject }}</p>
        <p>From: {{ dfrom }}</p>
      </div>
      <div class="flex-grow" style="width:19%">
        <div class="flex-grow border-2 border-black">
          <button class="btn-ui" @click="switchReply()">REPLY</button>
        </div>
        <div class="flex-grow border-2 border-black">
          <button
          class="btn-ui"
          v-show="boardAccess"
          @click="deleteMessageboardMessage()">DELETE</button>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-row">
      <div class="flex-grow border-2 border-black"/>
      <div class="flex-grow" style="width:99%" v-html="dmessage.message"/>
    </div>
  </div>
</div>
    </template>
  </Modal>
</template>
<script lang="ts">
import Vue from "vue";

import Modal from './Modal.vue';
import ModalMixin from './mixins/ModalMixin';
import MessageboardPostModal from './MessageboardPostModal.vue';
import WorldBrowserTools from '@/pages/world-browser/WorldBrowserTools.vue';
import ModalService from './services/ModalService.vue';

export default Vue.extend({
  name: "MessageboardModal",
  components: {Modal, WorldBrowserTools},
  data: () => {
    return {
      place: {},
      messageboardmessages: [],
      active: "view",
      display: false,
      ddate: "",
      dfrom: "",
      dsubject: "",
      dmessage: "",
      did: 0,
      dparentid: "",
      dreply: 0,
      subject: "",
      body: "",
      success: "",
      error: "",
      boardAccess: false,
      intro: "",
    }
  },
  methods: {
    deleteMessageboardMessage(): void{},
    openManageModal(): void{},
    openPostModal(): void{
      ModalService.open(MessageboardPostModal);
    },
    showMessage(): void{},
    switchReply(): void{},
  },
  mounted() {},
  mixins: [ModalMixin],
});
</script>