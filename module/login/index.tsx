import React, { useRef, useState } from 'react'
import style from "./Login.module.scss"
import classNames from 'classnames/bind'
import { Button, Checkbox, Form, Image, Input, Tabs, TabsProps } from 'antd'
import Head from 'next/head'
import {signIn} from "next-auth/react"
import ButtonCustom from '../../components/Button'
import formRules from '../../constant/formRules'



const cx = classNames.bind(style)
function Login() {
    const onChange = (key:string) => {
       
    }
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })
    
    const onHandleLogin = () => {
        const result =  signIn('credentials', {
            username: loginData.username,
            password: loginData.password,
            redirect: true,
            callbackUrl: "/"
        })
    }
    console.log(loginData)
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: (<span className={cx("tab-header")}>Login</span>),
          children: (
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                layout="vertical"
                autoComplete="off"
                className={cx("form")}
            >
                <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
                wrapperCol={{ span: 24 }}
                className={cx("form-label")}
                
                >
                <Input 
                className={cx("form-input")}
                name="username"
                onChange = { (e) => setLoginData((prev) => ({...prev, [e.target.name] : e.target.value}))}
                />
                </Form.Item>

                <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                wrapperCol={{ span: 24 }}
                className={cx("form-label")}
                >
                <Input.Password 
                name="password"
                onChange = { (e) => setLoginData((prev) => ({...prev, [e.target.name] : e.target.value}))}
                className={cx("form-input")}/>
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ span: 24 }} >
                <Checkbox >Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 24 }}>
                <Button className= "btn" htmlType='submit' onClick={onHandleLogin}>login</Button>
                </Form.Item>
            </Form>
          ),
        },
        {
          key: '2',
          label: (<span className={cx("tab-header")}>Signup</span>),
          children:( <Form
            name="basic"
            layout= "vertical"
        
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
        
            initialValues={{ remember: true }}
            
            autoComplete="off"
            className={cx("form")}
        >
            <Form.Item
                label="Email"
                name="email"
                rules={formRules.emailRules}
                className={cx("form-label")}
                wrapperCol={{ span: 24 }}
            >
            <Input className={cx("form-input")}/>
            </Form.Item>
            <br />
            <Form.Item
                label="Phone"
                name="Phone"
                rules={formRules.phoneRules}
                className={cx("form-label")}
                wrapperCol={{ span: 24 }}
            >
            <Input className={cx("form-input")}/>
            </Form.Item>
            <br />
            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                wrapperCol={{ span: 24 }}
                className={cx("form-label")}
                >
                <Input.Password className={cx("form-input")}/>
            </Form.Item>
            <br />
            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                wrapperCol={{ span: 24 }}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                }),
                ]}
            >
                <Input.Password className={cx("form-input")}/>
            </Form.Item>
            

            <Form.Item wrapperCol={{ span: 24 }}>
                <ButtonCustom name= "Signup" htmlType="submit" />
            </Form.Item>
        </Form>),
        }
      ];

    
  return (
    <>
         <Head >
            <title>Fooce | Login - Signup</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/icon.png" />
        </Head>
        <div className={cx('login')}>
            <Image src={require("../../assets/imgs/sign-bg.png").default.src} alt="sign-bg" preview={false} className={cx('login-image')}/>
            <Tabs 
                defaultActiveKey="1" 
                centered = {true}
                onChange={onChange} 
                size="small"
                className={cx("tabs")}
                // style={{ backgroundColor: 'transparent', padding: '16px' }}
                items={items}
            >
               
            </Tabs>
        </div>
    </>
  )
}

export default Login
