<template>
  <div class="container my-4">
    <div class="password-reset text-center reset" id="clearance">
      <div class="mb-4" style="font-size: 100px;">
         <i class="fas fa-ticket-alt"></i>
      </div>
      <h2>Reset your password</h2>
      <div class="reset-desc mb-4 col-md-4 offset-md-4">
        To be emailed a link to reset your password, please enter your email address.
      </div>
    </div>
    <div class="form-signin">
      <form
        novalidate="novalidate"
        class="simple_form password"
        action="/passwords"
        accept-charset="UTF-8"
        method="post"
      >
        <div class="form-group email required password_email">
          <input
            class="form-control string email required"
            placeholder="Email"
            type="email"
            id="password_email"
          />
        </div>
        <input
          type="submit"
          value="Reset password"
          class="btn btn-primary btn btn-lg btn-primary btn-block"
          data-disable-with="Reset password"
        />
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
