import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/App.css';

export default function Login() {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Verificar se matrícula e senha estão preenchidos
    if (!matricula || !senha) {
      setErrorMessage("Matrícula e senha são obrigatórios.");
      return;
    }

    try {
      // Chama a API de login
      const response = await axios.post('https://localhost:7198/api/Login/login', {
        matricula,
        senha,
      });

      // Se o login for bem-sucedido
      if (response.status === 200) {
        const { matricula, nome, tipo } = response.data;
        // Armazena os dados do usuário no localStorage
        localStorage.setItem('usuario', JSON.stringify({ matricula, nome, tipo }));

        // Lógica para redirecionar o usuário baseado no tipo (string)
        if (tipo === "Aluno") {
          navigate('/aluno');  // Redireciona para a página de aluno
        } else if (tipo === "Professor") {
          navigate('/professor');  // Redireciona para a página de professor
        } else if (tipo === "Secretário") {
          navigate('/secretario');  // Redireciona para a página de secretário
        } else {
          setErrorMessage("Tipo de usuário inválido.");
        }
      }
    } catch (error) {
      // Se ocorrer um erro, exibe a mensagem de erro
      console.error(error);  // Exibe o erro no console para depuração
      setErrorMessage("Matrícula ou senha inválidos.");
    }
  };

  return (
    <div className="login-page">
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#003366' }}>
        <div className="login-container">
          <img
            src="https://static.vecteezy.com/ti/vetor-gratis/p1/15668053-modelo-de-design-de-logotipo-da-faculdade-ilustracaoial-logotipo-da-faculdade-da-universidade-distintivos-emblemas-sinais-estoque-logotipo-do-campus-da-faculdade-gratis-vetor.jpg"
            alt="Logo da UNIBH"
            className="login-logo"
            style={{ width: '150px', height: 'auto' }}
          />
          <h2 style={{ color: 'white' }}>Sistema de Controle Acadêmico</h2>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="login-matricula" className="form-label" style={{ color: 'white' }}>Matrícula</label>
              <input
                type="text"
                className="form-control"
                id="login-matricula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                placeholder="Matrícula institucional"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="senha" className="form-label" style={{ color: 'white' }}>Senha</label>
              <input
                type="password"
                className="form-control"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Sua senha"
              />
            </div>
            <br></br>

            <button type="submit" className="btn btn-primary w-100 mb-1">Entrar</button>

            {errorMessage && (
              <div className="alert alert-danger mt-3">
                {errorMessage}
              </div>
            )}
          </form>

          <div className="row">
            <div className="col-6 text-center mt-3">
              <a href="#confirma-exclusao" data-bs-toggle="modal" data-bs-target="#confirma-exclusao">Esqueceu a senha?</a>
            </div>
            <div className="col-6 text-center mt-3">
              <a href="index.html">Voltar a tela inicial</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
