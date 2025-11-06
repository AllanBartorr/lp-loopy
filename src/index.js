import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.css';

// 1. Importa o componente App (que usa o Hook)
import App from './App'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* 2. Renderiza o Componente (que retorna JSX) */}
    <App /> 
  </React.StrictMode>
);

