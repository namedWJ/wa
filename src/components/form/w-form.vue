<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import Emitter from '@/mixins/emitter.js';

export default {
    name: 'wForm',
    mixins: [ Emitter ],
    provide() {
        return {
            form: this,
        };
    },
    props: {
        model: {
            type: Object,
        },
        rules: {
            type: [Object, Array],
        },
    },
    data() {
        return {
            fields: [],
        };
    },
    created() {
        this.$on('on-form-item-add', (field) => {
            field && this.fields.push(field); // 预存所有item的实例，用于一次校验全部item
        })
        this.$on('on-form-item-remove', (field) => {
            field.prop && this.fields.splice(this.fields.indexOf(field), 1);
        })
    },
    methods: {
        // 公开方法：全部重置数据
        resetFields() {
            this.fields.forEach((field) => {
                field.resetField();
            });
        },
        // 一次校验
        validate(cb) {
            return new Promise((resolve) => {
                let valid = true;
                let count = 0;
                const len = this.fields.length;
                this.fields.forEach((field) => {
                    field.validate('', (msg) => {
                        if (msg) {
                            valid = false;
                        }
                        // all done
                        if (++count === len) {
                            resolve(valid);
                            typeof cb === 'function' && cb(valid);
                        }
                    })
                });
            })
        },
    },
}
</script>