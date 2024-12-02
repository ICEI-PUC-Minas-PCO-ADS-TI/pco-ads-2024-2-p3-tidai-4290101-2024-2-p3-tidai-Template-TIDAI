using System;
using System.Collections.Generic;
using ControleAcademico.Domain.Entities;
using Microsoft.EntityFrameworkCore;
namespace ControleAcademico.Data.Context;

public partial class ControleAcademicoContext : DbContext
{
    public ControleAcademicoContext() { }
    public ControleAcademicoContext(DbContextOptions<ControleAcademicoContext> options) : base(options) {  }

    public virtual DbSet<Curso> Cursos { get; set; }

    public virtual DbSet<Disciplina> Disciplinas { get; set; }

    public virtual DbSet<DisciplinasUsuario> DisciplinasUsuarios { get; set; }

    public virtual DbSet<MaterialDisciplina> MaterialDisciplinas { get; set; }

    public virtual DbSet<NotasTarefa> NotasTarefas { get; set; }

    public virtual DbSet<Presenca> Presencas { get; set; }

    public virtual DbSet<TarefasDisciplina> TarefasDisciplinas { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;database=controle_academico;user=root;password=123456", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.36-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb3_general_ci")
            .HasCharSet("utf8mb3");

        modelBuilder.Entity<Curso>(entity =>
        {
            entity.HasKey(e => e.IdCursos).HasName("PRIMARY");

            entity.ToTable("cursos");

            entity.Property(e => e.IdCursos)
                .ValueGeneratedNever()
                .HasColumnName("id_cursos");
            entity.Property(e => e.Nivel).HasColumnName("nivel");
            entity.Property(e => e.Nome)
                .HasMaxLength(45)
                .HasColumnName("nome");
            entity.Property(e => e.Tipo).HasColumnName("tipo");
        });

        modelBuilder.Entity<Disciplina>(entity =>
        {
            entity.HasKey(e => e.IdDisciplinas).HasName("PRIMARY");

            entity.ToTable("disciplinas");

            entity.HasIndex(e => e.IdCurso, "fk_disciplinas_cursos");

            entity.Property(e => e.IdDisciplinas)
                .ValueGeneratedNever()
                .HasColumnName("id_disciplinas");
            entity.Property(e => e.IdCurso).HasColumnName("id_curso");
            entity.Property(e => e.Nome)
                .HasMaxLength(45)
                .HasColumnName("nome");
            entity.Property(e => e.Semestre).HasColumnName("semestre");

            entity.HasOne(d => d.IdCursoNavigation).WithMany(p => p.Disciplinas)
                .HasForeignKey(d => d.IdCurso)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_disciplinas_cursos");
        });

modelBuilder.Entity<DisciplinasUsuario>(entity =>
{
    // Define a chave primária composta
    entity.HasKey(e => new { e.Matricula, e.IdDisciplinas })
        .HasName("PRIMARY");

    entity.ToTable("disciplinas_usuario");

    entity.HasIndex(e => e.IdDisciplinas, "fk_disciplinas_usuario_disciplinas");
    entity.HasIndex(e => e.Matricula, "fk_disciplinas_usuario_usuarios");

    entity.Property(e => e.IdDisciplinas).HasColumnName("id_disciplinas");
    entity.Property(e => e.Matricula).HasColumnName("matricula");

    entity.HasOne(d => d.IdDisciplinasNavigation)
        .WithMany(p => p.DisciplinasUsuarios) // Ajuste aqui se houver uma coleção de DisciplinasUsuarios na entidade Disciplina
        .HasForeignKey(d => d.IdDisciplinas)
        .OnDelete(DeleteBehavior.ClientSetNull)
        .HasConstraintName("fk_disciplinas_usuario_disciplinas");

    entity.HasOne(d => d.MatriculaNavigation)
        .WithMany(p => p.DisciplinasUsuarios) // Ajuste aqui se houver uma coleção de DisciplinasUsuarios na entidade Usuario
        .HasForeignKey(d => d.Matricula)
        .OnDelete(DeleteBehavior.ClientSetNull)
        .HasConstraintName("fk_disciplinas_usuario_usuarios");
});


        modelBuilder.Entity<MaterialDisciplina>(entity =>
        {
            entity.HasKey(e => e.IdMateria).HasName("PRIMARY");

            entity.ToTable("material_disciplina");

            entity.HasIndex(e => e.IdDisciplinas, "fk_material_disciplina_disciplinas");

            entity.Property(e => e.IdMateria) // Ajustado para int
                .ValueGeneratedNever()
                .HasColumnName("id_materia");
                
            // Atualize o mapeamento de Descricao para string com um tamanho máximo
            entity.Property(e => e.Descricao)
                .HasMaxLength(255) // ajuste o tamanho conforme necessário
                .HasColumnName("descricao");

            entity.Property(e => e.IdDisciplinas).HasColumnName("id_disciplinas");
            entity.Property(e => e.LinkVideoaula)
                .HasMaxLength(1000)
                .HasColumnName("link_videoaula");
            entity.Property(e => e.Modulo).HasColumnName("modulo");
            entity.Property(e => e.Titulo)
                .HasMaxLength(45)
                .HasColumnName("titulo");

            entity.HasOne(d => d.IdDisciplinasNavigation).WithMany(p => p.MaterialDisciplinas)
                .HasForeignKey(d => d.IdDisciplinas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_material_disciplina_disciplinas");
        });

modelBuilder.Entity<NotasTarefa>(entity =>
{
    // Definindo uma chave composta como chave primária
    entity.HasKey(e => new { e.Matricula, e.IdTarefa })
        .HasName("PRIMARY")
        .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

    entity.ToTable("notas_tarefas");

    entity.HasIndex(e => e.IdTarefa, "fk_notas_tarefas_tarefas_disciplina");

    entity.Property(e => e.Matricula).HasColumnName("matricula");
    entity.Property(e => e.IdTarefa).HasColumnName("id_tarefa");
    entity.Property(e => e.Nota).HasColumnName("nota");

    entity.HasOne(d => d.IdTarefaNavigation).WithMany(p => p.NotasTarefas)
        .HasForeignKey(d => d.IdTarefa)
        .OnDelete(DeleteBehavior.ClientSetNull)
        .HasConstraintName("fk_notas_tarefas_tarefas_disciplina");

    entity.HasOne(d => d.MatriculaNavigation).WithMany(p => p.NotasTarefas)
        .HasForeignKey(d => d.Matricula)
        .OnDelete(DeleteBehavior.ClientSetNull)
        .HasConstraintName("fk_notas_tarefas_usuarios");
});

modelBuilder.Entity<Presenca>(entity =>
{
    // Adicionando uma chave primária à entidade `Presenca`
    entity.HasKey(e => e.IdPresenca) // Certifique-se de que a entidade possui a propriedade IdPresenca
        .HasName("PRIMARY");

    entity.ToTable("presenca");

    entity.HasIndex(e => e.IdDisciplinasUsuario, "fk_presenca_disciplinas_usuario");

    entity.Property(e => e.IdPresenca).HasColumnName("id_presenca"); // Definindo a coluna no banco de dados para o campo IdPresenca
    entity.Property(e => e.Data).HasColumnName("data");
    entity.Property(e => e.IdDisciplinasUsuario).HasColumnName("id_disciplinas_usuario");
    entity.Property(e => e.Presenca1).HasColumnName("presenca");
});


        modelBuilder.Entity<TarefasDisciplina>(entity =>
        {
            entity.HasKey(e => e.IdTarefa).HasName("PRIMARY");

            entity.ToTable("tarefas_disciplina");

            entity.HasIndex(e => e.IdDisciplinas, "fk_tarefas_disciplinas");

            entity.Property(e => e.IdTarefa)
                .ValueGeneratedNever()
                .HasColumnName("Id_tarefa");
            entity.Property(e => e.DataEntrega).HasColumnName("data_entrega");
            entity.Property(e => e.IdDisciplinas).HasColumnName("id_disciplinas");
            entity.Property(e => e.LinkArquivoTarefa)
                .HasMaxLength(1000)
                .HasColumnName("link_arquivo_tarefa");
            entity.Property(e => e.Modulo)
                .HasMaxLength(45)
                .HasColumnName("modulo");
            entity.Property(e => e.Titulo)
                .HasMaxLength(45)
                .HasColumnName("titulo");
            entity.Property(e => e.Valor).HasColumnName("valor");

            entity.HasOne(d => d.IdDisciplinasNavigation).WithMany(p => p.TarefasDisciplinas)
                .HasForeignKey(d => d.IdDisciplinas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_tarefas_disciplinas");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Matricula).HasName("PRIMARY");

            entity.ToTable("usuarios");

            entity.HasIndex(e => e.IdCurso, "fk_usuarios_cursos");

            entity.Property(e => e.Matricula)
                .ValueGeneratedNever()
                .HasColumnName("matricula");
            entity.Property(e => e.Cpf)
                .HasMaxLength(11)
                .HasColumnName("cpf");
            entity.Property(e => e.Email)
                .HasMaxLength(45)
                .HasColumnName("email");
            entity.Property(e => e.Endereco)
                .HasMaxLength(45)
                .HasColumnName("endereco");
            entity.Property(e => e.IdCurso).HasColumnName("id_curso");
            entity.Property(e => e.Nome)
                .HasMaxLength(45)
                .HasColumnName("nome");
            entity.Property(e => e.Senha)
                .HasMaxLength(45)
                .HasColumnName("senha");
            entity.Property(e => e.Tipo).HasColumnName("tipo");

            entity.HasOne(d => d.IdCursoNavigation).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.IdCurso)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_usuarios_cursos");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
