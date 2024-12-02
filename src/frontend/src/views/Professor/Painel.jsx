import { Link, Outlet } from 'react-router-dom';
import '../../styles/menuUsuarios.css';

export default function ControleProf() {
    return (
        <>
                <p>ControleProf</p>
                <div class="container">
                    <h1 class="titulo mb-5">Painel de Controle</h1>
                    <div class="row">
                        <div class="col-md-3 mb-5 cardgeral">
                            <div class="card" style="width: 100%; height: 300px;">
                                <a href="disciplina.html" style="height: 300px;">
                                    <img src="https://prioridadeabsoluta.org.br/wp-content/uploads/2018/07/justiccca7a-850x425.png"
                                        class="card-img-top" alt="" style="opacity: 90%; height: 150px;"></img>
                                    <div class="card-body d-flex flex-column justify-content-between text-center">
                                        <h5 class="card-title">Introdução ao Estudo do Direito</h5>
                                        <p class="card-text">x° Semestre</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            );
}
