/*
 * @Author: Austin.Wang 
 * @Date: 2019-10-14 14:29:52 
 * @Last Modified by: Austin.Wang
 * @Last Modified time: 2019-10-18 10:54:17
 */
<template>
    <div>
        <span class="w-tag" :class="getClass()">
            <slot></slot>
        </span>
    </div>
</template>

<script>
export default {
    name: 'wTag',
    props: ['type'],
    methods: {
        getClass() {
            return `w-tag-${this.type}` || 'w-tag-success';
        },
    },
};
</script>
<style lang="less" scoped>
@import url('../less/common.less');
.w-tag {
    padding: 6/@w;
    border-radius: 4/@w;
    font-size: 18/@w;
}
.w-tag-success {
    background: rgba(52, 196, 126, .1);
    color: #1BCA75;
}
.w-tag-warning {
    background: rgba(254, 181, 9, .1);
    color: #D79700;
}
.w-tag-danger {
    background: rgba(255, 100, 36, .1);
    color: #FF6424;
}
.w-tag-events {
    background: rgba(160, 69, 224, .1);
    color: #A045E0;
}
</style>
