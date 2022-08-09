<template>
<div id="MessageBoard" class="w-full flex-1 h-full">
<div v-if="this.active === 'view'" style="height:100%">
  <div class="overflow-y-auto" style="height:70%">
    <div v-if="success" class="text-chat"><center>{{ success }}</center></div>
    <div v-if="error" class="text-red-500"><center>{{ error }}</center></div>
    <div class="flex flex-row justify-center">
      <div class="flex border-4 border-black justify-center">
        <button class="btn-ui" @click="switchPost()">POST</button>
      </div>
      <div class="flex border-4 border-black justify-center">
        <button class="btn-ui" @click="switchManage()" v-show="boardAccess">MANAGE</button>
      </div>
    </div>
    <p><h2><center>{{ place.name }}'s Message Board</center></h2></p>
    <p><div class="content" v-html="place.messageboard_intro"/></p>
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
  <div v-if="!display" class="w-full" style="height:30%">
    <hr/>
  </div>
  <div v-if="display" class="w-full overflow-y-auto" style="height:30%">
    <hr/>
    <div class="border-black border-4"/>
    <div class="w-full flex flex-row">
      <div class="flex-grow border-2 border-black"/>
      <div class="flex-grow" style="width:80%">
        <p>Date: {{ ddate }}</p>
        <p>Subject: <span v-if="this.dreply === 1">RE: </span>{{ dsubject }}</p>
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
<div v-if="this.active === 'post'">
  <center>
    <div class="text-red-300 justify-center" v-if="error">
      {{ error }}
    </div>
    <div>
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
    <button class="btn" @click="switchView">CANCEL</button>&nbsp;&nbsp;&nbsp;<button type="submit" class="btn" @click="postMessageboardMessage">POST</button>
  </center>
</div>
<div v-if="this.active === 'reply'">
  <center>
    <lable for="subject">Subject:</lable>&nbsp;&nbsp;
    RE: {{ dsubject }}<br><br>
    <lable for="body">Message:</lable><br>
    <textarea id="body" class="text-black w-2/3 h-96" v-model="body"></textarea><br><br>
    <button class="btn" @click="switchView">CANCEL</button>&nbsp;&nbsp;&nbsp;<button type="submit" class="btn" @click="postMessageboardReply">REPLY</button>
  </center>
</div>
<div v-if="this.active === 'manage'">
  <center>
    <textarea id="intro" class="text-black w-2/3 h-96" v-model="intro"></textarea><br><br>
    <button class="btn" @click="switchView">CANCEL</button>&nbsp;&nbsp;&nbsp;
    <button type="submit" class="btn" @click="changeMessageboardIntro">UPDATE</button>
  </center>
</div>
</div>
</template>
<script lang="ts">
import Vue from 'vue';

import {
  debugMsg,
} from '@/helpers';

export default Vue.extend({
  name: "MessageBoard",
  data: () => {
    return {
      place: [],
      messageboardmessages: [],
      active: "view",
      display: false,
      ddate: "",
      dfrom: "",
      dsubject: "",
      dmessage: "",
      did: 0,
      dparentid: "",
      dreply: "",
      subject: "",
      body: "",
      success: "",
      error: "",
      boardAccess: false,
      intro: "",
    };
  },
  methods: {
    async getInfo(): Promise<void> {
      return this.$http.get("/messageboard/info/" + this.$route.params.id).then((response) => {
        this.place = response.data.place;
        this.boardAccess = response.data.boardAccess;
      });
    },
    async getMessageboardMessages(): Promise<void> {
      return this.$http.get("/messageboard/messages/" + this.$route.params.id).then((response) => {
        this.messageboardmessages = response.data.messageboardmessages;
      });
    },
    async showMessage(id: number, date: string, user: string, subject: string, parentid: string, reply: string): Promise<void> {
      return this.$http.get("/messageboard/getmessage/" + id).then((response) => {
        this.dmessage = response.data.message;
        this.ddate = date;
        this.dfrom = user;
        this.dsubject = subject;
        this.did = id;
        this.dparentid = parentid;
        this.dreply = reply;
        this.display = true;
      });
    },
    async postMessageboardMessage(): Promise<void> {
      try {
        const { data } = await this.$http.post("/messageboard/postmessage", {
          slug: this.$route.params.id,
          subject: this.subject,
          body: this.body,
        });
        this.success = 'Message was posted';
        this.error = '';
        this.active = 'view';
        this.subject = '';
        this.body = '';
        this.getMessageboardMessages();
      } catch (err) {
        this.error = err.response.data.err.error;
        this.body = err.response.data.err.body;
        this.success = '';
      }
    },
    async postMessageboardReply(): Promise<void> {
      try {
        const { data } = await this.$http.post("/messageboard/postreply", {
          slug: this.$route.params.id,
          subject: this.dsubject,
          body: this.body,
          parentid: this.dparentid,
        });
        this.success = 'Reply was posted';
        this.error = '';
        this.active = 'view';
        this.subject = '';
        this.body = '';
      } catch (error) {
        this.error = 'Unauthorized HTML Tag Used. The tag(s) have been removed, hit post again to send';
        this.body = 'testing something';
        this.success = '';
      }
    },
    async deleteMessageboardMessage(): Promise<void> {
      try {
        const { data } = await this.$http.post("/messageboard/deletemessage/" + this.did);
        this.success = 'Message Deleted';
        this.error = '';
        this.display = false;
      } catch (error) {
        this.error = error.response.data.error;
        this.success = '';
      } finally {
        this.getMessageboardMessages();
      };
    },
    async changeMessageboardIntro(): Promise<void> {
      try {
        const { data } = await this.$http.post("/messageboard/changemessageboardintro", {
          slug: this.$route.params.id,
          intro: this.intro,
        });
        this.success = 'Messageboard Information Updated';
        this.error = '';
        this.display = false;
      } catch (error) {
        this.error = error.response.data.error;
        this.success = '';
      } finally {
        this.getMessageboardMessages();
        this.getInfo();
        this.active = 'view';
      };
    },
    switchPost(): void {
      this.active = 'post';
    },
    switchView(): void {
      this.active = 'view';
    },
    switchReply(): void {
      this.active = 'reply';
    },
    switchManage(): void {
      this.intro = this.place.messageboard_intro;
      this.active = 'manage';
    },
  },
  created() {
    this.getInfo();
    this.getMessageboardMessages();
  },
  watch: {
    active: function(newValue) {
      if (newValue === 'view') {
        this.getMessageboardMessages();
      }
    }
  },
});
</script>
