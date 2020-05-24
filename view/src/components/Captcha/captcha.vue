<template>
    <div class="code" @click="refreshCode">
        <sidentify :identifyCode="identifyCode"/>
    </div>
</template>

<script>
import sidentify from './sidentify'
    export default {
        name: "register",
        components:{sidentify},
        data:()=>{
            return{
                identifyCodes: "1234567890",
                identifyCode: ""
            }
        },
        mounted() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        methods: {
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },
            refreshCode() {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            },
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                        this.randomNum(0, this.identifyCodes.length)
                        ];
                }
                this.$emit('getcaptcha',this.identifyCode);
            }
        }
    }
</script>

<style scoped>

</style>