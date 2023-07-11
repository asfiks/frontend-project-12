import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { SignUp } from '../pages/SignUp';
import { NotFoundPage } from '../pages/NotFoundPage';
import { Test } from '../pages/Test';



const App = () => {
  const token = localStorage.getItem('token')
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Test /> : <SignUp />} />
        <Route path="login" element={token ? <Test /> : <SignUp />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
