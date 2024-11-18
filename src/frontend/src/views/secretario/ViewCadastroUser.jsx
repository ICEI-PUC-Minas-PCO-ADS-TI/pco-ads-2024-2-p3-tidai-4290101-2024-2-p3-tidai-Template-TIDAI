import React, { useState, useEffect } from 'react';
import DeleteModal from '../../components/common/ModalConfirmaExclusão';
import '../../styles/index.css';
import UsuarioForm from '../../components/secretario/UsuarioForm';
import UsuarioLista from '../../components/secretario/UsuarioLista';

const ViewCadastroUser = () => {
  const initialState = [
    {
      Matrícula: '1',
      Nome: 'Wagner Cipriano',
      Cpf: '48974587510',
      Email: 'wagner@gmail.com',
      Endereço: 'Rua Santo Antônio 71',
      Tipo: '2',
      Senha: '654321',
      Curso: 'ADS',
    },
    {
      Matrícula: '2',
      Nome: 'Pedro Henrique Ferreira Gomes Martins',
      Cpf: '15387954810',
      Email: 'pedro@gmail.com',
      Endereço: 'Rua Del Rey 122',
      Tipo: '1',
      Senha: '123456',
      Curso: 'ADS',
    },
  ];

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [index, setIndex] = useState(0);
  const [usuarios, setUsuarios] = useState(initialState || []);
  const [usuario, setUsuario] = useState({ Matrícula: 0 });

  useEffect(() => {
    usuarios.length <= 0
      ? setIndex(1)
      : setIndex(
        Math.max.apply(
          Math,
          usuarios.map((item) => item.Matrícula)
        ) + 1
      );
  }, [usuarios]);

  function addUsuario(usuario) {
    setUsuarios([...usuarios, { ...usuario, Matrícula: index }]);
  }

  function deletarUsuario(Matrícula) {
    const usuariosFiltrados = usuarios.filter(
      (usuario) => usuario.Matrícula !== Matrícula);
    setUsuarios([...usuariosFiltrados]);
  }

  function pegarUsuario(Matrícula) {
    const usuario = usuarios.filter((usuario) => usuario.Matrícula === Matrícula);
    setUsuario(usuario[0]);
  }

  function atualizarUsuario(usuario) {
    setUsuarios(
      usuarios.map((item) => (item.Matrícula === usuario.Matrícula ? usuario : item))
    );
    setUsuario({ Matrícula: 0 });
  }

  function cancelarUsuario() {
    setUsuario({ Matrícula: 0 });
  }

  return (
    <div className="height-100">
      <h4 className='p-5'>Gestão de Usuários</h4>
      <div className="container">
        {/* Filtros */}
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

        {/* Tabela */}
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
              key={usuario.Matrícula}
              deletarUsuario={deletarUsuario}
              pegarUsuario={pegarUsuario}
              show={show}
              handleShow={handleShow}
              usuario={usuario}
              usuarios={usuarios}
            />
          </tbody>
        </table>

        <UsuarioForm
          addUsuario={addUsuario}
          cancelarUsuario={cancelarUsuario}
          atualizarUsuario={atualizarUsuario}
          usuarios={usuarios}
          usuarioSelecionado={usuario}
          show={show}
          handleShow={handleShow}
          handleClose={handleClose} />


        {/* Delete Confirmation Modal */}
        <DeleteModal show2={show2} handleClose2={handleClose2} />
      </div>
    </div>
  );
};

export default ViewCadastroUser;
