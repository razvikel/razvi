<template>
    <div class="card">
        <div class="card-content">
            <p class="title">
                {{box.question.content}}
            </p>
            <p class="subtitle">
                {{box.question.name}} ({{box.question.time.toLocaleDateString()}} בשעה {{box.question.time.toLocaleTimeString()}})
            </p>
        </div>
        <footer class="card-footer">
            <p class="card-footer-item" style="display: flex; flex-direction: row; justify-content: space-around">
                <a style="flex: 3; font-size: 35px; color: black">
                    <div @click="showAnswer(box)" v-show="isAnswered()">
                        <b>{{ansToShow}}</b>
                        <p v-show="ansToShow !== 'צפו בתשובה!'" class="subtitle">
                            {{box.answer.name}} ({{box.answer.time.toLocaleDateString()}} בשעה {{box.answer.time.toLocaleTimeString()}})
                        </p>
                    </div>
                    <div v-show="!isAnswered()">
                        <b-input placeholder="ענה על השאלה..." v-model="answerToUpdate" type="textarea"></b-input>
                        <a @click="answer()" class="button is-success">שלח!</a>
                    </div>
                </a>
                <img style="flex: 1; height: 200px; width: 200px; border-radius: 100%" src="../../images/eli.jpg">
            </p>
        </footer>
    </div>
</template>

<script>
export default {
  name: 'question',
  props: ['box'],
  data () {
    return {
      ansToShow: "צפו בתשובה!",
      answerToUpdate: ""
    }
  },
  methods: {
    showAnswer(box) {
      this.ansToShow = box.answer.content
    },
    isAnswered() {
        return this.box.answer.content !== ""
    },
    answer() {
        this.box.answer.content = this.answerToUpdate
        this.box.answer.name = "אלי ויקלמן"
        this.box.answer.time = new Date()
        this.answerToUpdate = ""
        this.ansToShow = "צפו בתשובה!"
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
