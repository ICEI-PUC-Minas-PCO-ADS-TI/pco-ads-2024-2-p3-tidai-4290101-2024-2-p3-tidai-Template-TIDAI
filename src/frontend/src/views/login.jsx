import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

function ViewLogin() {
  return (
    <div className="login-page">
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#003366' }}>
        
        {/* Modal para recuperação de senha */}
        <div className="modal fade" id="modal-recuperacao-senha" tabIndex="-1" aria-labelledby="modal-recuperacao-senha-label" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modal-recuperacao-senha-label">Esqueci minha senha</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="matricula-recuperacao" className="form-label">Matrícula</label>
                    <input
                      type="text"
                      className="form-control"
                      id="matricula-recuperacao"
                      placeholder="Informe sua matrícula"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cpf-recuperacao" className="form-label">CPF</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cpf-recuperacao"
                      placeholder="Informe seu CPF"
                    />
                  </div>
                </form>
                <p className="text-muted">
                  Sua nova senha será enviada para o email cadastrado. Caso não tenha acesso, procure o setor acadêmico.
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-primary">Confirmar</button>
              </div>
            </div>
          </div>
        </div>

        {/* Formulário de Login */}
        <div className="login-container">
          {/* Logo */}
          <img
            src="https://via.placeholder.com/150" 
            alt="Logo da Instituição"
            className="login-logo"
          />
          <h2 className="text-white text-center mb-4">Sistema de Controle Acadêmico</h2>

          <form>
            <div className="mb-3">
              <label htmlFor="matricula-login" className="form-label text-white">Matrícula</label>
              <input
                type="text"
                className="form-control"
                id="matricula-login"
                placeholder="Digite sua matrícula"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="senha-login" className="form-label text-white">Senha</label>
              <input
                type="password"
                className="form-control"
                id="senha-login"
                placeholder="Digite sua senha"
              />
            </div>
            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" id="lembrar-login" />
              <label className="form-check-label text-white" htmlFor="lembrar-login">Lembrar de mim</label>
            </div>

            {/* Botões para os diferentes tipos de usuários */}
            <div className="d-grid gap-2">
              <Link to="/professor" className="btn btn-primary">Entrar como Professor</Link>
              <Link to="/aluno" className="btn btn-secondary">Entrar como Aluno</Link>
              <Link to="/secretario" className="btn btn-success">Entrar como Secretário</Link>
            </div>
          </form>

          {/* Links adicionais */}
          <div className="d-flex justify-content-between mt-3">
            <a
              href="#modal-recuperacao-senha"
              data-bs-toggle="modal"
              className="text-decoration-none text-white"
            >
              Esqueceu a senha?
            </a>
            <Link to="/" className="text-decoration-none text-white">
              Voltar à página inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewLogin;
