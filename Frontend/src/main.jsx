import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ThemeProvider from './theme/ThemeContext';
import './index.css';
import { SiteConfigProvider } from './context/SiteConfigContext';
import { SocketProvider } from './context/SocketContext';
import { NotificationProvider } from './context/NotificationContext';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <HelmetProvider>
          <SiteConfigProvider>
            <NotificationProvider>
              <SocketProvider>
                <App />
              </SocketProvider>
            </NotificationProvider>
          </SiteConfigProvider>
        </HelmetProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
