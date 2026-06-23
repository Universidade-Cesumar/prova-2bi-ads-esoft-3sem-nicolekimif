const API_URL = "https://6a29d990f59cb8f65f1daa0e.mockapi.io/materiais";

const inputNome = document.getElementById("input-nome");
const inputQuantidade = document.getElementById("input-quantidade");
const listaMateriais = document.getElementById("lista-materiais");
const formCadastro = document.getElementById("form-cadastro");

const inputBusca = document.getElementById("input-busca");
const totalItens = document.getElementById("total-itens");

let todosOsMateriais = [];

function validarRetirada(estoqueAtual, quantidadeRetirada) {
    if (quantidadeRetirada <= 0 || quantidadeRetirada > estoqueAtual) {
        return false;
    }
    return true;
}

async function buscarMateriais() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erro ao buscar dados da API");
        
        const materiais = await response.json();
        renderizarTabela(materiais);
    } catch (error) {
        console.error("Erro na requisição GET:", error);
    }
}

function renderizarTabela(materiais) {
    listaMateriais.innerHTML = ""; 

    totalItens.textContent = materiais.length;

    materiais.forEach(material => {
        const tr = document.createElement("tr");
        
        if (material.quantidade < 10) {
            tr.classList.add("estoque-critico");
        }

        tr.innerHTML = `
            <td>${material.nome}</td>
            <td><strong>${material.quantidade}</strong></td>
            <td>
                <input type="number" class="input-retirada-item" placeholder="Qtd" min="1" id="input-retirada">
            </td>
            <td>
                <button class="btn-baixar" data-id="${material.id}" data-estoque="${material.quantidade}">Retirar</button>
                <button class="btn-excluir" data-id="${material.id}">Excluir</button>
            </td>
        `;
        
        listaMateriais.appendChild(tr);
    });

    atribuirEventosAcoes();
}

inputBusca.addEventListener("input", (event) => {
    const termoPesquisa = event.target.value.toLowerCase();
    
    const materiaisFiltrados = todosOsMateriais.filter(material => 
        material.nome.toLowerCase().includes(termoPesquisa)
    );
    
    renderizarTabela(materiaisFiltrados);
});

function atribuirEventosAcoes() {
    document.querySelectorAll(".btn-baixar").forEach(botao => {
        botao.addEventListener("click", async (event) => {
            const id = event.target.getAttribute("data-id");
            const estoqueAtual = parseInt(event.target.getAttribute("data-estoque"), 10);
            
            const linha = event.target.closest("tr");
            const inputRetirada = linha.querySelector("#input-retirada");
            const quantidadeRetirada = parseInt(inputRetirada.value, 10);

            if (!validarRetirada(estoqueAtual, quantidadeRetirada)) {
                alert("Operação inválida! Verifique se o valor é negativo ou maior que o estoque.");
                return;
            }

            const novoEstoque = estoqueAtual - quantidadeRetirada;
            await executarBaixaEstoque(id, novoEstoque);
        });
    });

    document.querySelectorAll(".btn-excluir").forEach(botao => {
        botao.addEventListener("click", async (event) => {
            const id = event.target.getAttribute("data-id");
            if (confirm("Deseja realmente excluir este material?")) {
                await executarExclusao(id);
            }
        });
    });
}

async function executarBaixaEstoque(id, novoEstoque) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantidade: novoEstoque })
        });

        if (response.ok) {
            buscarMateriais(); 
        } else {
            throw new Error("Erro ao atualizar o estoque no servidor.");
        }
    } catch (error) {
        console.error("Erro na requisição PUT:", error);
    }
}

async function executarExclusao(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            buscarMateriais(); 
        } else {
            throw new Error("Erro ao excluir o item no servidor.");
        }
    } catch (error) {
        console.error("Erro na requisição DELETE:", error);
    }
}

formCadastro.addEventListener("submit", async (event) => {
    event.preventDefault(); 
    const novoMaterial = {
        nome: inputNome.value,
        quantidade: parseInt(inputQuantidade.value, 10)
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoMaterial)
        });

        if (response.ok) {
            formCadastro.reset();
            buscarMateriais();
        }
    } catch (error) {
        console.error("Erro na requisição POST:", error);
    }
});

buscarMateriais();