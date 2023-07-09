import image from '../components/forLogin.png';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const getToken = async (user) => {
    try {
      const response = await axios.post('/api/v1/login', user );
      return response.data.token;
    } catch (error) {
      console.error('Ошибка при получении токена:', error);
      return false;
    }
}

export const SignUp = () => {
    let errorMessage = null;
    const validationSchema = Yup.object({
        username: Yup.string().required('Поле "Ваш ник" обязательно для заполнения'),
        password: Yup.string().required('Поле "Пароль" обязательно для заполнения')
      });
    
    const handleSubmit = async (values) => {
        const token = await getToken(values);
        if (token) {
            localStorage.setItem('token', token);
            return <Navigate to="/" />;
        } else {
            errorMessage = 'Неверные учетные данные';
            console.log(errorMessage)
        }
    };
    
    return (        
            <div className="vh-100 w-100">
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
                                            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                                                <img src={image} className="rounded-circle" alt="Войти" />
                                            </div>
                                            <Formik
                                                initialValues={{ username: '', password: '' }}
                                                validationSchema={validationSchema}
                                                onSubmit={handleSubmit}
                                            >
                                                {({ errors, touched }) => (
                                                    <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                                                    <h1 className="text-center mb-4">Войти</h1>
                                                    <div className="form-floating mb-3">
                                                        <Field
                                                        type="text"
                                                        id="username"
                                                        name="username"
                                                        placeholder="Ваш ник"
                                                        className={`form-control ${errors.username && touched.username ? 'is-invalid' : null}`}
                                                        />
                                                        <label htmlFor="username">Ваш ник</label>
                                                        {errors.username && touched.username ? <div className="invalid-tooltip">{errors.username}</div> : null}
                                                        
                                                    </div>
                                                    <div className="form-floating mb-4">
                                                        <Field
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        placeholder="Пароль"
                                                        className={`form-control ${errors.password && touched.password || errorMessage ? 'is-invalid' : null}`}
                                                        />
                                                        <label className="form-label" htmlFor="password">Пароль</label>
                                                        {errors.password && touched.password ? <div className="invalid-tooltip">{errors.password}</div> : null}
                                                        {errorMessage ? <div className="invalid-tooltip">{errorMessage} </div> : null } 
                                                    </div>
                                                    <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
                                                        Войти
                                                    </button>
                                                    </Form>
                                                )}
                                            </Formik>
                                    </div>
                                    <div className="card-footer p-4">
                                        <div className="text-center">
                                            <span>Нет аккаунта? </span>
                                            <a href="/signup">Регистрация</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Toastify"> </div>
                </div>
            </div>

    );
};