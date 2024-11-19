import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const cursoInicial = {
    idCurso: 0,
    nome: '',
    descricao: '',
    tipo: '',
    duracao: '',
};

export default function CursoForm(props) {
    const cursoAtual = () => {
        if (props.cursoSelecionado.idCurso !== 0) {
            return props.cursoSelecionado;
        } else {
            return cursoInicial;
        }
    };

    const [curso, setCurso] = useState(cursoAtual());

    useEffect(() => {
        if (props.cursoSelecionado.idCurso !== 0) setCurso(props.cursoSelecionado);
    }, [props.cursoSelecionado]);

    const inputTextHandler = (e) => {
        const { name, value } = e.target;

        setCurso({ ...curso, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validação de todos os campos obrigatórios
        if (
            !curso.nome.trim() ||
            !curso.descricao.trim() ||
            curso.tipo === '' ||
            !curso.duracao.trim()
        ) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Verifique se está atualizando ou adicionando
        if (props.cursoSelecionado.idCurso !== 0) {
            props.atualizarCurso(curso);
        } else {
            props.addCurso(curso);
        }

        setCurso(cursoInicial);
    };

    const handleCancelar = (e) => {
        e.preventDefault();

        props.cancelarCurso();
        setCurso(cursoInicial);
    };

    return (
        <>
            <form className="row g-3" onSubmit={handleSubmit}>
                {/* Nome */}
                <div className="col-12">
                    <label className="form-label">
                        Nome do Curso <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="nome"
                        name="nome"
                        onChange={inputTextHandler}
                        value={curso.nome}
                        required
                    />
                </div>
                {/* nivel */}
                <div className="col-md-6">
                    <label htmlFor="nivel" className="form-label">
                        Nivel <span style={{ color: 'red' }}>*</span>
                    </label>
                    <select
                        id="nivel"
                        className="form-select"
                        name="nivel"
                        onChange={inputTextHandler}
                        value={curso.nivel}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="Presencial">Presencial</option>
                        <option value="EAD">EAD</option>
                        <option value="Misto">Misto</option>
                    </select>
                </div>
                {/* Tipo */}
                <div className="col-md-6">
                    <label htmlFor="tipo" className="form-label">
                        Tipo <span style={{ color: 'red' }}>*</span>
                    </label>
                    <select
                        id="tipo"
                        className="form-select"
                        name="tipo"
                        onChange={inputTextHandler}
                        value={curso.tipo}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="Presencial">Presencial</option>
                        <option value="EAD">EAD</option>
                        <option value="Misto">Misto</option>
                    </select>
                </div>



                {/* Botões */}
                <div className="row mt-4 border-top">
                    <div className="col-6">
                        {curso.id === 0 ? (
                            <Button variant="secondary" onClick={props.handleClose}>
                                Fechar
                            </Button>
                        ) : (
                            <Button variant="secondary" onClick={handleCancelar}>
                                Cancelar
                            </Button>
                        )}
                    </div>
                    <div className="col-6">
                        <Button variant="primary" type="submit">
                            Salvar
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
}
