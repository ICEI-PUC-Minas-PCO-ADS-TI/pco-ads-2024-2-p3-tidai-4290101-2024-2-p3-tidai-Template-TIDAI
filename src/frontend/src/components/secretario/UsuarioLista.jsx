import React from 'react';

export default function UsuarioLista(props) {
  function TipoLabel(param) {
    switch (param) {
      case '1': return 'Aluno';
      case '2': return 'Professor';
      case '3': return 'Secretário';
      default:  return 'Indefinido';
    }
  }

  return (
    <>
      {props.usuarios.map((usuario) => (
        <tr>
          <td>{usuario.Matrícula}</td>
          <td>{usuario.Nome}</td>
          <td>{usuario.Cpf}</td>
          <td>{usuario.Email}</td>
          <td>{usuario.Endereço}</td>
          <td>{TipoLabel(usuario.Tipo)}</td>
          <td>{usuario.Curso}</td>
          <td>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => {
                props.pegarUsuario(usuario.Matrícula); // Chama pegarUsuario
                props.handleShow(); // Chama handleShow
              }}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
          </td>

          <td>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => props.deletarUsuario(usuario.Matrícula)}
            >
              <i className="fa-regular fa-trash-can"></i>
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}
