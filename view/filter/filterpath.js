import Vue from 'vue';
const ups=Vue.filter('ups', function (v) {
    return v.replace('\\','/')
});
export default ups;