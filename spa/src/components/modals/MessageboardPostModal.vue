<template>
  <Modal>
    <template v-slot:header>
        <button type="button" class="btn-ui-inline" @click="close('Modal closed')">X</button>
    </template>
    <template v-slot:body>
    <div>
    <div class="text-red-300 justify-center" v-if="error">
      {{ error }}
    </div>
    <div class="justify-center">
      <h2>Post a Message</h2>
    </div>
    <div class="text-sm text-yellow-200 w-5/12 justify-center border-black border-4">
      Some HTML coding has been blocked for security reasons.  Basic HTML tags
      (i.e. &lt;p&gt;, &lt;br&gt;, &lt;a href&gt;, and &lt;img src&gt;) are
      allowed.  If a disallowed tag is used, an error message will display.
    </div>
    <lable for="subject">Subject:</lable>&nbsp;&nbsp;
    <input type="text" class="text-black" id="subject" v-model="subject" size="50"/><br><br>
    <lable for="body">Message:</lable><br>
    <textarea id="body" class="text-black w-2/3 h-96" v-model="body"></textarea><br><br>
    <button class="btn" @click="openMessageboardModal">CANCEL</button>
    &nbsp;&nbsp;&nbsp;
    <button type="submit" class="btn" @click="postMessageboardMessage">POST</button>
</div>
</div>
</template>
</Modal>
</template>

<script lang="ts">
import Vue from "vue";

import Modal from './Modal.vue';
import ModalMixin from './mixins/ModalMixin';
import ModalService from './services/ModalService.vue';
import MessageboardModal from './MessageboardModal.vue';

export default Vue.extend({
  name: "MessageboardPostModal",
  components: {Modal},
  data: () => {
  return {
      subject: String,
      body: String,
      error: String,
    };
  },
  methods: {
    openMessageboardModal(): void{
      ModalService.open(MessageboardModal);
    },
    postMessageboardMessage(): void{},
  },
  mixins: [ModalMixin],
})

</script>