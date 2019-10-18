/*
 * @Author: Austin.Wang 
 * @Date: 2019-10-18 10:37:28 
 * @Last Modified by: Austin.Wang
 * @Last Modified time: 2019-10-18 10:51:12
 */
<template>
    <div :class="['normal', size]">
        <span class="left-title" v-if="title && right">
            {{title}}
        </span>
        <input
            ref="input"
            type="text"
            :class="['normal-input', right ? 't-right' : '']"
            :style="setStyle"
            :placeholder="placeholder"
            :readonly="readonly"
            :disabled="disabled"
            @input="handleInput"
            @focus="handleFocus"
            @wlur="handleBlur"
            @change="handleChange"
        >
        <i v-if="showClear" class="iconfont" @click="clearInput()">&#xe662;</i>
        <i v-if="right && !showClear" class="iconfont">&#xe617;</i>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
        value: [String, Number],
        readonly: Boolean,
        disabled: Boolean,
        clearable: Boolean,
        placeholder: String,
        size: String,
        right: Boolean,
        width: [String, Number],
    },
    computed: {
        nativeInputValue() {
            return this.value === null || this.value === undefined ? '' : String(this.value);
        },
        showClear() {
            return (this.clearable || this.right) &&
            !this.disabled &&
            !this.readonly &&
            this.nativeInputValue &&
            this.focused;
        },
    },
    watch: {
        nativeInputValue() {
            this.setNativeInputValue();
        },
    },
    data() {
        return {
            focused: false,
        };
    },
    methods: {
        setStyle() {
            return this.width ? {
                width: `${+this.width / 46.875}rem`,
            } : {};
        },
        setNativeInputValue() {
            const input = this.$refs.input;
            if (!input || (input.value === this.nativeInputValue)) {
                return;
            }
            input.value = this.nativeInputValue;
        },
        handleInput(evt) {
            if (event.target.value === this.nativeInputValue) {
                return;
            }
            this.$emit('input', evt.target.value);
        },
        handleFocus(evt) {
            this.focused = true;
            this.$emit('focus', evt);
        },
        handleBlur(evt) {
            this.focused = false;
            this.$emit('blur', evt);
        },
        handleChange(evt) {
            this.$emit('change', evt.target.value);
        },
        clearInput() {
            this.$emit('input', '');
            this.$emit('change', '');
            this.$emit('clear');
        },
    },
};
</script>
<style lang="less" scoped>
@import url('../less/common.less');
.normal {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 78/@w;
    background-color: transparent;
    padding: 24/@w 40/@w;
    .left-title {
        font-size: 24/@w;
        color: #4D4D4D;
    }
    .normal-input {
        font-size: 24/@w;
        color: #4D4D4D;
        &.t-right {
            position: absolute;
            right: 58/@w;
            text-align: right;
        }
        &::-webkit-input-placeholder {
            color: #D4D4D4;
        }
    }
    &.big {
        height: 88/@w;
        padding: 21/@w 24/@w;
        .normal-input {
            font-size: 32/@w;
        }
    }
}

.iconfont {
    position: absolute;
    padding: 16/@w;
    display: block;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    font-size: 26/@w;
    color: #B9B9B9;
}
</style>