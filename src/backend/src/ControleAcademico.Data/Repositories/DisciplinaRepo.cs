using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleAcademico.Data.Context;
using ControleAcademico.Domain.Entities;
using ControleAcademico.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using static ControleAcademico.Domain.Entities.Disciplina;

namespace ControleAcademico.Data.Repositories
{
    public class DisciplinaRepo : GeralRepo, IDisciplinaRepo
    {
        private readonly ControleAcademicoContext _context;
        public DisciplinaRepo(ControleAcademicoContext context) : base (context)
        {
            _context = context;
        }

        async Task<Disciplina[]> IDisciplinaRepo.PegarTodasAsync()
        {
            IQueryable<Disciplina> query = _context.Disciplinas;

            query = query
                        .AsNoTracking()
                        .OrderBy(ativ => ativ.IdDisciplinas);

            return await query.ToArrayAsync();
        }

        public async Task<Disciplina[]> PegarDisciplinaPorTudoAsync(int? id, string? nome, int? semestre, int?IdCurso, Curso? idCursoNavigation)
        {
            IQueryable<Disciplina> query = _context.Disciplinas.AsNoTracking().OrderBy(curso => curso.IdDisciplinas);

            // Aplica os filtros dinamicamente
            if (id.HasValue)
                query = query.Where(curso => curso.IdDisciplinas == id.Value);

            if (!string.IsNullOrWhiteSpace(nome))
                query = query.Where(curso => curso.Nome == nome);
                
            if (semestre.HasValue)
                query = query.Where(curso => curso.Semestre == semestre);

            if (IdCurso != null)
                query = query.Where(curso => curso.IdCurso == IdCurso);

            if (idCursoNavigation != null)
                query = query.Where(curso => curso.IdCursoNavigation == idCursoNavigation);


            return await query.ToArrayAsync();
        }
    }
}