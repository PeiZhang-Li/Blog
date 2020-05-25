<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="less">
    html, body, #app {
        height: 100%;
    }

    /* 初始化CSS */
    html, body, ul, li, ol, dl, dd, dt, p, h1, h2, h3, h4, h5, h6, form, fieldset, legend, img {
        margin: 0;
        padding: 0;
    }

    fieldset, img {
        border: none;
    }

    img {
        display: block;
    }

    address, caption, cite, code, dfn, th, var {
        font-style: normal;
        font-weight: normal;
    }

    ul, ol {
        list-style: none;
    }

    input {
        padding-top: 0;
        padding-bottom: 0;
        font-family: "SimSun", "宋体";
    }

    input::-moz-focus-inner {
        border: none;
        padding: 0;
    }

    select, input {
        vertical-align: middle;
    }

    select, input, textarea {
        font-size: 12px;
        margin: 0;
    }

    input[type="text"], input[type="password"], textarea {
        outline-style: none;
        -webkit-appearance: none;
    }

    table {
        border-collapse: collapse;
    }

    body {
        color: #333;
        padding: 0;
        font: 12px/20px "SimSun", "宋体", "Arial Narrow", HELVETICA;
        background: #fff; /* overflow-y:scroll;*/
    }

    a {
        color: #666;
        text-decoration: none;
    }

    a:visited {
        color: #666;
    }


    * {
        transition: all 0.2s;
    }
    .main{
        width: 1200px;
        margin: 0 auto;
    }
</style>
