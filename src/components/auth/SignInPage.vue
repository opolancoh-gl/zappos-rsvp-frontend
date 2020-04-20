<template>
  <div>
    <div class="text-center">
      <div class="sign-in" id="clearance">
        <form
          class="form-signin"
          @submit.prevent="onSubmit"
        >
          <div
            novalidate="novalidate"
            class="simple_form session"
            method="post"
          >
            <div
              class="form-group email required session_email mb-3"
            >
              <input
                class="form-control string email required form-control-lg"
                :class="{ 'is-invalid': $v.email.$error }"
                placeholder="Email"
                type="email"
                id="session_email"
                v-model="email"
              />
            </div>
            <div
              class="form-group password required session_password mb-3"
            >
              <input
                class="form-control password required form-control-lg"
                :class="{
                  'is-invalid': $v.password.$error,
                }"
                placeholder="Password"
                type="password"
                id="session_password"
                v-model="password"
              />
            </div>
            <input
              type="submit"
              class="btn btn-primary btn btn-lg btn-primary btn-block"
              data-disable-with="Sign in"
              value="Sign in"
            />
          </div>
          <div class="forgot-btn">
            <div>
              <a href="/passwords/new">Forgot password?</a>
            </div>
            <div>
              <a href="/signup">Sign up</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      email: '',
      password: '',
      submitStatus: null,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  components: {},
  mounted() {
    this.$store.dispatch('header/setInfo', {
      title: 'Sign In',
    });
  },
  methods: {
    cleanData() {
      this.email = '';
      this.password = '';
    },
    onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
      } else {
        this.submitStatus = 'PENDING';
        this.logIn()
          .then(() => {
            this.submitStatus = 'LOGGED_IN';
          })
          .catch(() => {
            this.submitStatus = 'ERROR';
          });
      }
    },
    async logIn() {
      const resp = await this.$store.dispatch('logIn', {
        email: this.email,
        password: this.password,
      });
      if (resp) {
        this.cleanData();
        this.$router.push({ name: 'UserList' });
      } else {
        Swal.fire(
          'Log-In failed',
          'Something went wrong with the authentication process.',
          'error',
        );
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
