import image from '../components/forLogin.png';
import { useContext, useState} from 'react';
import * as formik from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../contexts/AuthContext';
import {Button, Modal, Form, InputGroup, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import axios from 'axios';
import api from '../routes/api';
import { useNavigate  } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Signup = () => {
    const { t } = useTranslation();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const validationSchema = Yup.object({
        username: Yup.string()
            .min(3, t('signup.validation.usernameMinMax'))
            .max(20, t('signup.validation.usernameMinMax'))
            .required(t('signup.validation.username')),
        password: Yup.string()
            .min(6, t('signup.validation.passwordMin'))
            .required(t('signup.validation.password')),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password'), null], t('signup.validation.passConfirm'))
            .required(t('signup.validation.password'))
      });

    const handleSubmit = async (values) => {
        try {
            await axios.post(api.signupPath(), values);
            await login(values);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setError(t('signup.validation.usernameIsHas'));
            } else {
              console.error(error);
            }
        }
    }

    return (        

        <div className="vh-100" id="chat">
            <div className="d-flex flex-column vh-100">
                <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                    <div className="container">
                        <a className="navbar-brand" href="/">{t('chat')}</a>
                    </div>
                </nav>
                <div className="container vh-100">
                    <div className="row justify-content-center align-content-center vh-100">
                        <div className="col-12 col-md-8 col-xxl-6">
                            <div className="card shadow-sm">
                                <div className="card-body row p-5">
                                    <Formik
                                        validationSchema={validationSchema}
                                        onSubmit={handleSubmit}
                                        initialValues={{
                                            username: '',
                                            password: '',
                                            passwordConfirm: '',
                                        }}
                                    >
                                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                                            <Form className="w-100" noValidate onSubmit={handleSubmit}>
                                                <h1 className="text-center mb-4">{t('signup.registration')}</h1>
                                                <Form.Group className="mb-3" controlId="username">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder={t('signup.username')}
                                                            name="username"
                                                            value={values.username}
                                                            onChange={handleChange}
                                                            autoFocus
                                                            isInvalid={touched.username && !!errors.username}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.username}
                                                        </Form.Control.Feedback>
                                                    
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="password">
                                                    <Form.Control 
                                                        type="password" 
                                                        placeholder={t('signup.password')}
                                                        name="password"
                                                        value={values.password}
                                                        onChange={handleChange}
                                                        isInvalid={touched.password && !!errors.password}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.password}
                                                    </Form.Control.Feedback>                                                    
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="passwordConfirm">
                                                    <Form.Control 
                                                        type="password" 
                                                        placeholder={t('signup.passConfirm')}
                                                        name="passwordConfirm"
                                                        value={values.passwordConfirm}
                                                        onChange={handleChange}
                                                        isInvalid={touched.passwordConfirm && !!errors.passwordConfirm}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.passwordConfirm}
                                                    </Form.Control.Feedback>                                                    
                                                </Form.Group>
                                                {error && <Alert variant='danger'>{error}</Alert>}
                                                <Button variant="primary" className="w-100" type="submit">
                                                {t('signup.signup')}
                                                </Button>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Toastify"> </div>
        </div>
    );
};