import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/auth/UserContext";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/Auth";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <UserProvider>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route path="*" element={<h1>Not Found Page</h1>} />
          </Routes>
        </Suspense>
      </Layout>
    </UserProvider>
  );
}

export default App;
