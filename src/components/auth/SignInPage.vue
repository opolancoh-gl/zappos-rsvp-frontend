<template>
  <div>
    <Header :title="title" :subTitle="subTitle" />
    <div class="container my-4">
      <div class="text-center">
        <div class="sign-in" id="clearance">
          <div class="form-signin">
            <form
              novalidate="novalidate"
              class="simple_form session"
              action="/session"
              accept-charset="UTF-8"
              method="post"
            >
              <input type="hidden" value="✓" />
              <input type="hidden" name="authenticity_token" />
              <div class="form-group email required session_email mb-3">
                <input
                  class="form-control string email required form-control-lg"
                  placeholder="Email"
                  type="email"
                  id="session_email"
                />
              </div>
              <div class="form-group password required session_password mb-3">
                <input
                  class="form-control password required form-control-lg"
                  placeholder="Password"
                  type="password"
                  id="session_password"
                />
              </div>
              <input
                type="submit"
                value="Sign in"
                class="btn btn-primary btn btn-lg btn-primary btn-block"
                data-disable-with="Sign in"
              />
            </form>
            <div class="forgot-btn">
              <a href="/passwords/new">Forgot password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/_ui/Header.vue';

export default {
  data() {
    return {
      title: 'Sign In',
    };
  },
  components: {
    Header,
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
