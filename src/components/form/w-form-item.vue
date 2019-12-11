<template>
    <div>
        <div>
            <label v-if="label" :class="{'i-form-item-required': isRequired}">{{ label }}</label>
        </div>
        <div>
            <slot></slot>
            <div v-if="validateState === 'error'" class="i-form-item-message">{{ validateMessage }}</div>
        </div>
    </div>
</template>

<script>
import Emitter from '@/mixins/emitter.js';
import AsyncValidator from'async-validator';

export default {
    name: 'wFormItem',
    mixins: [ Emitter ],
    inject: ['form'], // 获取父级的model参数值，用于校验
    props: {
        label: {
            type: String,
            default: '',
        },
        prop: {
            type: String, // e.g.username
        },
    },
    computed: {
        // 从父级获取绑定的表单里对应的正在校验的key的value，ps：也就意味着单项的prop的值要和绑定的对象里的key对应上
        fieldValue() {
            return this.form.model[this.prop];
        },
    },
    data() {
        return {
            validateState: '', // 校验状态
            validateMessage: '', // 校验不通过的信息提示
            isRequired: false, // 是否必填项
            initialValue: {}, // 记录初始化值，用于重置
        };
    },
    mounted() {
        // 如果没有传入 prop，则无需校验，也就无需缓存
        if (this.prop) {
            // 向外传递子对象
            this.dispatch('wForm', 'on-form-item-add', this);
            // 设置初始值，以便在重置时恢复默认值
            this.initialValue = this.fieldValue;
            this.setRules();
        }
    },
    methods: {
        // 获取单项的校验规则
        getRules() {
            let formRules = this.form.rules;
            return [].concat(formRules ? formRules[this.prop] : []);
        },
        // 过滤获取要处理的事件类型
        getFilteredRule(trigger) {
            const rules = this.getRules(); // [{type: '', require: '', message: '', trigger: ''}]
            return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) > -1);
        },
        // 监听组件返回的事件
        setRules() {
            const rules = this.getRules();
            rules.forEach((e) => {
                // 如果当前校验规则中有必填项，则标记出来
                this.isRequired = e.required || false;
            })
            this.$on('on-form-blur', this.onFieldBlur);
            this.$on('on-form-change', this.onFieldChange);
        },
        onFieldBlur() {
            this.validate('blur');
        },
        onFieldChange() {
            this.validate('change');
        },
        // 重置数据
        resetField () {
            this.validateState = '';
            this.validateMessage = '';

            this.form.model[this.prop] = this.initialValue; // 重置单个数据
        },
        /**
         * 校验数据
         * @param trigger 校验类型
         * @param callback 回调函数
         */
        validate(trigger, cb = () => {}) {
            let rules = this.getFilteredRule(trigger);
            if (!rules || rules.length === 0) {
                return true;
            }
            // 先把状态设置成校验中
            this.validateState = 'validating';
            // async-validator的使用
            let desc = {};
            desc[this.prop] = rules; // e.g. {username: {require: true, trigger: 'blur', message: 'user cant be empty'}}

            const validator = new AsyncValidator(desc);

            let model = {};
            model[this.prop] = this.fieldValue; // e.g. {username: 'xxx'}

            validator.validate(model, { firstFields: true }, errors => {
                this.validateState = !errors ? 'success' : 'error'; // 设置校验状态
                this.validateMessage = errors ? errors[0].message : ''; // 设置校验结果的信息

                cb(this.validateMessage);
            });

        }
    },
    // 组件销毁前，将实例从 Form 的缓存中移除
    beforeDestroy () {
        this.dispatch('wForm', 'on-form-item-remove', this);
    }
}
</script>

<style lang="less" scoped>
.i-form-item-required:before {
    content: '*';
    color: red;
}
.i-form-item-message {
    color: red;
}
</style>