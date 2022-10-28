import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/auth/UserContext";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/Auth";
import { Loader } from "./components/Loader";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CreateEvent = lazy(() => import("./pages/Events/createEvent"));
const EditEvent = lazy(() => import("./pages/Events/editEvent"));

function App() {
  return (
    <UserProvider>
      <Layout>
        <Suspense fallback={<Loader size="44px" color="var(--on-primary)" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/create" element={<CreateEvent />} />
              <Route path="/dashboard/edit/:id" element={<EditEvent />} />
            </Route>

            <Route path="*" element={<h1>Not Found Page</h1>} />
          </Routes>
        </Suspense>
      </Layout>
    </UserProvider>
  );
}

export default App;
