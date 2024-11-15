import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';


function ViewLogin() {
      return(
        <div className="login-page">   
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#003366' }}>
        {/* Modal de Troca de Senha */}
        <div className="modal fade" id="confirma-exclusao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Esqueci senha</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="matricula" className="form-label">Matrícula</label>
                    <input type="text" className="form-control" id="matricula" placeholder="Matrícula institucional" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cpf" className="form-label">CPF</label>
                    <input type="text" className="form-control" id="cpf" placeholder="CPF" />
                  </div>
                </form>
                <p><b>Será enviado por email sua nova senha.</b> Caso não tenha mais acesso ao seu email cadastrado, procure o secretário acadêmico para atualizar suas informações cadastrais.</p>
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
            src="https://static.vecteezy.com/ti/vetor-gratis/p1/15668053-modelo-de-design-de-logotipo-da-faculdade-ilustracaoial-logotipo-da-faculdade-da-universidade-distintivos-emblemas-sinais-estoque-logotipo-do-campus-da-faculdade-gratis-vetor.jpg" 
            alt="Logo da UNIBH" 
            className="login-logo"
            style={{ width: '150px', height: 'auto' }}

          />
  
          <h2 style={{ color: 'white' }}>Sistema de Controle Acadêmico</h2>
  
          {/* Login Form */}
          <form>
            <div className="mb-3">
              <label htmlFor="login-matricula" className="form-label"style={{ color: 'white' }}>Matrícula</label>
              <input type="text" className="form-control" id="login-matricula" placeholder="Matrícula institucional" />
            </div>
            <div className="mb-3">
              <label htmlFor="senha" className="form-label" style={{ color: 'white' }}>Senha</label>
              <input type="password" className="form-control" id="senha" placeholder="Sua senha" />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="lembrar" />
              <label className="form-check-label" htmlFor="lembrar"style={{ color: 'white' }}>Lembrar de mim</label>
            </div>
            <button type="button" className="btn btn-custom-w-100-mb-1">Confirmar</button>

          </form>
  
          <div className="row">
            {/* Recuperar Senha */}
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
    };
    
    export default ViewLogin;