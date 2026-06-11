const API_URL = "https://6a29d990f59cb8f65f1daa0e.mockapi.io/materiais";

const inputNome = document.getElementById("input-nome");
const inputQuantidade = document.getElementById("input-quantidade");
const btnCadastrar = document.getElementById("btn-cadastrar");
const listaMateriais = document.getElementById("lista-materiais");
const formCadastro = document.getElementById("form-cadastro");

async function buscarMateriais() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erro ao buscar dados");
        
        const materiais = await response.json();
        renderizarTabela(materiais);
    } catch (error) {
        console.error("Erro no GET:", error);
    }
}

function renderizarTabela(materiais) {
    listaMateriais.innerHTML = ""; 
    materiais.forEach(material => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${material.nome}</td>
            <td>${material.quantidade}</td>
        `;
        listaMateriais.appendChild(tr);
    });
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

        if (!response.ok) throw new Error("Erro ao salvar");

        formCadastro.reset();
        buscarMateriais(); // Recarrega a lista atualizada

    } catch (error) {
        console.error("Erro no POST:", error);
    }
});