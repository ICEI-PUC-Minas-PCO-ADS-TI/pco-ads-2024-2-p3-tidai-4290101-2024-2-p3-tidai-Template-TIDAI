using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleAcademico.Domain.Entities;
using ControleAcademico.Domain.Interfaces.Repositories;
using ControleAcademico.Domain.Interfaces.Services;

namespace ControleAcademico.Domain.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepo _UsuarioRepo;

        public UsuarioService(IUsuarioRepo UsuarioRepo) // Atualize o construtor
        {
            this._UsuarioRepo = UsuarioRepo;
        }

        public async Task<Usuario> AdicionarUsuario(Usuario model)
        {
            // Verifica se já existe um usuário com o mesmo nome
            var usuariosComMesmoNome = await _UsuarioRepo.PegarUsuarioPorTudoAsync(nome: model.Nome);
            if (usuariosComMesmoNome.FirstOrDefault() != null)
                throw new InvalidOperationException("Já existe um usuário com esse nome.");
            model.Matricula = 0;
            // Adiciona o novo usuário
            _UsuarioRepo.Adicionar(model);

            if (await _UsuarioRepo.SalvarMudancaAsync())
                return model;

            throw new Exception("Erro ao salvar o usuário.");
        }

        public async Task<Usuario> AtualizarUsuario(Usuario model)
        {
            if (model.Matricula <= 0)
                throw new ArgumentException("Matrícula inválida.");

            // Verifica se o usuário existe
            var usuarioExistente = await _UsuarioRepo.PegarUsuarioPorTudoAsync(matricula: model.Matricula);
            var usuario = usuarioExistente.FirstOrDefault();
            if (usuario == null)
                throw new InvalidOperationException("Usuário inexistente.");

            // Atualiza o usuário
            _UsuarioRepo.Atualizar(model);
            if (await _UsuarioRepo.SalvarMudancaAsync())
                return model;

            throw new Exception("Erro ao atualizar o usuário.");
        }

        public async Task<bool> DeletarUsuario(int matricula)
        {
            var usuarios = await _UsuarioRepo.PegarUsuarioPorTudoAsync(matricula: matricula);
            var usuario = usuarios.FirstOrDefault(); // Obter o primeiro usuário encontrado

            if (usuario == null)
                throw new Exception("Usuário que tentou deletar não existe.");

            _UsuarioRepo.Deletar(usuario);
            return await _UsuarioRepo.SalvarMudancaAsync();
        }

        public async Task<Usuario[]> PegarTodosUsuarioAsynk()
        {
            try
            {
                var usuarios = await _UsuarioRepo.PegarTodasAsync();
                if (usuarios == null) return null;

                return usuarios;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Usuario[]> PegarUsuarioPorTudo(int? matricula = null, string? nome = null, string? cpf = null, string? email = null, string? endereco = null, Usuario.Tipos? tipo = null, string? senha = null, int? idCurso = null, Curso? idCursoNavigation = null)
        {
            try
            {
                var usuarios = await _UsuarioRepo.PegarUsuarioPorTudoAsync(matricula, nome, cpf, email, endereco, tipo, senha, idCurso, idCursoNavigation);
                if (usuarios == null) return null;

                return usuarios;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
