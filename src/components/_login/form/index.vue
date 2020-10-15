<template>
  <v-form class="b-login-form" @submit.prevent="onSubmit" :disabled="loading">
    <div class="b-login-form__title">Log in</div>
    <div class="b-login-form__subtitle">Using your email and password</div>
    <div class="b-login-form__control">
      <v-text-field
        label="Email"
        outlined
        :value="login"
        type="email"
        hide-details
        @input="onChangeField({field: 'login', value: $event})"
      />
    </div>
    <div class="b-login-form__control">
      <v-text-field
        label="Password"
        outlined
        :value="password"
        type="password"
        hide-details
        @input="onChangeField({field: 'password', value: $event})"
      />
    </div>
    <div class="b-login-form__footer">
      <v-btn
        color="primary"
        x-large
        type="submit"
        block
        class="b-login-form__action"
        :disabled="!isCanSubmit || loading"
      >Login</v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import {
  Component, Vue, Emit, Prop,
} from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop({ type: String, required: true }) private login!: string;

  @Prop({ type: String, required: true }) private password!: string;

  @Prop({ type: Boolean, required: true }) private isCanSubmit!: boolean;

  @Prop({ type: Boolean, default: false }) private loading!: boolean;

  @Emit('change-field')
  onChangeField(data: {field: string; value: string}) {
    return data;
  }

  @Emit('submit')
  onSubmit() {
    //
  }
}
</script>

<style>
.b-login-form {
  padding: 59px 56px 40px;
}

.b-login-form__title {
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  margin-bottom: 19px;
}

.b-login-form__subtitle {
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  margin-bottom: 15px;
  color: rgba(0, 0, 0, 0.54);
}

.b-login-form__control {
  margin-bottom: 22px;
}

.b-login-form__footer {
  margin-top: 35px;
}

.b-login-form__action {
  text-transform: uppercase;
}
</style>
