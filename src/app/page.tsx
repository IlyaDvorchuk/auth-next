'use client';

import {useState} from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './auth-context';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './page.module.css';

const schema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
}).required();

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();

  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const [enterError, setEnterError] = useState('')

  // Обработка отправки формы
  const onSubmit = (data: FormValues) => {
    if (data.email === 'user@example.com' && data.password === 'password123') {
      setEnterError('')
      login();
      router.push('/dashboard');
    } else {
      setEnterError('эх, эх, эх')
    }
  };

  return (
      <div className={styles.container}>
        <h1 className={styles.heading}>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className={styles.label}>Email:</label>
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <input
                        type="email"
                        className={styles.input}
                        {...field}
                    />
                )}
            />
              <div className={styles.errorWrapper}>
                  {errors.email && <p className={styles.error}>{errors.email.message}</p>}
              </div>
          </div>
          <div>
            <label className={styles.label}>Password:</label>
            <Controller
                name="password"
                control={control}
                render={({ field }) => (
                    <input
                        type="password"
                        className={styles.input}
                        {...field}
                    />
                )}
            />
              <div className={styles.errorWrapper}>
                  {errors.password && <p className={styles.error}>{errors.password.message}</p>}
              </div>
            {enterError && <p className={styles.error}>{enterError}</p>}
          </div>
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
  );
};

export default LoginPage;
