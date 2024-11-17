import React from 'react';
import Usuario from './Usuario'; // Certifique-se de que o caminho está correto

export default function UsuarioLista(props) {
  return (
    // Apenas renderizando o map sem usar Fragment
    props.usuarios.map((usuario) => (
      <Usuario
        key={usuario.Matrícula}            // Usando a matrícula como chave única
        usuario={usuario}                  // Passando o usuário atual como prop
        deletarUsuario={props.deletarUsuario} // Passando a função de deletar
        pegarUsuario={props.pegarUsuario} // Passando a função de deletar
        handleShow={props.handleShow}      // Passando a função handleShow
      />
    ))
  );
}
