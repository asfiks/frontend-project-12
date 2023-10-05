import image from '../components/forLogin.png';
import { useContext, useState} from 'react';
import * as formik from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../contexts/AuthContext';
import {Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';

export const Signup = () => {

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(4, '"Имя пользователя" минимум 4 символа')
            .required('Поле "Ваш ник" обязательно для заполнения'),
        password: Yup.string()
            .required('Поле "Пароль" обязательно для заполнения')
            .min(4, 'Пароль должен содержать минимум 4 символа'),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
            .required('Поле "Подтверждение пароля" обязательно для заполнения')
      });

    const handleSubmit = (values) => {
        
        console.log(values)
    }

    return (        

        <div className="vh-100" id="chat">
            <div className="d-flex flex-column vh-100">
                <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                    <div className="container">
                        <a className="navbar-brand" href="/">Project Chat</a>
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
                                                <h1 className="text-center mb-4">Регистрация</h1>
                                                <Form.Group className="mb-3" controlId="username">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Имя пользователя"
                                                            name="username"
                                                            value={values.username}
                                                            onChange={handleChange}
                                                            isInvalid={touched.username && !!errors.username}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.username}
                                                        </Form.Control.Feedback>
                                                    
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="password">
                                                    <Form.Control 
                                                        type="password" 
                                                        placeholder="Пароль"
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
                                                        placeholder="Пароль"
                                                        name="passwordConfirm"
                                                        value={values.passwordConfirm}
                                                        onChange={handleChange}
                                                        isInvalid={touched.passwordConfirm && !!errors.passwordConfirm}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.passwordConfirm}
                                                    </Form.Control.Feedback>                                                    
                                                </Form.Group>
                                                <Button variant="primary" className="w-100" type="submit">
                                                    Зарегистрироваться
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