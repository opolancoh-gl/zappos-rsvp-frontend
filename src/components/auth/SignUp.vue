<template>
  <div>
    <div class="text-center">
      <div class="sign-in" id="clearance">
        <div class="form-signin">
          <div novalidate="novalidate" class="simple_form session" method="post">
            <input type="hidden" value="✓" />
            <input type="hidden" name="authenticity_token" />
            <div class="form-group email required session_email mb-3">
              <input
                class="form-control string email required form-control-lg"
                placeholder="User name"
                type="User name"
                id="session_username"
                v-model="username"
              />
            </div>
            <div class="form-group email required session_email mb-3">
              <input
                class="form-control string email required form-control-lg"
                placeholder="Email"
                type="email"
                id="session_email"
                v-model="email"
              />
            </div>
            <div class="form-group password required session_password mb-3">
              <input
                class="form-control password required form-control-lg"
                placeholder="Password"
                type="password"
                id="session_password"
                v-model="password"
              />
            </div>
            <div class="form-group password required session_password mb-3">
              <input
                class="form-control password required form-control-lg"
                placeholder="Confirm Password"
                type="password"
                id="session_password_confirm"
                v-model="password_confirm"
              />
            </div>
            <button
              @click="register"
              class="btn btn-primary btn btn-lg btn-primary btn-block"
              data-disable-with="Sign Up"
            >Sign Up</button>
          </div>
          <div class="forgot-btn">
            <a href="/signin">I have an account</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      password_confirm: '',
    };
  },
  components: {},
  mounted() {
    this.$store.dispatch('application/setHeaderInfo', { title: 'Sign Up' });
  },
  methods: {
    cleanData() {
      this.username = '';
      this.email = '';
      this.password = '';
      this.password_confirm = '';
    },
    register() {
      if (this.password && this.password_confirm) {
        if (this.password_confirm === this.password) {
          this.$store.dispatch('addNewUser', {
            username: this.username,
            email: this.email,
            password: this.password,
          }).then(() => {
            this.cleanData();
            alert('Registration OK');
          });
        } else {
          alert('Passwords are not matching.');
        }
      } else {
        alert('empty fields.');
      }
    },
  },
};
</script>

<style src="./auth-form-style.css"></style>

<style scoped>
.form-group.email.required.session_email {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-group.password.required.session_password {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.forgot-btn {
  margin-top: 20px;
}

.reset {
  margin-top: 150px;
}

.reset-desc {
  word-wrap: break-word;
  width: 200px;
}
</style>
