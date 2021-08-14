<template>
    <div class="w-50 m-auto">
        <div class="card card-body">
            <form>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" name="email" class="form-control" placeholder="Enter your email"
                        v-model="email" :class="[{'is-invalid': errorFor('email')}]" />
                    <validation-error :errors="errorFor('email')"></validation-error>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" class="form-control" placeholder="Enter your password"
                        v-model="password" :class="[{'is-invalid': errorFor('password')}]" />
                    <validation-error :errors="errorFor('password')"></validation-error>
                </div>

                <button type="submit" class="btn btn-primary btn-lg btn-block" @click.prevent="login" :disabled="loading">Login</button>
                <hr />

                <div>
                    No account yet?
                    <router-link :to="{name: 'register'}" class="font-weight-bold">Register</router-link>
                </div>
                <div>
                    Forgotten password?
                    <router-link :to="{name: 'home'}" class="font-weight-bold">Reset password</router-link>
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
            email:null,
            password:null,
            loading:false
        }
    },
    methods:{
        async login(){
            this.loading = true;
            this.errors = null;

            try {
                await axios.get("/sanctum/csrf-cookie");
                await axios.post("/login", {
                    email: this.email,
                    password: this.password
                });

                logIn();
                this.$store.dispatch("loadUser");
                this.$router.push({ name: 'home' });

            } catch (error){
                this.errors = error.response && error.response.data.errors;
            }

            this.loading = false;
        }
    }
}
</script>
