import { Controller, FormProvider, useForm } from 'react-hook-form'

import { Input, stylesAddItemForm, stylesBtnTask } from '@/components'
import { useAppDispatch } from '@/hooks'
import { login } from '@/redux/slices/auth-slice/auth-slice'
import { loginFormValuesType, loginSchema } from '@/widgets'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, FormControlLabel, FormGroup, ThemeProvider } from '@mui/material'

import s from './sign-in-form.module.scss'

export const SignInForm = () => {
  const dispatch = useAppDispatch()
  const methods = useForm<loginFormValuesType>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    resolver: zodResolver(loginSchema()),
  })

  const onHandleSubmit = (data: loginFormValuesType) => {
    dispatch(login(data))
      .unwrap()
      .then(res => console.log(res.data.userId))
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
