# Controle de Estoque - Almoxarifado (Enfermagem)

Este projeto consiste no desenvolvimento da base de um sistema de controle de almoxarifado voltado para a área de saúde (Enfermagem), projetado para substituir o gerenciamento manual e planilhas estáticas de Excel. O sistema visa automatizar fluxos de entrada e saída, facilitando a rotina de quem gerencia o estoque em tempo real.

O projeto Consome uma API REST hospedada na nuvem (MockAPI) para persistência dos dados de forma dinâmica.

---

## Funcionalidades (Sprint 1)

* **Cadastro de Materiais:** Permite adicionar novos itens informando o nome e a quantidade inicial no inventário.
* **Listagem Dinâmica:** Exibe os materiais atualmente cadastrados direto da nuvem assim que a página é carregada.
* **Integração Assíncrona:** Comunicação em tempo real utilizando requisições `GET` e `POST` para a API.

---

## Funcionalidades (Sprint 2)

* **Módulo de Retirada (Baixa de Estoque):** Permite subtrair uma quantidade específica de um item diretamente na linha da tabela através de uma requisição assíncrona `PUT`.
* **Exclusão de Insumos:** Permite remover definitivamente um material do inventário e do servidor através do método `DELETE`.
* **Lógica de Validação Rigorosa:** Implementação de uma camada de segurança que impede que o sistema aceite números negativos, zerados ou saídas maiores do que o saldo real disponível em estoque.

---

## Requisitos obrigatórios (Sprint 1)

Para fins de validação automática da entrega, os seguintes identificadores obrigatórios do HTML foram implementados à risca:

* **Input de Nome do Material:** `id="input-nome"`
* **Input de Quantidade:** `id="input-quantidade"`
* **Botão de Cadastrar:** `id="btn-cadastrar"`
* **Tabela ou Lista de Materiais:** `id="lista-materials"`

---

## Requisitos obrigatórios (Sprint 2)

Para fins de validação automática da entrega, os seguintes identificadores obrigatórios do HTML foram implementados à risca:

* **Input de Quantidade a Retirar:** `id="input-retirada"`
* **Botão de Confirmar Baixa (Classe):** `class="btn-baixar"`
* **Botão de Excluir Item (Classe):** `class="btn-excluir"`

---

## Tecnologias Utilizadas

* **HTML5:** Estruturação semântica da página de inventário.
* **CSS3:** Estilização básica e organização visual dos elementos.
* **JavaScript:** Manipulação de DOM e consumo da API via `Fetch API` (Async/Await).
* **MockAPI:** Endpoint na nuvem para simular o banco de dados.





const API_URL = "https://6a29d990f59cb8f65f1daa0e.mockapi.io/materiais";

const inputNome = document.getElementById("input-nome");
const inputQuantidade = document.getElementById("input-quantidade");
const listaMateriais = document.getElementById("lista-materiais");
const formCadastro = document.getElementById("form-cadastro");

// [Sprint 3] Mapeamento dos novos elementos do Dashboard e Filtro
const inputBusca = document.getElementById("input-busca");
const totalItens = document.getElementById("total-itens");

// Variável global para armazenar a lista vinda da API e permitir a busca em tempo real
let todosOsMateriais = [];

// Função de Validação Lógica (Sprint 2)
function validarRetirada(estoqueAtual, quantidadeRetirada) {
    if (quantidadeRetirada <= 0 || quantidadeRetirada > estoqueAtual) {
        return false;
    }
    return true;
}

// [0,5 pt] Conexão GET com tratamento de erro try/catch estruturado
async function buscarMateriais() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erro ao buscar dados da API");
        
        todosOsMateriais = await response.json();
        
        // table e dashboard atualizados
        renderizarTabela(todosOsMateriais);
    } catch (error) {
        console.error("Erro na requisição GET:", error);
        alert("Não foi possível carregar os dados. Verifique sua conexão com a internet.");
    }
}

// [0,5 pt] Renderização dinâmica da tabela com Dashboard e Alertas Críticos
function renderizarTabela(materiais) {
    listaMateriais.innerHTML = ""; 

    // Atualiza o contador de itens cadastrados no painel
    totalItens.textContent = materiais.length;

    materiais.forEach(material => {
        const tr = document.createElement("tr");
        
        // [0,5 pt] Regra de estoque crítico (menor que 10 unidades)
        if (material.quantidade < 10) {
            tr.classList.add("estoque-critico");
        }
        
        // [CORRIGIDO]: Incluído a célula do ID para alinhar com os cabeçalhos do HTML
        tr.innerHTML = `
            <td>${material.id}</td>
            <td>${material.nome}</td>
            <td><strong>${material.quantidade}</strong></td>
            <td>
                <input type="number" class="input-retirada-item" placeholder="Qtd" min="1" id="input-retirada">
            </td>
            <td>
                <button class="btn-baixar" data-id="${material.id}" data-estoque="${material.quantidade}">Baixar</button>
                <button class="btn-excluir" data-id="${material.id}">Excluir</button>
            </td>
        `;
        
        listaMateriais.appendChild(tr);
    });

    atribuirEventosAcoes();
}

// [0,5 pt] Filtro dinâmico: Escuta a digitação na barra de pesquisa
inputBusca.addEventListener("input", (event) => {
    const termoPesquisa = event.target.value.toLowerCase();
    
    // Filtra os itens com base no nome digitado
    const materiaisFiltrados = todosOsMateriais.filter(material => 
        material.nome.toLowerCase().includes(termoPesquisa)
    );
    
    // Renderiza apenas os itens correspondentes à busca
    renderizarTabela(materiaisFiltrados);
});

// Vincula funções de clique para os botões de cada linha
function atribuirEventosAcoes() {
    document.querySelectorAll(".btn-baixar").forEach(botao => {
        botao.addEventListener("click", async (event) => {
            const id = event.target.getAttribute("data-id");
            const estoqueAtual = parseInt(event.target.getAttribute("data-estoque"), 10);
            
            const linha = event.target.closest("tr");
            const inputRetirada = linha.querySelector("#input-retirada");
            const quantidadeRetirada = parseInt(inputRetirada.value, 10);

            // [CORRIGIDO]: Removido o termo inválido quantityRetirada que causava ReferenceError
            if (!validarRetirada(estoqueAtual, quantidadeRetirada)) {
                alert("Operação inválida! Valor negativo ou maior que o estoque.");
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

// [0,5 pt] Conexão PUT com bloco try/catch para segurança
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
        alert("Erro ao reduzir estoque. Tente novamente mais tarde.");
    }
}

// [0,5 pt] Conexão DELETE com bloco try/catch para segurança
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
        alert("Não foi possível excluir o item. Tente novamente.");
    }
}

// Conexão POST (Sprint 1) com bloco try/catch para segurança
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
        } else {
            throw new Error("Erro ao salvar material.");
        }
    } catch (error) {
        console.error("Erro na requisição POST:", error);
        alert("Erro de rede ao cadastrar. Verifique sua conexão.");
    }
});

// Inicialização
buscarMateriais();