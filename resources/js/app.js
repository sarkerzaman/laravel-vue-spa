
require('./bootstrap');

import moment from "moment";
//import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from 'vuex'
import Index from "./index";
import router from "./routes";
import StarRating from "./shared/components/StarRating";
import Success from "./shared/components/Success";
import FatalError from "./shared/components/FatalError";
import ValidationErrors from "./shared/components/ValidationErrors";
import storeDefinition from "./store";

window.Vue = require('vue');
Vue.use(VueRouter);
Vue.use(Vuex);

Vue.filter("fromNow", value => moment(value).fromNow());

Vue.component("star-rating", StarRating);
Vue.component("success", Success);
Vue.component("fatal-error", FatalError);
Vue.component("validation-error", ValidationErrors);

const store = new Vuex.Store(storeDefinition);

window.axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if(error.response.status == 401){
            store.dispatch("logout");
        }

        return Promise.reject(error);
    }
);

const app = new Vue({
    el: '#app',
    router,
    store,
    components:{
        "index": Index
    },
    async beforeCreate() {
        this.$store.dispatch("loadStoredState");
        this.$store.dispatch("loadUser");
    }
});
