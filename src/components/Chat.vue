<template>
  <div>
    <div class="container">
      <div class="notification">
        <section class="new-questions">
          <b style="font-size: 30px; background-color: cornflowerblue; margin-bottom: 2%; color: white">הוסף שאלה!</b>
          <div style="display: flex; flex-direction: row; align-items: center">
            <div style="flex:1; margin-right: 15%; margin-bottom: 2%">
              <b-field label="שם">
                <b-input placeholder="עם מי אני משוחח?" v-model="newQuestion.name"></b-input>
              </b-field>

              <b-field label="שאלה">
                <b-input placeholder="הכה את המומחה..." v-model="newQuestion.content" type="textarea"></b-input>
              </b-field>
            </div>
            <font-awesome-icon icon="question" style="flex: 1" class="fa-10x" />
          </div>
          <a @click="sendQuestion()" class="button is-success">שלח!</a>
        </section>
        <div v-for="conversation in conversations">
          <question :conversation="conversation" @conversationChange="getConversations()" style="margin-top: 5%"></question>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Question from '@/components/Question'
  import axios from 'axios'

  export default {
    name: 'chat',
    components: {
      'question': Question,
    },
    data() {
      return {
        conversations: [],
        newQuestion: { name: "", content: "", time: "" }
      }
    },
    methods: {
      sendQuestion() {
        let newQuestion = this.newQuestion
        newQuestion.time = new Date()
        axios.post('http://localhost:3000/conversation', { conversation: { question: newQuestion, answer: { content: "", time: new Date() } } }).then(response => {
          this.$alertify.success(newQuestion.name + ', שאלתך נוספה בהצלחה!');
          this.newQuestion = { name: "", content: "", time: "" }
          this.getConversations()
        })
      },
      getConversations() {
        axios.get('http://localhost:3000/conversations').then(response => {
          this.conversations = response.data
        })
      }
    },
    mounted() {
      this.getConversations()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .new-questions {
    background-color: white;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: center;
  }
</style>