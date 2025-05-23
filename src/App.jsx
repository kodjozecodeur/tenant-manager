import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Dashboard/Home";
import Properties from "./pages/Dashboard/Properties";
import Tenants from "./pages/Dashboard/Tenants";
import Payments from "./pages/Dashboard/Payments";
import Settings from "./pages/Dashboard/Settings";
import Profile from "./pages/Dashboard/Profile";
import Notifications from "./pages/Dashboard/Notifications";
import Maintenance from "./pages/Dashboard/Maintenance";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/leases" element={<Tenants />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

//check if token exist, root fonction
const Root = () => {
  const token = localStorage.getItem("token");
  return <Navigate to={token ? "/dashboard" : "/login"} replace />;
};
