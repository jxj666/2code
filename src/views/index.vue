<style scoped lang="less">
.index {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    background: rgba(250, 250, 250, 0.1);
    h1 {
        height: 100px;
        img {
            height: 100%;
        }
    }
    h2 {
        font-size: 30px;
        line-height: 60px;
        margin: 100px auto;
        p {
            color: #2d8cf0;
            margin: 0 0 50px;
        }
    }
    .ivu-row-flex {
        height: 100%;
    }
}
</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
            <Col span="24">
            <h1>
                    <img src="../images/cj.png">
                </h1>
            <h2>
                    <p >欢迎登录二维码管理系统 ! </p>
                </h2>
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="user">
                    <Input type="text" v-model="formInline.user" placeholder="用户">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="密码">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
                </FormItem>
            </Form>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: '请输入用户', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码输入不正确', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        }
    }
}
</script>