import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';

import { HTML5Backend } from 'react-dnd-html5-backend';

import AuthContextProvider from './contexts/Auth.context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <ChakraProvider>
          <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
        </ChakraProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);
