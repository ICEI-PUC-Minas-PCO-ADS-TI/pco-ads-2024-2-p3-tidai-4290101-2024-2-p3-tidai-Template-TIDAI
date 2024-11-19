import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import '../../styles/index.css';
import CursoForm from '../../components/secretario/CursoForm';
import CursoLista from '../../components/secretario/CursoLista';
import api from '../../api/api';

const ViewCadastroCurso = () => {
  const [showCursoModal, setShowCursoModal] = useState(false);
  const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);

  const handleCursoModal = () => setShowCursoModal(!showCursoModal);

  const handleConfirmModal = (idCursos) => {
    if (idCursos !== 0 && idCursos !== undefined) {
      const curso = cursos.filter((curso) => curso.idCursos === idCursos);
      setCurso(curso[0]);
    } else {
      setCurso({ idCursos: 0 });
    }
    setSmShowConfirmModal(!smShowConfirmModal);
  };

  const [cursos, setCursos] = useState([]);
  const [curso, setCurso] = useState({ idCursos: 0 });

  const novoCurso = () => {
    setCurso({ idCursos: 0 });
    handleCursoModal();
  };

  const pegaTodosCursos = async () => {
    const response = await api.get('Curso');
    return response.data;
  };

  useEffect(() => {
    const getCursos = async () => {
      const todosCursos = await pegaTodosCursos();
      if (todosCursos) setCursos(todosCursos);
    };
    getCursos();
  }, []);

  const addCurso = async (curso) => {
    handleCursoModal();
    const response = await api.post('Curso', curso);
    setCursos([...cursos, response.data]);
  };

  const deletarCurso = async (idCursos) => {
    handleConfirmModal(0);
    if (await api.delete(`Curso/${idCursos}`)) {
      const cursosFiltrados = cursos.filter((curso) => curso.idCursos !== idCursos);
      setCursos(cursosFiltrados);
    }
  };

  const pegarCurso = (idCursos) => {
    const curso = cursos.filter((curso) => curso.idCursos === idCursos);
    setCurso(curso[0]);
    handleCursoModal();
  };

  const atualizarCurso = async (curso) => {
    handleCursoModal();
    const response = await api.put(`Curso/${curso.idCursos}`, curso);
    const { idCursos } = response.data;
    setCursos(cursos.map((item) => (item.idCursos === idCursos ? response.data : item)));
    setCurso({ idCursos: 0 });
  };

  const cancelarCurso = () => {
    setCurso({ idCursos: 0 });
    handleCursoModal();
  };

  const [filtros, setFiltros] = useState({
    idCursos: '',
    nome: '',
    nivel: '',
    tipo: '',
  });

  const filtrarCursos = () => {
    const cursosFiltrados = cursos.filter((curso) => {
      return (
        (filtros.idCursos === '' || curso.idCursos.toString().includes(filtros.idCursos)) &&
        (filtros.nome === '' || curso.nome.toLowerCase().includes(filtros.nome.toLowerCase())) &&
        (filtros.nivel === '' || curso.nivel.toLowerCase() === filtros.nivel.toLowerCase()) &&
        (filtros.tipo === '' || curso.tipo.toLowerCase() === filtros.tipo.toLowerCase())
      );
    });
    setCursos(cursosFiltrados);
  };

  const limparFiltros = async () => {
    setFiltros({ idCursos: '', nome: '', nivel: '', tipo: '' });
    const todosCursos = await pegaTodosCursos();
    setCursos(todosCursos);
  };

  return (
    <div className="container">
      <h4 className="p-5">Gestão de Cursos</h4>
      {/* Filtros */}
      <div className="row mb-3">
        <div className="col-2">
          <input
            type="text"
            className="form-control"
            placeholder="ID"
            value={filtros.id}
            onChange={(e) => setFiltros({ ...filtros, idCursos: e.target.value })}
          />
        </div>
        <div className="col-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nome"
            value={filtros.nome}
            onChange={(e) => setFiltros({ ...filtros, nome: e.target.value })}
          />
        </div>
        <div className="col-3">
          <select
            className="form-select"
            value={filtros.nivel}
            onChange={(e) => setFiltros({ ...filtros, nivel: e.target.value })}
          >
            <option value="">Nível</option>
            <option value="Graduação">Graduação</option>
            <option value="Pós-Graduação">Pós-Graduação</option>
            <option value="Doutorado">Doutorado</option>
            <option value="Mestrado">Mestrado</option>
          </select>
        </div>
        <div className="col-2">
          <select
            className="form-select"
            value={filtros.tipo}
            onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
          >
            <option value="">Tipo</option>
            <option value="Presencial">Presencial</option>
            <option value="EAD">EAD</option>
            <option value="Misto">Misto</option>
          </select>
        </div>
        <div className="col-2">
          <button className="btn btn-primary me-2" onClick={filtrarCursos}>
            Pesquisar
          </button>
          <button className="btn btn-secondary me-2" onClick={limparFiltros}>
            Limpar
          </button>
          <button className="btn btn-success" onClick={novoCurso}>
            Novo Curso
          </button>
        </div>
      </div>

      {/* Lista de Cursos */}
      <CursoLista
        cursos={cursos}
        pegarCurso={pegarCurso}
        deletarCurso={deletarCurso}
      />

      {/* Modal de Formulário */}
      <Modal show={showCursoModal} onHide={handleCursoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registro de Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CursoForm
            addCurso={addCurso}
            atualizarCurso={atualizarCurso}
            cancelarCurso={cancelarCurso}
            cursoSelecionado={curso}
          />
        </Modal.Body>
      </Modal>

      {/* Modal de Exclusão */}
      <Modal size="sm" show={smShowConfirmModal} onHide={handleConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Excluindo Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir este curso?</Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-outline-success"
            onClick={() => deletarCurso(curso.idCursos)}
          >
            Sim
          </button>
          <button className="btn btn-danger" onClick={() => handleConfirmModal(0)}>
            Não
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewCadastroCurso;
