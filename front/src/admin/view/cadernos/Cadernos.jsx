// components/OutroComponente.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../assets/css/users.css';
import 'font-awesome/css/font-awesome.min.css';
import { masterPath, version } from '../../../config/config';

//LIBS
import Swal from 'sweetalert2';


//componente
import Header from "../Header";
import Pagination from '../../components/Pagination';
import Spinner from '../../../components/Spinner';
import MsgConfirm from '../../components/MsgConfirm';
import ColumnFilter from '../../components/ColumnFilter';

const Cadernos = () => {
    const [estados, setEstado] = useState([]);
    const [cidade, setCidade] = useState([]);
    const [cidadeBusca, setCidadeBusca] = useState({});
    const [paginasTotal, setPaginas] = useState();
    const [paginaAtual, setPaginaAtual] = useState();
    const [selectId, setSelectId] = useState();
    const [showSpinner, setShowSpinner] = useState(false);
    const [totalRegistro, setTotalRegistro] = useState();
    const [exportTodos, setExpotTodos] = useState(false);
    const [countPerfis, setCountPerfis] = useState([]);
    const [statusCount, setStatusCount] = useState(false);
    const [buscaAtiva, setBuscaAtiva] = useState(false);
    const [showMsgBox, setShowMsgBox] = useState(false);
    const [selUF, setSelUF] = useState([]);
    const [selCaderno, setSelCaderno] = useState([]);
    const [selMosaico, setSelMosaico] = useState([]);
    const [selCEPI, setSelCEPI] = useState([]);
    const [selCEPF, setSelCEPF] = useState([]);
    const [selBasico, setSelBasico] = useState([]);
    const [selCompleto, setSelCompleto] = useState([]);
    const [selTotal, setSelTotal] = useState([]);

    const location = useLocation();
    const navigator = useNavigate();


    const getParam = new URLSearchParams(location.search);

    const param = getParam.get('page') ? getParam.get('page') : 1;
    const buscaParam = getParam.get('search')

    const tokenAuth = sessionStorage.getItem('userTokenAccess');

    function buscarPerfisPorCaderno(registros) {
        
/*         const arrRegistros = registros.map(item => item.nomeCaderno)

        fetch(`${masterPath.url}/admin/cadernos/count/perfis?uf=${registros[0].UF}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: arrRegistros
            })
          })
             .then((x) => x.json())
             .then((res) => {
                 //console.log("dasdasd", res);  
                 setCountPerfis(res);
                 setStatusCount(true);

             })   */
     }

    useEffect(() => {
        if(buscaParam === "true") {
            setShowSpinner(true);
            setCidade([]);
            setCountPerfis([]);
            setStatusCount(false);
            const campoPesquisa = document.getElementById('buscar').value;
              fetch(`${masterPath.url}/admin/cadernos/buscar/?search=${campoPesquisa}&page=${param}`, {
                  headers: { "authorization": 'Bearer ' + tokenAuth }
              })
                 .then((x) => x.json())
                 .then((res) => {
                     //console.log(res);
                     //setEstado(res.data.estados);
                     setCidade(res.message.registros);
                     setPaginas(res.message.totalPaginas);
                     setPaginaAtual(res.message.paginaAtual);
                     setShowSpinner(false);
                     setTotalRegistro(res.message.totalItem);
    
                     buscarPerfisPorCaderno(res.message.registros)
                     
                 })  
        } else {
            setShowSpinner(true);
            setCidade([]);
            setCountPerfis([]);
            setStatusCount(false);
              fetch(`${masterPath.url}/admin/cadernos?page=${param}`, {
                  headers: { "authorization": 'Bearer ' + tokenAuth }
              })
                 .then((x) => x.json())
                 .then((res) => {
                     //console.log(res);
                     //setEstado(res.data.estados);
                     setCidade(res.message.anuncios);
                     setPaginas(res.message.totalPaginas);
                     setPaginaAtual(res.message.paginaAtual);
                     setShowSpinner(false);
                     setTotalRegistro(res.message.totalItem);
    
                     buscarPerfisPorCaderno(res.message.anuncios)
                     
                 })  
        }


            

         
       // fetchData()
        async function fetchData() {
            const response = await fetch(`${masterPath.url}/admin/cadernos?page=${param}`, {
                headers: { "authorization": 'Bearer ' + tokenAuth }
            });
            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let buffer = [];


            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                //console.log(decoder.decode(value, { stream: true }))

                // buffer.push(decoder.decode(value, { stream: true }));

                let objReadble = JSON.parse(decoder.decode(value, { stream: true }))

                //console.log(objReadble)
                if (!Object.keys(objReadble).includes("totalItens")) {
                    setCidade(prev => [...prev, JSON.parse(decoder.decode(value, { stream: true })).caderno]);
                } else {
                    setPaginas(objReadble.totalPaginas);
                    setPaginaAtual(objReadble.paginaAtual);
   
                    setTotalRegistro(objReadble.totalItens);
                }




                // Processa e renderiza os registros à medida que chegam
                /*  const parts = buffer.split(',');
                 for (let i = 0; i < parts.length - 1; i++) {
                     const record = JSON.parse(parts[i]);
                     renderRecord(record); // Função para renderizar o registro
                 }
                 buffer = parts[parts.length - 1];  */// Mantém o buffer incompleto
            }
            //console.log(buffer)
            console.log('Streaming completo');
            setShowSpinner(false);
        }

        function renderRecord(record) {
            // Lógica para renderizar os dados no front-end
            console.log('Registro recebido:', record);
        }
    }, [param]);


    function selecaoLinha(event) {

        var linhas = document.querySelectorAll('tbody tr');
        // Remove a classe 'selecionada' de todas as linhas
        linhas.forEach(function (outraLinha) {
            outraLinha.classList.remove('selecionada');
        });

        setSelectId(event.currentTarget.id)

        // Adiciona a classe 'selecionada' à linha clicada
        event.currentTarget.classList.add('selecionada');
        console.log(event.currentTarget.id)

        return;
    };

    function slecionarQuantidadeLinhas(e) {

        setShowSpinner(true);
        fetch(`${masterPath.url}/admin/cadernos?page=${param}&rows=${e.target.value}`, {
            headers: { "authorization": 'Bearer ' + tokenAuth }
        })
            .then((x) => x.json())
            .then((res) => {
                //setEstado(res.data.estados);
                setCidade(res.message.anuncios);
                setPaginas(res.message.totalPaginas)
                setShowSpinner(false);
                setTotalRegistro(res.message.anuncios.length);

                console.log(res.message.anuncios.length);
                
                //console.log(res.message);
            })
    };

    function buscarRegistro() {
        setShowSpinner(true);
        setCountPerfis([]);
        setBuscaAtiva(true);
        setStatusCount(false);
        const campoPesquisa = document.getElementById('buscar').value;
        fetch(`${masterPath.url}/admin/cadernos/buscar/?search=${campoPesquisa}`, {
            headers: { "authorization": 'Bearer ' + tokenAuth }
        })
            .then((x) => x.json())
            .then((res) => {
                //console.log("fsdfsdfasd", )
                if (res.success) {
                    setShowSpinner(false);
                    alert("Encontrado " + res.message.totalItem + " registros");
                    setCidade(res.message.registros);
                    setPaginas(res.message.totalPaginas);
                    setCidadeBusca(res.message.registros);
                    setTotalRegistro(res.message.totalItem);
                    setExpotTodos(true);

                    buscarPerfisPorCaderno(res.message.registros)
                } else {
                    setShowSpinner(false);
                    alert("registro não encontrado na base de dados");
                }

            })
    };

    function apagarCaderno() {
        setShowSpinner(true);
        fetch(`${masterPath.url}/admin/cadernos/delete/${selectId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": 'Bearer ' + tokenAuth
            },
        })
            .then((x) => {
                if (x.status === 401) {
                    navigate('/login');
                    return Promise.reject('Sessão expirada');
                }
                if (x.status === 409) {
                    setShowSpinner(false);
                    return x.json().then((data) => {
                        Swal.fire("Bloqueado", data.message, "warning");
                        return Promise.reject(data.message);
                    });
                }
                return x.json();
            })
            .then((res) => {
                if (res && res.success) {
                    setShowSpinner(false);
                    Swal.fire({
                        title: 'sucesso!',
                        text: 'Registro apagado!',
                        icon: 'success',
                        confirmButtonText: 'Confirmar'
                    })
                    document.querySelector(".selecionada")?.remove();
                }
            })
            .catch(() => { setShowSpinner(false); })
    };


    const style = {
        position: "fixed",
        zIndex: "999"
    }

    function exportExcell() {
        setShowSpinner(true);
        fetch(`${masterPath.url}/admin/export/cadernos?exportAll=${exportTodos}&limit=5000`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": 'Bearer ' + tokenAuth
            },
            body: JSON.stringify(cidadeBusca)
        })
            .then(x => x.blob())
            .then(res => {
                const url = window.URL.createObjectURL(res);
                const a = document.createElement("a");
                a.href = url;
                a.download = "planilha.xlsx"; // Define o nome do arquivo
                document.body.appendChild(a);
                a.click(); // Força o clique para baixar
                document.body.removeChild(a); // Remove o elemento depois do clique
                window.URL.revokeObjectURL(url); // Libera memória
                setShowSpinner(false);
                if (res.success) {
                    setShowSpinner(false);
                    console.log(res);
                    window.location.href = res.downloadUrl;
                }
            })
    };


    const cidadeFiltrada = (cidade || []).filter(item => {
        const matchUF = selUF.length === 0 || selUF.includes(item.UF || '');
        const matchCaderno = selCaderno.length === 0 || selCaderno.includes(item.nomeCaderno || '');
        const matchMosaico = selMosaico.length === 0 || selMosaico.includes(item.descImagem ? 'SIM' : 'NÃO');
        const matchCEPI = selCEPI.length === 0 || selCEPI.includes(item.cep_inicial || '');
        const matchCEPF = selCEPF.length === 0 || selCEPF.includes(item.cep_final || '');
        const matchBasico = selBasico.length === 0 || selBasico.includes(String(item.basico));
        const matchCompleto = selCompleto.length === 0 || selCompleto.includes(String(item.completo));
        const matchTotal = selTotal.length === 0 || selTotal.includes(String(item.total));
        return matchUF && matchCaderno && matchMosaico && matchCEPI && matchCEPF && matchBasico && matchCompleto && matchTotal;
    });

    return (
        <div className="Cadernos">
      {/*       <header style={style} className='w-100'>
                <Header />
            </header> */}
            <section>

                {showSpinner && <Spinner />}
                {showMsgBox && <MsgConfirm
                    title={"Atenção!"}
                    msg={"Tem certeza que deseja excluir este caderno?"}
                    btnTitle={"Excluir"}
                    funAction={apagarCaderno}
                    setShowMsgBox={setShowMsgBox} />}

                <h1 className="px-4">Cadernos</h1>
                <div className="container-fluid py-4 px-4">
                    <div className="row margin-bottom-10">
                        <div className="span6 col-md-6">
                            <button type="button" className="btn custom-button" onClick={() => navigator('/admin/cadernos/cadastro')}>Adicionar</button>
                            <button type="button" className="btn btn-info custom-button mx-2 text-light" onClick={() => navigator(`/admin/cadernos/editar?id=${selectId}`)}>Editar</button>
                            <button type="button" className="btn btn-danger custom-button text-light" onClick={() => setShowMsgBox(true)}>Apagar</button>
                            {/* <select title="selecionarLinhas" name="selecionarLinhas" id="selecionarLinhas"
                                className="btn btn-success custom-button text-light mx-2"
                                onChange={slecionarQuantidadeLinhas}>
                                <option value="10">Ver 10 registros</option>
                                <option value="50">Ver 50 registros</option>
                                <option value="100">Ver 100 registros</option>
                                <option value="5630">Ver todos registros</option>
                            </select> */}
                            <button type="button" className="btn custom-button mx-2" onClick={exportExcell}>Exportar</button>
                        </div>
                        <div className="span6 col-md-6">
                            <div className="pull-right d-flex justify-content-center align-items-center">
                                <input id="buscar" type="text" placeholder="Buscar por UF ou Caderno" />
                                <button id="btnBuscar" className="" type="button" onClick={buscarRegistro}>
                                    <i className="icon-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <article>
                    <div className="container-fluid">
                        <div className='row px-4'>
                            <table className="table table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>UF <ColumnFilter values={cidade.map(i => i.UF)} selected={selUF} onChange={setSelUF} /></th>
                                        <th>CADERNO <ColumnFilter values={cidade.map(i => i.nomeCaderno)} selected={selCaderno} onChange={setSelCaderno} /></th>
                                        <th>MOSAICO <ColumnFilter values={cidade.map(i => i.descImagem ? 'SIM' : 'NÃO')} selected={selMosaico} onChange={setSelMosaico} /></th>
                                        <th>CEP_INICIAL <ColumnFilter values={cidade.map(i => i.cep_inicial)} selected={selCEPI} onChange={setSelCEPI} /></th>
                                        <th>CEP_FINAL <ColumnFilter values={cidade.map(i => i.cep_final)} selected={selCEPF} onChange={setSelCEPF} /></th>
                                        <th>BÁSICOS <ColumnFilter values={cidade.map(i => String(i.basico))} selected={selBasico} onChange={setSelBasico} /></th>
                                        <th>COMPLETOS <ColumnFilter values={cidade.map(i => String(i.completo))} selected={selCompleto} onChange={setSelCompleto} /></th>
                                        <th>TOTAL <ColumnFilter values={cidade.map(i => String(i.total))} selected={selTotal} onChange={setSelTotal} /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cidadeFiltrada.map((item) => (
                                        <tr onClick={selecaoLinha} key={item.id_uf} id={item.codCaderno}>
                                            <td>{item.UF}</td>
                                            <td>{item.nomeCaderno}</td>
                                            {item.descImagem != '' ? <td>SIM</td> : <td>NÃO</td>}
                                            <td>{item.cep_inicial}</td>
                                            <td>{item.cep_final}</td>
                                            <td>{item.basico}</td>
                                            <td>{item.completo}</td>
                                            <td>{item.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <Pagination totalPages={paginasTotal} paginaAtual={paginaAtual} totalItem={totalRegistro} table={"cadernos"} busca={buscaAtiva} />


                </article>
                <p className='w-100 text-center'>© MINISITIO - {version.version}</p>
            </section>
        </div>
    );
}

export default Cadernos;
