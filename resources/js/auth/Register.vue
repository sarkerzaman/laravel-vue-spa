<template>
    <div class="w-50 m-auto">
        <div class="card card-body">
            <form>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" name="name" class="form-control" placeholder="Enter your name"
                        v-model="user.name" :class="[{'is-invalid': errorFor('name')}]" />
                    <validation-error :errors="errorFor('name')"></validation-error>
                </div>
                <div class="form-group">
                    <label for="email">E-mail</label>
                    <input type="text" name="email" class="form-control" placeholder="Enter your email"
                        v-model="user.email" :class="[{'is-invalid': errorFor('email')}]" />
                    <validation-error :errors="errorFor('email')"></validation-error>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" class="form-control" placeholder="Enter your password"
                        v-model="user.password" :class="[{'is-invalid': errorFor('password')}]" />
                    <validation-error :errors="errorFor('password')"></validation-error>
                </div>
                <div class="form-group">
                    <label for="password_confirmation">Re-type Password</label>
                    <input type="password" name="password_confirmation" class="form-control" placeholder="Confirm your password"
                        v-model="user.password_confirmation" :class="[{'is-invalid': errorFor('password_confirmation')}]" />
                    <validation-error :errors="errorFor('password_confirmation')"></validation-error>
                </div>

                <button type="submit" class="btn btn-primary btn-lg btn-block" @click.prevent="register" :disabled="loading">Register</button>
                <hr />

                <div>
                    Already have an account?
                    <router-link :to="{name: 'login'}" class="font-weight-bold">Login</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import validationErrors from '../shared/mixins/validationErrors';
import {logIn} from '../shared/utils/auth';

export default {
    mixins: [validationErrors],
    data(){
        return {
            user: {
                name: null,
                email: null,
                password: null,
                password_confirmation: null
            },
            loading:false
        }
    },
    methods:{
        async register(){
            this.loading = true;
            this.errors = null;

            try {
                const response = await axios.post("/register", this.user);

                if(response.status == 201){
                    logIn();
                    this.$store.dispatch("loadUser");
                    this.$router.push({ name: 'home' });
                }

            } catch (error){
                this.errors = error.response && error.response.data.errors;
            }

            this.loading = false;
        }
    }
}
</script>
