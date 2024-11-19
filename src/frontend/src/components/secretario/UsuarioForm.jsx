import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const usuarioInicial = {
    matricula: 0,
    nome: '',
    cpf: '',
    email: '',
    endereco: '',
    tipo: '',
    senha: '',
    idCurso: '',
    idCursoNavigation: null,
};

export default function UsuarioForm(props) {
    const usuarioAtual = () => {
        if (props.usuarioSelecionado.matricula !== 0) {
            return props.usuarioSelecionado;
        } else {
            return usuarioInicial;
        }
    };

    const [usuario, setUsuario] = useState(usuarioAtual());

    useEffect(() => {
        if (props.usuarioSelecionado.matricula !== 0) setUsuario(props.usuarioSelecionado);
    }, [props.usuarioSelecionado]);

    const inputTextHandler = (e) => {
        const { name, value } = e.target;

        setUsuario({ ...usuario, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validação de todos os campos obrigatórios
        if (
            !usuario.nome.trim() ||
            !usuario.cpf.trim() ||
            usuario.tipo === '' ||
            !usuario.email.trim() ||
            !usuario.endereco.trim() ||
            !usuario.senha.trim() ||
            !usuario.idCurso
        ) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Verifique se está atualizando ou adicionando
        if (props.usuarioSelecionado.matricula !== 0) {
            props.atualizarUsuario(usuario);
        } else {
            props.addUsuario(usuario);
        }

        setUsuario(usuarioInicial);
    };

    const handleCancelar = (e) => {
        e.preventDefault();

        props.cancelarUsuario();
        setUsuario(usuarioInicial);
    };

    return (
        <>
            <form className="row g-3" onSubmit={handleSubmit}>
                {/* Nome */}
                <div className="col-12">
                    <label className="form-label">
                        Nome <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="nome"
                        name="nome"
                        onChange={inputTextHandler}
                        value={usuario.nome}
                        required
                    />
                </div>

                {/* CPF */}
                <div className="col-8">
                    <label className="form-label">
                        CPF <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="cpf"
                        name="cpf"
                        onChange={inputTextHandler}
                        value={usuario.cpf}
                        required
                    />
                </div>

                {/* Tipo */}
                <div className="col-md-4">
                    <label htmlFor="inputState" className="form-label">
                        Tipo <span style={{ color: 'red' }}>*</span>
                    </label>
                    <select
                        id="tipo"
                        className="form-select"
                        name="tipo"
                        onChange={inputTextHandler}
                        value={usuario.tipo}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="0">Aluno</option>
                        <option value="1">Professor</option>
                        <option value="2">Secretário</option>
                    </select>
                </div>

                {/* Email */}
                <div className="col-12">
                    <label htmlFor="inputEmail4" className="form-label">
                        Email <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        onChange={inputTextHandler}
                        value={usuario.email}
                        required
                    />
                </div>

                {/* Endereço */}
                <div className="col-8">
                    <label className="form-label">
                        Endereço <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="endereco"
                        name="endereco"
                        onChange={inputTextHandler}
                        value={usuario.endereco}
                        required
                    />
                </div>

                {/* Senha */}
                <div className="col-4">
                    <label className="form-label">
                        Senha <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="senha"
                        name="senha"
                        onChange={inputTextHandler}
                        value={usuario.senha}
                        required
                    />
                </div>

                {/* Curso */}
                <div className="col-12 bg-light">
                    <label htmlFor="inputState" className="form-label">
                        Curso <span style={{ color: 'red' }}>*</span>
                    </label>
                    <select
                        id="curso"
                        className="form-select"
                        name="idCurso"
                        onChange={inputTextHandler}
                        value={usuario.idCurso}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="1">SI</option>
                        <option value="2">ADS</option>
                        <option value="3">Direito</option>
                    </select>
                </div>

                {/* Botões */}
                <div className="row mt-4 border-top">
                    <div className="col-6">
                        {usuario.matricula === 0 ? (
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
