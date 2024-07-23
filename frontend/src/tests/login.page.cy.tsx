/// <reference types="cypress" />

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from '@/pages/Login';

import AuthProvider from '@/context/auth/AuthContext';

describe('<LoginPage />', () => {
  it('renders', () => {
    cy.viewport('macbook-16');
    cy.mount(
      <React.StrictMode>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </AuthProvider>
        </Router>
      </React.StrictMode>
    );
  });
});