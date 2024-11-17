import { useState, useEffect } from 'react'

export default function UsuarioForm(props) {
    const [usuario, setUsuario] = useState({})

    useEffect(()=>{
        
    })

    const inputTextHandler = (e) => {
        const { name, value } = e.target;

        setUsuario({ ...usuario, [name]: value })
    }
    return (
        <form className="row g-3">
            <div className="col-12">
                <label className="form-label">Nome</label>
                <input type="text" className="form-control" id="nome" name='nome'
                    onChange={inputTextHandler}
                    value={usuario.nome} />
            </div>
            <div className="col-8">
                <label className="form-label">Cpf</label>
                <input type="text" className="form-control" id="cpf" name='cpf'
                    onChange={inputTextHandler}
                    value={usuario.cpf} />
            </div>
            <div className="col-md-4">
                <label for="inputState" className="form-label">Tipo</label>
                <select 
                id="tipo" 
                className="form-select"
                name='tipo'
                onChange={inputTextHandler}
                value={usuario.tipo}>
                    <option value="0">Selecione</option>
                    <option value="1">Aluno</option>
                    <option value="2">Professor</option>
                    <option value="3">Secretário</option>
                </select>
            </div>
            <div className="col-12">
                <label for="inputEmail4" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name='email'
                    onChange={inputTextHandler}
                    value={usuario.email} />
            </div>
            <div className="col-8">
                <label className="form-label">Endereço</label>
                <input type="text" className="form-control" id="endereço" name='endereço'
                    onChange={inputTextHandler}
                    value={usuario.endereço} />
            </div>
            <div className="col-4">
                <label className="form-label">Senha</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="senha" 
                    name='senha'
                    onChange={inputTextHandler}
                    value={usuario.senha} />
            </div>
            <div className="col-12 bg-light">
                <label for="inputState" className="form-label">Curso</label>
                <select id="curso" className="form-select">
                    <option defaultValue={0}>Selecione</option>
                    <option value={1}>SI</option>
                    <option value={2}>ADS</option>
                    <option value={3}>Direito</option>
                </select>
            </div>
        </form>
    )
}
