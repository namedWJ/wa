/*
 * @Author: Austin.Wang 
 * @Date: 2019-10-17 19:37:36 
 * @Last Modified by: Austin.Wang
 * @Last Modified time: 2019-10-17 19:53:29
 */
<template>
    <div>
        <span class="option-btn" :class="{'selected-option': label ? label === value : value}" @click="handlerClick">&nbsp;</span>
    </div>
</template>

<script>
export default {
    props: {
        value: [String, Number, Boolean],
        label: [String, Number, Boolean],
    },
    mounted() {
        if (this.label && (typeof this.value !== typeof this.label)) {
            // eslint-disable-next-line no-console
            console.warn('warning：绑定的值和label类型不同');
        }
    },
    methods: {
        handlerClick() {
            this.$emit('input', this.label ? this.label : !this.value);
            this.$emit('click', this.label ? this.label : !this.value);
        },
    },
};
</script>

<style lang="less" scoped>
@choosed: url('../assets/radio_img/choosed.png');
@unchoosed: url('../assets/radio_img/unchoosed.png');
@w: 46.875rem;
.option-btn {
    position: relative;
    float: right;
    background: @choosed no-repeat;
    background-size: contain;
    height: 44/@w;
    width: 44/@w;
    &::after {
        content: '';
        position: absolute;
        top: -24/@w;
        left: -24/@w;
        width: 90/@w;
        height: 90/@w;
    }
    &.selected-option {
        background: @unchoosed no-repeat;
        background-size: contain;
    }
}
</style>