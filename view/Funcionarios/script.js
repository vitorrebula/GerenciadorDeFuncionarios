const url = "http://localhost:8080/Funcionario";
let listaFuncionario = [];

//mostrar todos os funcionários
function showFuncionarios(funcionarios) {
    let tab = `
        <thead>
            <th scope="col" id="col1">#</th>
            <th scope="col" id="col2">Nome</th>
            <th scope="col" id="col3">CPF</th>
            <th scope="col" id="col4">Cargo</th>
            <th scope="col" id="col5">Status</th>
            <th scope="col" id="col6">Editar</th>
        </thead>`;

    funcionarios.forEach(funcionario => {
        tab += `
            <tr>
                <td scope="row">${funcionario.id}</td>
                <td scope="row">${funcionario.username}</td>
                <td scope="row" id="cpfscope">${funcionario.cpf}</td>
                <td scope="row" id="cargoscope">${funcionario.cargo}</td>
                <td scope="row" id="statuscope">${funcionario.status}</td>
                <td scope="row" id="editLittleBtn"><!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" id="btnModal${funcionario.id}">
                </button>
                
                <!-- Modal -->
                <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Insira os novos dados</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body" id="modalEditar">
                      </div>
                    </div>
                  </div>
                </div></td>
            </tr>
        `;
    });

    document.getElementById("funcionarios").innerHTML = tab;
}

async function getAllAPI(url) {
    try {
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) {
            throw new Error("Erro ao obter dados da API");
        }
        const data = await response.json();
        listaFuncionario = data;
        showFuncionarios(data);
    } catch (error) {
        console.error(error);
    }

}

getAllAPI(url);
// colocar^^ na tela os funcionários do BD









// Função para pesquisar por nome
function pesquisarPorNome(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Obtém o valor inserido no campo de entrada
    const termoPesquisa = document.getElementById("InputBusca").value.trim().toLowerCase();

    // Se o campo de busca estiver vazio, exibir todos os funcionários
    if (termoPesquisa === "") {
        showFuncionarios(listaFuncionario);
        return; // Retorna para evitar a execução do código de filtragem abaixo
    }

    // Filtra a lista de funcionários para encontrar aqueles cujos nomes correspondem ao termo de pesquisa
    const funcionariosFiltrados = listaFuncionario.filter(funcionario => funcionario.username.toLowerCase().includes(termoPesquisa));

    // Chama a função para exibir os funcionários encontrados
    showFuncionarios(funcionariosFiltrados);
}




//editar funcionário, e atualizar informações no bd
document.addEventListener('click', function(event) {  
    const idDoBotao = event.target.id;
    const idDoFuncionario = idDoBotao.replace(/[^\d]/g, "");
    if(idDoBotao.includes("btnModal") || idDoBotao.includes("btnSalvar")) {
        if(idDoBotao.includes("btnModal")) {

            const funcionario = listaFuncionario.find(funcionario => funcionario.id == idDoFuncionario);
            if(funcionario) {
                var modalEditar = document.getElementById("modalEditar");
                modalEditar.innerHTML = `
                    <form>
                        <div class="mb-3">
                            <label for="username" class="form-label">Nome</label>
                            <input type="text" class="form-control" id="usernameEditar" value="${funcionario.username}">
                        </div>
                        <div class="mb-3">
                            <label for="cpf" class="form-label">CPF</label>
                            <input type="text" class="form-control" id="cpfEditar" value="${funcionario.cpf}">
                        </div>
                        <div class="mb-3">
                            <label for="cargo" class="form-label">Cargo</label>
                            <input type="text" class="form-control" id="cargoEditar" value="${funcionario.cargo}">
                        </div>
                        <div class="btn-group d-grid gap-2">
                            <p style="margin:0; border: 0;">Status</p>
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="escolhedorstatus" style="margin-bottom: 1vh">
                                ${funcionario.status}
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><a class="dropdown-item" id="AtivoStatus" href="#">Ativo</a></li>
                                <li><a class="dropdown-item" id="InativoStatus" href="#">Inativo</a></li>
                            </ul>
                        </div>
                        <div class="mb-3">
                            <label for="dataAdmissao" class="form-label">Data de Admissão</label>
                            <input type="text" class="form-control" id="dataAdmissaoEditar" value="${funcionario.dataAdmissao}">
                        </div>
                        <div class="mb-3">
                            <label for="tipoCNH" class="form-label">Tipo de CNH ( Z caso não tenha )</label>
                            <input type="text" class="form-control" id="tipoCNHEditar" value="${funcionario.tipoCNH}">
                        </div>
                        <div class="mb-3">
                            <label for="observacoes" class="form-label">Observações</label>
                            <input type="text" class="form-control rows-3" id="observacoesEditar" value="${funcionario.observacoes}">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="btnSalvar${funcionario.id}">Salvar</button>
                        </div>
                    </form>
                `;
            }
            let novoStatus;

            novoStatus = funcionario.status;

            document.getElementById("AtivoStatus").addEventListener("click", function() {
                // Atribuindo o valor "Ativo" à variável novoStatus quando "AtivoStatus" é clicado
                novoStatus = "Ativo";
                var escolhedorstatus = document.getElementById("escolhedorstatus");
                escolhedorstatus.innerHTML = "Ativo";
            });


            document.getElementById("InativoStatus").addEventListener("click", function() {
                // Atribuindo o valor "Inativo" à variável novoStatus quando "InativoStatus" é clicado
                novoStatus = "Inativo";
                var escolhedorstatus = document.getElementById("escolhedorstatus");
                escolhedorstatus.innerHTML = "Inativo";
            });
            
            document.getElementById(`btnSalvar${idDoFuncionario}`).addEventListener("click", function() {
                const novoNome = document.getElementById("usernameEditar").value;
                const novoCpf = document.getElementById("cpfEditar").value;
                const novoCargo = document.getElementById("cargoEditar").value;
                const novoDataAdmissao = document.getElementById("dataAdmissaoEditar").value;
                const novoTipoCNH = document.getElementById("tipoCNHEditar").value;
                const novoObservacoes = document.getElementById("observacoesEditar").value;

                
                const novoFuncionario = {
                    id: idDoFuncionario,
                    username: novoNome,
                    cpf: novoCpf,
                    cargo: novoCargo,
                    status: novoStatus,
                    dataAdmissao: novoDataAdmissao,
                    tipoCNH: novoTipoCNH,
                    observacoes: novoObservacoes
                };
                fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(novoFuncionario)
                })
                .then(response => response.json())
                .then(data => {
                    getAllAPI(url);
                })
                .catch(error => {
                    console.error(error);
                });
            }); 
        }
    }
});

//adicionar funcionário
document.addEventListener('click', function(event) {
    const idDoBotao = event.target.id;
    if(idDoBotao.includes("btnAdicionar")) {
        const modalAdicionar = document.getElementById("modalAdicionar");
        modalAdicionar.innerHTML = `
            <form>
                <div class="mb-3">
                    <label for="username" class="form-label">Nome</label>
                    <input type="text" class="form-control" id="usernameAdicionar">
                </div>
                <div class="mb-3">
                    <label for="cpf" class="form-label">CPF</label>
                    <input type="text" class="form-control" id="cpfAdicionar">
                </div>
                <div class="mb-3">
                    <label for="cargo" class="form-label">Cargo</label>
                    <input type="text" class="form-control" id="cargoAdicionar">
                </div>
                <div class="btn-group d-grid gap-2">
                        <p style="margin:0; border: 0;">Status</p>
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="escolhedorAddstatus" style="margin-bottom: 1vh">
                            Escolha o Status
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" id="AddAtivStatus" href="#">Ativo</a></li>
                            <li><a class="dropdown-item" id="AddInatStatus" href="#">Inativo</a></li>
                        </ul>
                </div>
                <div class="mb-3">
                    <label for="dataAdmissao" class="form-label">Data de Admissão</label>
                    <input type="text" class="form-control" id="dataAdmissaoAdicionar">
                </div>
                <div class="mb-3">
                    <label for="tipoCNH" class="form-label">Tipo de CNH ( Z caso não tenha )</label>
                    <input type="text" class="form-control" id="tipoCNHAdicionar">
                </div>
                <div class="mb-3">
                    <label for="observacoes" class="form-label">Observações</label>
                    <input type="text" class="form-control rows-3" id="observacoesAdicionar">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="btnSalvarAdicionar">Salvar</button>
                </div>
            </form>
        `;
        let AddStatus;

        document.getElementById("AddAtivStatus").addEventListener("click", function() {
            // Atribuindo o valor "Ativo" à variável novoStatus quando "AtivoStatus" é clicado
            AddStatus = "Ativo";
            var escolhedorAddstatus = document.getElementById("escolhedorAddstatus");
            escolhedorAddstatus.innerHTML = "Ativo";
        });


        document.getElementById("AddInatStatus").addEventListener("click", function() {
            // Atribuindo o valor "Inativo" à variável novoStatus quando "InativoStatus" é clicado
            AddStatus = "Inativo";
            var escolhedorAddstatus = document.getElementById("escolhedorAddstatus");
            escolhedorAddstatus.innerHTML = "Inativo";
        });

        document.getElementById("btnSalvarAdicionar").addEventListener("click", function() {
            const AddNome = document.getElementById("usernameAdicionar").value;
            const AddCpf = document.getElementById("cpfAdicionar").value;
            const AddCargo = document.getElementById("cargoAdicionar").value;
            const AddDataAdmissao = document.getElementById("dataAdmissaoAdicionar").value;
            const AddTipoCNH = document.getElementById("tipoCNHAdicionar").value;
            const AddObservacoes = document.getElementById("observacoesAdicionar").value;

            const AddFuncionario = {
                username: AddNome,
                cpf: AddCpf,
                cargo: AddCargo,
                status: AddStatus,
                dataAdmissao: AddDataAdmissao,
                tipoCNH: AddTipoCNH,
                observacoes: AddObservacoes
            };

            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(AddFuncionario)
            })
            .then(response => response.json())
            .then(data => {
                getAllAPI(url);
            })
            .catch(error => {
                console.error(error);
            });
        }); 
    }
});














   
//mostrarInativos, ou Ativos ou Todos
document.addEventListener("DOMContentLoaded", function() {
    var inativos = document.getElementById("Inativos");
    var ativos = document.getElementById("Ativos");
    var todos = document.getElementById("Todos");
    if (inativos) {
        inativos.onclick = function() {
            const funcionariosFiltrados = listaFuncionario.filter(funcionario => funcionario.status === "Inativo");
            showFuncionarios(funcionariosFiltrados);
            var escolhedor = document.getElementById("escolhedorvisualizacao");
            escolhedor.innerHTML = "Inativos";
        }
    }
    if (ativos) {
        ativos.onclick = function() {
            const funcionariosAtivos = listaFuncionario.filter(funcionario => funcionario.status === "Ativo");
            showFuncionarios(funcionariosAtivos);
            var escolhedor = document.getElementById("escolhedorvisualizacao");
            escolhedor.innerHTML = "Ativos";
        }
    
    }
    if(todos) {
        todos.onclick = function() {
            showFuncionarios(listaFuncionario);
            var escolhedor = document.getElementById("escolhedorvisualizacao");
            escolhedor.innerHTML = "Todos";
        }
    }
    var formBusca = document.querySelector('form[role="search"]');
    formBusca.addEventListener("submit", pesquisarPorNome);

});