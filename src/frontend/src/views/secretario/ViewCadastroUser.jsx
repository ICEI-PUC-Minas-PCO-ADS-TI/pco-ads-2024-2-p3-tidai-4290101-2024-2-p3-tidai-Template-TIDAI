import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap'; 
import DeleteModal from '../../components/common/ModalConfirmaExclusão';
import '../../styles/index.css';
import UsuarioForm from '../../components/secretario/UsuarioForm';
import UsuarioLista from '../../components/secretario/UsuarioLista';

const ViewCadastroUser = () => {
  const initialState = [
    {
      id: '1',
      Matrícula: '00001',
      Nome: 'Wagner Cipriano',
      Cpf: '48974587510',
      Email: 'wagner@gmail.com',
      Endereço: 'Rua Santo Antônio 71',
      Tipo: '2',
      Senha: '654321',
      Curso: 'ADS',
      Disciplinas: '13'
    },
    {
      id: '2',
      Matrícula: '00002',
      Nome: 'Pedro Henrique Ferreira Gomes Martins',
      Cpf: '15387954810',
      Email: 'pedro@gmail.com',
      Endereço: 'Rua Del Rey 122',
      Tipo: '1',
      Senha: '123456',
      Curso: 'ADS',
      Disciplinas: '8'
    },
  ];

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [usuarios, setUsuarios] = useState(initialState);
  const [usuario, setUsuario] = useState({});

  function addUsuario(e) {
    e.preventDefault();
    const usuario = {
      Matrícula: Math.max.apply(Math, usuarios.map((item)=>item.Matrícula))+1,
      Nome: document.getElementById('nome').value,
      Cpf: document.getElementById('cpf').value,
      Email: document.getElementById('email').value,
      Endereço: document.getElementById('endereço').value,
      Tipo: document.getElementById('tipo').value,
      Senha: document.getElementById('senha').value,
      Curso: document.getElementById('curso').value,
    };
    setUsuarios([...usuarios, { ...usuario }]);
  }

  function deletarUsuario(matricula) {
    const usuariosFiltrados = usuarios.filter(usuario => usuario.Matrícula !== matricula);
    setUsuarios(usuariosFiltrados);
  }

  function pegarUsuario(matricula){
    const usuario = usuarios.filter(usuario => usuario.Matrícula === matricula);
    setUsuario(usuario[0])
  }

  return (
    <div className="height-100">
      <h4 className='p-5'>Gestão de Usuários</h4>
      <div className="container">
        {/* Botões de controle */}
        <div className="row mb-3">
          <div className="col-2">
            <input type="text" className="form-control" placeholder="Matrícula" />
          </div>
          <div className="col-2">
            <input type="text" className="form-control" placeholder="Nome" />
          </div>
          <div className="col-2">
            <input type="text" className="form-control" placeholder="Cpf" />
          </div>
          <div className="col-2">
            <select className="form-select">
              <option value="" selected>Todos</option>
              <option value="2">Alunos</option>
              <option value="1">Professores</option>
              <option value="0">Secretário</option>
            </select>
          </div>
          <div className="col-4">
            <button id="btn_add" type="button" className="btn btn-primary me-1">
              Pesquisar
            </button>
            <button id="btn_unfilter" type="button" className="btn btn-secondary me-4">Limpar busca</button>
            <button type="button" className="btn btn-success" onClick={handleShow}>
              Novo Registro
            </button>
          </div>
        </div>

        <table className="table table-striped table-responsive">
          <thead>
            <tr>
              <th scope="col">Matrícula</th>
              <th scope="col">Nome</th>
              <th scope="col">Cpf</th>
              <th scope="col">Email</th>
              <th scope="col">Endereço</th>
              <th scope="col">Tipo</th>
              <th scope="col">Curso</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <UsuarioLista
              usuarios={usuarios} // Passando a lista de usuários
              deletarUsuario={deletarUsuario} // Passando a função deletarUsuario
              pegarUsuario={pegarUsuario} // Passando a função de deletar
              handleShow={handleShow} // Passando a função handleShow
            />
          </tbody>
        </table>

        {/* Modal de Cadastro */}
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Novo Registro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UsuarioForm 
             usuarioSelecionado={usuario}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Fechar</Button>
            <Button variant="primary" onClick={addUsuario}>Salvar</Button>
          </Modal.Footer>
        </Modal>

        {/* Delete Confirmation Modal */}
        <DeleteModal show2={show2} handleClose2={handleClose2} />
      </div>
    </div>
  );
};

export default ViewCadastroUser;
