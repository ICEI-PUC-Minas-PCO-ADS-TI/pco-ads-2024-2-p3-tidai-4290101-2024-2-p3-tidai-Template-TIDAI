import React from 'react';

export default function Usuario(props) {
  function TipoLabel(param) {
    switch (param) {
      case '1':
        return 'Aluno';
      case '2':
        return 'Professor';
      case '3':
        return 'Secretário';
      default:
        return 'Indefinido';
    }
  }

  return (
    <tr>
      <td>{props.usuario.Matrícula}</td>
      <td>{props.usuario.Nome}</td>
      <td>{props.usuario.Cpf}</td>
      <td>{props.usuario.Email}</td>
      <td>{props.usuario.Endereço}</td>
      <td>{TipoLabel(props.usuario.Tipo)}</td>
      <td>{props.usuario.Curso}</td>
      <td>
        <button type="button" className="btn btn-outline-primary" onClick={() => props.pegarUsuario(props.usuario.Matrícula)}>
          <i className="fa-regular fa-pen-to-square"></i>
        </button>
      </td>
      <td>
        <button type="button" className="btn btn-outline-danger" onClick={() => props.deletarUsuario(props.usuario.Matrícula)}>
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </td>
    </tr>
  );
}
