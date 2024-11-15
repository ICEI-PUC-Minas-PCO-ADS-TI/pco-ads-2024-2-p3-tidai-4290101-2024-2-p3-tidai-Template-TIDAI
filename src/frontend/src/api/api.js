/* import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7198/api/',
});

export default api;                 [o que estava antes]
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';  

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const UserLogin = async () => {
    try {
      // Faz a requisição de login ao backend
      const response = await api.post('login', { email, senha });

      if (response.data.success) {
        const tipoUsuario = response.data.tipoUsuario; // Recebe o tipo de usuário do backend
        if (tipoUsuario === 'aluno') {
          navigate(); //colocar os componentes corretos
        } else if (tipoUsuario === 'secretario') {
          navigate('/area-secretario');
        } else if (tipoUsuario === 'professor') {
          navigate('/area-professor');
        }
      } else {
        alert('Login falhou. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Tente novamente mais tarde.');
    }
  };

  return (
    <div>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Senha" 
        value={senha} 
        onChange={(e) => setSenha(e.target.value)} 
      />
      <button onClick={UserLogin}>Login</button>
    </div>
  );
}

export default Login;
