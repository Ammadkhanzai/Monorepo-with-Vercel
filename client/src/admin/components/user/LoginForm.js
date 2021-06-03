import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from "react-bootstrap/esm/Button";
import * as Yup from "yup";
import axios from 'axios';
import {useState } from 'react';
import { useHistory  } from 'react-router-dom';
import { setUserSession } from '../../../utils/common';

const LoginSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, 'Password length must be 8 character long')
        .max(20, 'Password length must be 8 - 20 character long')
        .required('Password is Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is Required'),
});


const LoginForm = () => {
    
    let history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // handle button click of login form
    const handleLogin = (value) => {
        
      setError(null);
      setLoading(true);
      axios.post('/api/login',value)
      .then(response => {
        setLoading(false);
        setUserSession(response.data.Token, response.data.user);
        history.push('/admin/dashboard');
        
      }).catch(error => {
        setLoading(false);
        if (error.response.status === 400 ) setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
    }

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={async values => {
                await handleLogin(values)
            }}
        >
            {({ errors, touched }) => (

                <Form>
                    <h3>Sign In</h3>
                    <div className="form-group">
                        <label className="p-1" htmlFor="email">Email</label>
                        <Field className="form-control" name="email" type="email"  />
                        <span className="form-err"><ErrorMessage name="email" /></span>
                    </div>
                    <div className="form-group mt-2">
                        <label className="p-1" htmlFor="password">Password</label>
                        <Field className="form-control" name="password" />
                        <span className="form-err"><ErrorMessage name="password" /></span>
                    </div>
                    {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                    <Button className="mt-2" type="submit"  disabled={loading}  >{loading ? 'Loading...' : 'Submit'}</Button>
                    
                </Form>
            )}
        </Formik>
    );
}

export default LoginForm;

