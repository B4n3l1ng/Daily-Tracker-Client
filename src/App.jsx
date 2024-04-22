import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import AuthenticatedBouncer from './components/AuthenticatedBouncer';
import DailiesPage from './pages/DailiesPage';
import StashPage from './pages/StashPage';
import ItemDetails from './pages/ItemDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <AuthenticatedBouncer>
              <HomePage />
            </AuthenticatedBouncer>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/stash"
          element={
            <PrivateRoute>
              <StashPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/stash/:id"
          element={
            <PrivateRoute>
              <ItemDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/character/:characterId"
          element={
            <PrivateRoute>
              <DailiesPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
