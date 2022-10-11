import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/auth/UserContext";
import { ProtectedRoute } from "./components/Auth";
import { Home } from "./pages/Home";
import "./App.css";
import { Layout } from "./components/Layout";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <UserProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route path="*" element={<h1>Not Found Page</h1>} />
          </Routes>
        </Layout>
      </Suspense>
    </UserProvider>
  );
}

export default App;
