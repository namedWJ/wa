<template>
    <div>
        <!-- 标签模块 -->
        <div class="tag-show">
            <p class="title">标签</p>
            <div class="block">
                <w-tag type="success">潜力</w-tag>
                <w-tag type="warning">待培训</w-tag>
                <w-tag type="danger">待转化</w-tag>
                <w-tag type="events">促活中</w-tag>
            </div>
        </div>
        <!-- 应用于协议之前的打勾 -->
        <div class="tag-show">
            <p class="title">radio</p>
            <div class="block">
                <w-simple-radio v-model="radioVal" label="1" @click="setRadioVal()"></w-simple-radio>
                <w-simple-radio v-model="radioVal" label="2" @click="setRadioVal()"></w-simple-radio>
                <w-simple-radio v-model="singleRadioVal" @click="setRadioVal('single')"></w-simple-radio>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            radioVal: '1',
            singleRadioVal: true,
        };
    },
    methods: {
        setRadioVal(type) {
            // eslint-disable-next-line no-console
            !type && console.log(this.radioVal);
            // eslint-disable-next-line no-console
            type && console.log(this.singleRadioVal);
        },
    },
};
</script>
<style lang="less" scoped>
@b: 46.875rem;
body, html {
    font-size: 0;
    background-color: #f2f4f6;
}
.title {
    margin: 12/@b 0;
    padding-left: 24/@b;
    color: #333;
    font-size: 24/@b;
}
.block {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-bottom: 12/@b;
    background-color: #fff;
    &.search-block {
        box-sizing: border-box;
        padding-left: 16/@b;
        justify-content: flex-start;
        width: 726/@b;
        height: 104/@b;
        border-radius: 12/@b;
    }
    .title {
        text-align: center;
    }
    .icon-show {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}
.btn-b {
    button {
        margin: 8/@b;
    }
}
</style>