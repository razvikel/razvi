<template>
  <div style="display: flex; flex-direction: row; align-items: center; margin-top: -2%">
      <router-link to="/"><img src="../../images/logo.jpg" style="width: 150px; height: 150px"></router-link>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
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
    
        
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'my-navbar',
  data () {
    return {
      
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
</style>