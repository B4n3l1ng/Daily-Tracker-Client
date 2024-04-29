import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import AuthenticatedBouncer from './components/AuthenticatedBouncer';
import DailiesPage from './pages/DailiesPage';
import StashPage from './pages/StashPage';
import ItemDetails from './pages/ItemDetails';
import IsAdmin from './components/isAdmin';
import RemovalsPage from './pages/RemovalsPage';
import UsersList from './pages/UsersList';

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
          path="/removals"
          element={
            <IsAdmin>
              <RemovalsPage />
            </IsAdmin>
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
        <Route
          path="/users"
          element={
            <IsAdmin>
              <UsersList />
            </IsAdmin>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
