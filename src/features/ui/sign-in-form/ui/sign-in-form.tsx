import { Controller, FormProvider, useForm } from 'react-hook-form'

import { loginFormValuesType, loginSchema } from '@/features'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { login } from '@/redux'
import { Input } from '@/shared'
import { stylesAddItemForm, stylesBtnTask } from '@/styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, FormControlLabel, FormGroup, ThemeProvider } from '@mui/material'

import s from './sign-in-form.module.scss'

export const SignInForm = () => {
  const dispatch = useAppDispatch()
  const captchaUrl = useAppSelector(state => state.auth.captchaUrl)
  const methods = useForm<loginFormValuesType>({
    defaultValues: {
      captcha: '',
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema()),
  })

  const onHandleSubmit = async (data: loginFormValuesType) => {
    await dispatch(login(data))
      .unwrap()
      .then(res => res.userId)
      .catch(err => console.log(err))
  }

  return (
    <FormProvider {...methods}>
      <form className={s.form} onSubmit={methods.handleSubmit(onHandleSubmit)}>
        <FormGroup defaultValue={''}>
          <div className={s.textField}>
            <ThemeProvider theme={stylesAddItemForm}>
              <Controller
                control={methods.control}
                name={'email'}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    errorInput={error?.message}
                    label={'Email'}
                    placeholder={'Write your email'}
                    type={'text'}
                    {...field}
                  />
                )}
              />
            </ThemeProvider>
          </div>
          <div className={s.textField}>
            <ThemeProvider theme={stylesAddItemForm}>
              <Controller
                control={methods.control}
                name={'password'}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    errorInput={error?.message}
                    label={'Password'}
                    placeholder={'Write your password'}
                    type={'text'}
                    {...field}
                  />
                )}
              />
            </ThemeProvider>
          </div>
          {captchaUrl && (
            <div>
              <img alt={'captcha'} src={captchaUrl} />
              <div className={s.textField}>
                <ThemeProvider theme={stylesAddItemForm}>
                  <Controller
                    control={methods.control}
                    name={'captcha'}
                    render={({ field, fieldState: { error } }) => (
                      <Input
                        errorInput={error?.message}
                        placeholder={'Write symbols'}
                        type={'text'}
                        {...field}
                      />
                    )}
                  />
                </ThemeProvider>
              </div>
            </div>
          )}
          <div className={s.formCheckbox}>
            <Controller
              control={methods.control}
              name={'rememberMe'}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox required={false} {...field} />}
                  label={'Remember Me'}
                />
              )}
            />
          </div>
        </FormGroup>
        <div className={s.formBtn}>
          <ThemeProvider theme={stylesBtnTask}>
            <Button fullWidth type={'submit'} variant={'contained'}>
              Login
            </Button>
          </ThemeProvider>
        </div>
      </form>
    </FormProvider>
  )
}
