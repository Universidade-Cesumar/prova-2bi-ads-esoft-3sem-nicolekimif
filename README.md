# Controle de Estoque - Almoxarifado (Enfermagem)

Este projeto consiste no desenvolvimento da base de um sistema de controle de almoxarifado voltado para a área de saúde (Enfermagem), projetado para substituir o gerenciamento manual e planilhas estáticas de Excel. O sistema visa automatizar fluxos de entrada e saída, facilitando a rotina de quem gerencia o estoque em tempo real.

O projeto Consome uma API REST hospedada na nuvem (MockAPI) para persistência dos dados de forma dinâmica.

---

## 🚀 Funcionalidades Atuais (Sprint 1)

* **Cadastro de Materiais:** Permite adicionar novos itens informando o nome e a quantidade inicial no inventário.
* **Listagem Dinâmica:** Exibe os materiais atualmente cadastrados direto da nuvem assim que a página é carregada.
* **Integração Assíncrona:** Comunicação em tempo real utilizando requisições `GET` e `POST` para a API.

---

## 📌 Requisitos obrigatórios

Para fins de validação automática da entrega, os seguintes identificadores obrigatórios do HTML foram implementados à risca:

* **Input de Nome do Material:** `id="input-nome"`
* **Input de Quantidade:** `id="input-quantidade"`
* **Botão de Cadastrar:** `id="btn-cadastrar"`
* **Tabela ou Lista de Materiais:** `id="lista-materials"`

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estruturação semântica da página de inventário.
* **CSS3:** Estilização básica e organização visual dos elementos.
* **JavaScript:** Manipulação de DOM e consumo da API via `Fetch API` (Async/Await).
* **MockAPI:** Endpoint na nuvem para simular o banco de dados.
