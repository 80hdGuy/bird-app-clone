import React from 'react';
import Root from './Root';
import { AuthProvider } from './context/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <Root></Root>
    </AuthProvider>
  );
}
