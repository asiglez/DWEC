import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "../../components/Ejercicio4/AppLayout";
import InicioPage from "../../pages/Ejercicio4/InicioPage";
import MantenimientoPage from "../../pages/Ejercicio4/MantenimientoPage";
import PropiedadesPage from "../../pages/Ejercicio4/PropiedadesPage";
import LoginPage from "../../pages/Ejercicio4/LoginPage";
import ErrorPage from "../../pages/Ejercicio4/ErrorPage";
function AppEnrutador() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<InicioPage />} />
            <Route path="mantenimiento" element={<MantenimientoPage />} />
            <Route path="propiedades" element={<PropiedadesPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppEnrutador;