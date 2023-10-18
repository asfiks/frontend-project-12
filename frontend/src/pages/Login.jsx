import image from '../components/forLogin.png';
import { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

export const Login = () => {
    const { t } = useTranslation();
    const { errorAuth, login } = useContext(AuthContext);

    const validationSchema = Yup.object({
        username: Yup.string()
            .required(t('login.validation.name')),
        password: Yup.string()
            .required(t('login.validation.password'))
      });

    const handleSubmit = async (values) => {
        await login(values)
    };
    return (        
            <div className="vh-100 w-100">
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
                                            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                                                <img src={image} className="rounded-circle" alt={t('login.enter')}/>
                                            </div>
                                            <Formik
                                                initialValues={{ username: '', password: '' }}
                                                validationSchema={validationSchema}
                                                onSubmit={handleSubmit}
                                            >
                                                {({ errors, touched }) => (
                                                    <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                                                    <h1 className="text-center mb-4">{t('login.enter')}</h1>
                                                    <div className="form-floating mb-3">
                                                        <Field
                                                        type="text"
                                                        id="username"
                                                        name="username"
                                                        placeholder={t('login.name')}
                                                        autoFocus
                                                        className={`form-control ${errors.username && touched.username ? 'is-invalid' : null}`}
                                                        />
                                                        <label htmlFor="username">{t('login.name')}</label>
                                                        {errors.username && touched.username ? <div className="invalid-tooltip">{errors.username}</div> : null}
                                                        
                                                    </div>
                                                    <div className="form-floating mb-4">
                                                        <Field
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        placeholder={t('login.password')}
                                                        className={`form-control ${(errors.password && touched.password) || errorAuth ? 'is-invalid' : null}`}
                                                        />
                                                        <label className="form-label" htmlFor="password">{t('login.password')}</label>
                                                        {errors.password && touched.password ? <div className="invalid-tooltip">{errors.password}</div> : null}
                                                        {errorAuth ? <div className="invalid-tooltip">{t('login.validation.errorAuth')}</div> : null } 
                                                    </div>
                                                    <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
                                                        {t('login.enter')}
                                                    </button>
                                                    </Form>
                                                )}
                                            </Formik>
                                    </div>
                                    <div className="card-footer p-4">
                                        <div className="text-center">
                                            <span>{t('login.noAcc')}</span>
                                            <a href="/signup">{t('login.signup')}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>

    );
};