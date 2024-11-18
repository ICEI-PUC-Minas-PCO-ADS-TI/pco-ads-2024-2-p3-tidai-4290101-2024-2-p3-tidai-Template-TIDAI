import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';


const usuarioInicial = {
    Matrícula: 0,
    Nome: '',
    Cpf: '',
    Email: '',
    Endereço: '',
    Tipo: 0,
    Senha: '',
    Curso: '',
};

export default function UsuarioForm(props) {
    const [usuario, setUsuario] = useState(usuarioAtual());

    useEffect(() => {
        if (props.usuarioSelecionado.Matrícula !== 0) setUsuario(props.usuarioSelecionado);
    }, [props.usuarioSelecionado]);

    const inputTextHandler = (e) => {
        const { name, value } = e.target;

        setUsuario({ ...usuario, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (props.usuarioSelecionado.Matrícula !== 0) props.atualizarUsuario(usuario);
        else props.addUsuario(usuario);

        setUsuario(usuarioInicial);
    };

    function usuarioAtual() {
        if (props.usuarioSelecionado.Matrícula !== 0) {
            return props.usuarioSelecionado;
        } else {
            return usuarioInicial;
        }
    }

    const handleCancelar = (e) => {
        e.preventDefault();

        props.cancelarUsuario();

        setUsuario(usuarioInicial);
    };
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} animation={false}>
                <Modal.Header>
                    <Modal.Title>Registro Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-12">
                            <label className="form-label">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nome"
                                name="Nome" // Mudei para o campo correto
                                onChange={inputTextHandler}
                                value={usuario.Nome} // Use o valor correto
                            />
                        </div>
                        <div className="col-8">
                            <label className="form-label">Cpf</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cpf"
                                name="Cpf" // Mudei para o campo correto
                                onChange={inputTextHandler}
                                value={usuario.Cpf} // Use o valor correto
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputState" className="form-label">Tipo</label>
                            <select
                                id="tipo"
                                className="form-select"
                                name="Tipo" // Mudei para o campo correto
                                onChange={inputTextHandler}
                                value={usuario.Tipo}
                            >
                                <option value="0">Selecione</option>
                                <option value="1">Aluno</option>
                                <option value="2">Professor</option>
                                <option value="3">Secretário</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputEmail4" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="Email" // Mudei para o campo correto
                                onChange={inputTextHandler}
                                value={usuario.Email} // Use o valor correto
                            />
                        </div>
                        <div className="col-8">
                            <label className="form-label">Endereço</label>
                            <input
                                type="text"
                                className="form-control"
                                id="endereco"
                                name="Endereço" // Mudei para o campo correto
                                onChange={inputTextHandler}
                                value={usuario.Endereço} // Use o valor correto
                            />
                        </div>
                        <div className="col-4">
                            <label className="form-label">Senha</label>
                            <input
                                type="text"
                                className="form-control"
                                id="senha"
                                name="Senha" // Mudei para o campo correto
                                onChange={inputTextHandler}
                                value={usuario.Senha} // Use o valor correto
                            />
                        </div>
                        <div className="col-12 bg-light">
                            <label htmlFor="inputState" className="form-label">Curso</label>
                            <select
                                id="curso"
                                className="form-select"
                                name="Curso" // Mudei para o campo correto
                                onChange={inputTextHandler}
                                value={usuario.Curso} // Use o valor correto
                            >
                                <option value="0">Selecione</option>
                                <option value="1">SI</option>
                                <option value="2">ADS</option>
                                <option value="3">Direito</option>
                            </select>
                        </div>
                        {
                        usuario.Matrícula === 0
                            ? <Button variant="secondary" onClick={props.handleClose}>Fechar</Button>//novo
                            : <Button variant="secondary" onClick={handleCancelar}>Fechar</Button>//atualizar
                    }
                        <Button variant="primary" type='submit'>Salvar</Button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}
