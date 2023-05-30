import React from 'react';
import { useForm } from 'react-hook-form';
import { Container, ErrorText, Form,  HeadText, BackgroundImage, IconInput, Input, InputDiv, Label,  ResetB, SubmitB } from './LoginFormStyle'
import Envelope from '../../Assets/Envelope.svg';
import Password from '../../Assets/Password.svg';
import Loginbackground from '../../Assets/Loginbackground.jpg';
import { BrowserRouter as NavLink, Link, useNavigate } from 'react-router-dom';
function LoginForm() {
  const { handleSubmit, register, formState: { errors } } = useForm({ mode: 'all' });
  const navigate = useNavigate();

  const onSubmit: any = (data: any) => {
    if (data.email == 'yas@gmail.com' && data.password == 'yas@14') {
      navigate('/home');
    }
  }
  return (
    <Container>
      <BackgroundImage src={Loginbackground} />
      <Form>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeadText>Taskify</HeadText>
          <Label>Login to your account</Label>
          <InputDiv>
            <IconInput src={Envelope}></IconInput>
            <Input {...register('email', { required: true, pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Email is wrong' } })} placeholder='Email' />
            {errors.email && errors.email.type === "required" && (<ErrorText >Email is required</ErrorText>)}
            {errors.email && errors.email.type === "pattern" && (<ErrorText data-testid='email-error'>Invalid Email</ErrorText>)}
          </InputDiv>
          <InputDiv>
            <IconInput src={Password}></IconInput>
            <Input {...register('password', {
              required: true, pattern: {
                value: /^[a-zA-Z]+[a-zA-Z0-9]*@[0-9]+$/, message: 'this is invalid password'
              }, minLength: { value: 3, message: 'Minimum length' }, maxLength: { value: 8, message: 'Minimum length' }
            })} type='password' placeholder='Password' />
            {errors.password && errors.password.type === "required" && (<ErrorText>Password is required</ErrorText>)}
            {errors.password && errors.password.type === "pattern" && (<ErrorText>Invalid password</ErrorText>)}
            {errors.password && errors.password.type === "minLength" && (<ErrorText>Password minimum Length is 3</ErrorText>)}
            {errors.password && errors.password.type === "maxLength" && (<ErrorText>Password maximum Length is 8</ErrorText>)}
          </InputDiv>
          <SubmitB type="submit">SignIn</SubmitB>
          <ResetB type="reset">Reset</ResetB>
        </form>
      </Form>

    </Container>
  )
}
export default LoginForm
