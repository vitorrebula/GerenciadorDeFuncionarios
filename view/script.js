const url = "http://localhost:8080/Funcionario";
let listaFuncionario = [];

function showFuncionarios(funcionarios) {
    let tab = `
        <thead>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">CPF</th>
            <th scope="col">Cargo</th>
            <th scope="col">Status</th>
            <th scope="col">Editar</th>
        </thead>`;

    funcionarios.forEach(funcionario => {
        tab += `
            <tr>
                <td scope="row">${funcionario.id}</td>
                <td scope="row">${funcionario.username}</td>
                <td scope="row">${funcionario.cpf}</td>
                <td scope="row">${funcionario.cargo}</td>
                <td scope="row" id="status">${funcionario.status}</td>
                <td scope="row"><!-- Button trigger modal -->
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











//pesquisa por nome
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

//editar funcionário
document.addEventListener('click', function(event) {  
    const idDoBotao = event.target.id;
    const idDoFuncionario = idDoBotao.replace(/[^\d]/g, "");
    console.log(idDoBotao);
    if(idDoBotao.includes("btnModal") || idDoBotao.includes("btnSalvar")) {
        if(idDoBotao.includes("btnModal")) {

            const funcionario = listaFuncionario.find(funcionario => funcionario.id == idDoFuncionario);
            console.log(funcionario);
            if(funcionario) {
                var modalBody = document.getElementById("modalEditar");
                modalBody.innerHTML = `
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
                        <div class="mb-3">
                            <label for="status" class="form-label">Status</label>
                            <input type="text" class="form-control" id="statusEditar" value="${funcionario.status}">
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
                            <input type="text" class="form-control" id="observacoesEditar" value="${funcionario.observacoes}">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-primary" id="btnSalvar${funcionario.id}">Salvar</button>
                        </div>
                    </form>
                `;
            }
            
            console.log(idDoFuncionario);
            document.getElementById(`btnSalvar${idDoFuncionario}`).addEventListener("click", function() {
                const novoNome = document.getElementById("usernameEditar").value;
                const novoCpf = document.getElementById("cpfEditar").value;
                const novoCargo = document.getElementById("cargoEditar").value;
                const novoStatus = document.getElementById("statusEditar").value;
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
                console.log(novoStatus);
                console.log(this.novoFuncionario);
                fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(novoFuncionario)
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    getAllAPI(url);
                })
                .catch(error => {
                    console.error(error);
                });
            }); 
        }
    }
});


   
//mostrarInativos
document.addEventListener("DOMContentLoaded", function() {
    var inativos = document.getElementById("inativos");
    var ativos = document.getElementById("ativos");
    if (inativos) {
        inativos.onclick = function() {
            const funcionariosFiltrados = listaFuncionario.filter(funcionario => funcionario.status === "Inativo");
            showFuncionarios(funcionariosFiltrados);
        }
    }
    if (ativos) {
        ativos.onclick = function() {
            const funcionariosAtivos = listaFuncionario.filter(funcionario => funcionario.status === "Ativo");
            showFuncionarios(funcionariosAtivos);
        }
    
    }
    var formBusca = document.querySelector('form[role="search"]');
    formBusca.addEventListener("submit", pesquisarPorNome);

});