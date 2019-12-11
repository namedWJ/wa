<template>
    <div>
        <h3>具有数据校验功能的表单组件——Form</h3>
        <w-form ref="form" :model="formValidate" :rules="ruleValidate">
            <w-form-item label="username" prop="username">
                <w-input v-model="formValidate.username" placeholder="please input username"></w-input>
            </w-form-item>
        </w-form>
        <w-button @click="submit">submit</w-button>
        <w-button @click="reset">reset</w-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formValidate: {
                username: '',
            },
            ruleValidate: {
                username: [
                    { required: true, message: 'username cant be empty', trigger: 'blur' },
                ]
            },
        };
    },
    methods: {
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    alert('提交成功');
                } else {
                    alert('表单校验失败');
                }
            })
        },
        reset() {
            this.$refs.form.resetFields();
        },
    },
}
</script>