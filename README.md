# Link do Projeto em Produção:[https://universidade-cesumar.github.io/prova-2bi-ads-esoft-3sem-nicolekimif/]

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

### Funcionalidades (Sprint 3)
* **Barra de Pesquisa Dinâmica:** Permite filtrar e encontrar insumos instantaneamente pelo nome enquanto o utilizador digita.
* **Dashboard Informativo:** Exibe o totalizador em tempo real com a contagem exata de itens cadastrados no sistema.
* **Alertas de Estoque Crítico:** Identifica de forma visual e imediata qualquer material que possua menos de 10 unidades em estoque, colorindo a linha da tabela.
* **Tratamento de Erros:** Implementação rigorosa de segurança para evitar falhas ou quebras silenciosas em caso de oscilações na rede de internet.

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

## Requisitos obrigatórios (Sprint 3)

* **Input de Pesquisa:** `id="input-busca"` 
* **Totalizador de Itens:** `id="total-itens"` 
* **Classe para Estoque Crítico:** `class="estoque-critico"` 

---

## Tecnologias Utilizadas

* **HTML5:** Estruturação semântica da página de inventário.
* **CSS3:** Estilização básica e organização visual dos elementos.
* **JavaScript:** Manipulação de DOM e consumo da API via `Fetch API` (Async/Await).
* **MockAPI:** Endpoint na nuvem para simular o banco de dados.
