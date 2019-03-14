<template>
    <div class="card">
        <div class="card-content">
            <p class="title">
                {{conversation.question.content}}
            </p>
            <p class="subtitle">
                {{conversation.question.name}} ({{new Date(conversation.question.time).toLocaleDateString()}} בשעה
                {{new Date(conversation.question.time).toLocaleTimeString()}})
            </p>
        </div>
        <footer class="card-footer">
            <p class="card-footer-item" style="display: flex; flex-direction: row; justify-content: space-around">
                <a style="flex: 3; font-size: 35px; color: black">
                    <div @click="showAnswer()" v-show="isAnswered()">
                        <b v-show="answerShown">{{conversation.answer.content}}</b>
                        <b v-show="!answerShown">צפו בתשובה!</b>
                        <p v-show="answerShown" class="subtitle">
                            {{conversation.answer.name}} ({{new Date(conversation.answer.time).toLocaleDateString()}}
                            בשעה {{new Date(conversation.answer.time).toLocaleTimeString()}})
                        </p>
                    </div>
                    <div v-show="!isAnswered() && $store.state.managerName">
                        <b-input placeholder="ענה על השאלה..." v-model="answerToUpdate" type="textarea"></b-input>
                        <a @click="answer()" class="button is-success">שלח!</a>
                    </div>
                    <a v-show="$store.state.managerName" class="button deleteIcon" @click="deleteConversation()">
                        <font-awesome-icon icon="trash" style="flex: 1" class="fa-2x" />
                    </a>
                </a>
                <img style="flex: 1; height: 200px; width: 200px; border-radius: 100%" src="../../images/eli.jpg">
            </p>
        </footer>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'question',
        props: ['conversation'],
        data() {
            return {
                answerShown: false,
                answerToUpdate: ""
            }
        },
        methods: {
            showAnswer() {
                this.answerShown = true
            },
            isAnswered() {
                return this.conversation.answer.content !== ""
            },
            answer() {
                axios.post(`http://localhost:3000/answer/${this.conversation._id}`, {
                    answer: {
                        content: this.answerToUpdate,
                        name: this.$store.state.managerName,
                        time: new Date()
                    }
                }).then(response => {
                    this.answerToUpdate = ""
                    this.$emit('conversationChange')
                })
            },
            deleteConversation() {
                this.$swal({
                    title: `בטוח שברצונך למחוק את השאלה של ${this.conversation.question.name}?`,
                    text: 'לא יהיה ניתן להחזיר אותה!',
                    type: 'warning',
                    showCancelButton: true
                }).then(result => {
                    if (result.value) {
                        axios.delete(`http://localhost:3000/conversation/${this.conversation._id}`).then(response => {
                            this.$alertify.success('השיחה נמחקה בהצלחה!')
                            this.$emit('conversationChange')
                            this.showAnswer()
                        })
                    }
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .card {
        border-radius: 5%;
    }

    .deleteIcon {
        border-radius: 100%;
        background-color: grey;
        height: 50px;
    }
</style>