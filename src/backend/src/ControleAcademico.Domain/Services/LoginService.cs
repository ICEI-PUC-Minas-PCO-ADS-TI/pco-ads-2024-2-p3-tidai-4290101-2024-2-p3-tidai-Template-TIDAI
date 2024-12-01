using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleAcademico.Domain.Entities;
using ControleAcademico.Domain.Interfaces.Repositories;
using ControleAcademico.Domain.Interfaces.Services;

namespace ControleAcademico.Domain.Services
{
    public class LoginService : ILoginService
    {
        private readonly IUsuarioRepo _UsuarioRepo;

        public LoginService(IUsuarioRepo UsuarioRepo)
        {
            this._UsuarioRepo = UsuarioRepo;
        }

        public async Task<Usuario> _Login(string matricula, string senha)
        {
            try
            {
                var usuarios = await _UsuarioRepo.PegarUsuarioPorTudoAsync(matricula: int.Parse(matricula), senha: senha);
                var usuario = usuarios.FirstOrDefault();

                if (usuario == null)
                    throw new Exception("Matrícula ou senha inválidos.");

                return usuario;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao realizar login: {ex.Message}");
            }
        }

    }
}
