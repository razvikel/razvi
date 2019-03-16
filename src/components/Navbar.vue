<template>
  <div style="display: flex; flex-direction: row; align-items: center; margin-top: -2%">
    <router-link to="/"><img src="../../images/logo.jpg" style="width: 150px; height: 150px"></router-link>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/">
            <a class="navbar-item">
              מי אני?
            </a>
          </router-link>
          <router-link to="/open-chat">
            <a class="navbar-item">
              שאלות ותשובות
            </a>
          </router-link>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              ביטוחים
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                ביטוחי בריאות
              </a>
              <a class="navbar-item">
                ביטוחי סיעוד
              </a>
              <a class="navbar-item">
                פנסיה
              </a>
              <a class="navbar-item">
                ביטוחי חיים/מנהלים
              </a>
              <a class="navbar-item">
                פיננסים
              </a>
            </div>
          </div>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              מאמרים
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                מאמר 1
              </a>
              <a class="navbar-item">
                מאמר 2
              </a>
            </div>
          </div>
          <a class="navbar-item">
            גלריה
          </a>
        </div>
        <div class="navbar-end">
          <a v-show="!managerName" class="navbar-item get-manager" @click="isModalActive = true">
            עבור למצב מנהל!
          </a>
          <b v-show="managerName" class="navbar-item">
            שלום לך, {{managerName}}!
          </b>
          <a v-show="managerName" class="navbar-item get-manager" @click="disconnectManager()">
            התנתק
          </a>
        </div>
      </div>
    </nav>

    <section>
      <b-modal :active.sync="isModalActive" has-modal-card>
        <modal-form></modal-form>
      </b-modal>
    </section>
  </div>
</template>

<script>
  import axios from 'axios'

  const ModalForm = {
    props: ['name', 'password'],
    template: `
            <form action="">
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">הפוך למנהל!</p>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="שם">
                            <b-input
                                v-model="credentials.name"
                                placeholder="מי אתה?"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="סיסמה">
                            <b-input
                                type="password"
                                v-model="credentials.password"
                                password-reveal
                                placeholder="מה הסיסמה שלך?"
                                required>
                            </b-input>
                        </b-field>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="$parent.close()">סגור</button>
                        <button class="button is-primary" @click="() => {connectManager()}">התחבר!</button>
                    </footer>
                </div>
            </form>
        `,
    methods: {
      async connectManager() {
        await axios.post('http://localhost:3000/validate', { name: this.credentials.name, password: this.credentials.password }).then(response => {
          if (response.data) {
            this.$store.dispatch('changeManager', this.credentials.name)
            this.$parent.close()
          } else {
            this.$alertify.error('שם המנהל ו/או הסיסמה שגויים!')
          }
        }).catch(err => {
          this.$alertify.error('שגיאה לא ידועה בהתחברות, אנחנו מצטערים')
        })
      }
    },
    computed: {
      credentials() {
        return { name: this.name, password: this.password }
      },
      managerName() {
        return this.$store.getters.getManager
      }
    }
  }

  export default {
    name: 'my-navbar',
    components: {
      ModalForm
    },
    data() {
      return {
        isModalActive: false
      }
    },
    methods: {
      disconnectManager() {
        axios.post('http://localhost:3000/disconnect').then(response => {
          this.$store.dispatch('changeManager', null)
        }).catch(err => {
          this.$alertify.error('שגיאה לא ידועה בהתנתקות, אנחנו מצטערים')
        })
      }
    },
    computed: {
      managerName() {
        return this.$store.getters.getManager
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navbar-item {
    font-size: 30px;
    font-weight: bold;
  }

  .get-manager {
    font-size: 15px;
    font-weight: normal;
  }
</style>