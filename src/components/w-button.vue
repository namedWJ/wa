/*
 * @Author: Austin.Wang 
 * @Date: 2019-12-11 11:34:35 
 * @Last Modified by: Austin.Wang
 * @Last Modified time: 2019-12-11 14:58:14
 */
<template>
    <button :class="[type ? `b-button--${type}`: '', size ? `b-botton--${size}` : '', {'b-strong': strong}]" @click="handleClick">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'normal',
        },
        size: {
            type: String,
            default: '',
        },
        page: Boolean,
        strong: Boolean,
    },
    methods: {
        handleClick(evt) {
            this.$emit('click', evt);
        },
    },
};
</script>

<style lang="less" scoped>
@b: 46.875rem;

.b-button--normal, .b-button--press, .b-button--dim, .b-button--default {
    box-sizing: border-box;
    padding: 0 36/@b;
    height: 72/@b;
    border: 2/@b solid rgba(46, 46, 51, .8);
    border-radius: 36/@b;
    background: transparent;
    font-size: 30/@b;
    color: #3D3D3D;
    text-align: center;
    line-height: 72/@b;
    &.b-botton--small {
        padding: 0 20/@b;
        height: 52/@b;
        line-height: 52/@b;
        border-radius: 26/@b;
        font-size: 26/@b;
    }
    &.b-botton--mini {
        padding: 0 20/@b;
        height: 48/@b;
        line-height: 48/@b;
        border-radius: 24/@b;
        font-size: 24/@b;
    }
}
.b-button--press {
    opacity: .6;
}
.b-button--dim {
    opacity: .4;
}
.b-botton--big {
    min-width: 654/@b;
    height: 88/@b;
    font-size: 32/@b;
    color: #FFFFFF;
    text-align: center;
    line-height: 88/@b;
    border-radius: 44/@b;
    border-color: #FF3355;
    &.b-button--normal,
    &.b-button--press {
        background: #FF3355;
    }
    &.b-button--dim {
        background: #ccc;
        opacity: 1;
        border-color: #ccc;
    }
    &.b-button--default {
        border-color: rgba(46,46,51,0.80);
        color: #2E2E33;
    }
}

.b-strong {
    background: #FF3355;
    color: #fff;
    border-color: #FF3355;
}
</style>