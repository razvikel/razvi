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
                    <div @click="showAnswer(conversation)" v-show="isAnswered()">
                        <b>{{ansToShow}}</b>
                        <p v-show="ansToShow !== 'צפו בתשובה!'" class="subtitle">
                            {{conversation.answer.name}} ({{new Date(conversation.answer.time).toLocaleDateString()}}
                            בשעה {{new Date(conversation.answer.time).toLocaleTimeString()}})
                        </p>
                    </div>
                    <div v-show="!isAnswered() && $store.state.managerName">
                        <b-input placeholder="ענה על השאלה..." v-model="answerToUpdate" type="textarea"></b-input>
                        <a @click="answer($store.state.managerName)" class="button is-success">שלח!</a>
                    </div>
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
                ansToShow: "צפו בתשובה!",
                answerToUpdate: ""
            }
        },
        methods: {
            showAnswer(conversation) {
                this.ansToShow = conversation.answer.content
            },
            isAnswered() {
                return this.conversation.answer.content !== ""
            },
            answer(name) {
                axios.post('http://localhost:3000/answer', {
                    conversationId: this.conversation._id,
                    answer: {
                        content: this.answerToUpdate,
                        name: name,
                        time: new Date()
                    }
                }).then(response => {
                    this.answerToUpdate = ""
                    this.ansToShow = "צפו בתשובה!"
                    this.$emit('conversationChange')
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
</style>