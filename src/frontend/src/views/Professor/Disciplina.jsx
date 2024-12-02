import { Link, Outlet } from 'react-router-dom';
import '../../styles/menuUsuarios.css';

export default function DisciplinaProf() {
    return (
        <>
        <div>
            <p>DisciplinaProf</p>
            <div class="accordion mb-5" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Módulo 1
                    </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <ul class="list-group" style="width: 100%;">
                            <li class="list-group-item" s><a href="aula.html">1. Conteúdo da disciplina</a></li>
                            <li class="list-group-item" s><a href="aula.html">1. Conteúdo da disciplina</a></li>
                            <li class="list-group-item" s><a href="aula.html">1. Conteúdo da disciplina</a></li>
                            <li class="list-group-item" s><a href="aula.html">1. Conteúdo da disciplina</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>
    );
}
