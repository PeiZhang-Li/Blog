<template>
    <div>
        <img :src="url" alt="">
    </div>
</template>

<script>
    import Error from '../../static/img/Error.jpg'
    export default {
        name: "Error",
        data(){
            return{
                url:Error
            }
        }
    }
</script>

<style scoped>
    img{
        width: 1200px;
        text-align: center;
        margin: 0 auto;
    }
</style>
