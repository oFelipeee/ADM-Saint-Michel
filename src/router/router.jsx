// router.jsx
import { createBrowserRouter } from 'react-router-dom';

import Login from '../Pages/Login/LoginAdm'
import Cadastro from '../Pages/Cadastro/CadastroAdmin'
import ErroPage from '../components/PaginaDeErro/ErrorPage.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErroPage />,
        children: [
            { path: "/", element: <Login /> },
            { path: "/login", element: <Login /> },
            { path: "/cadastro", element: <Cadastro /> },
        ]
    }
]);

export default router;
