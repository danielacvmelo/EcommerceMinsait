# 🛍️ Minsait Store - Projeto Final Angular

Este projeto é um **E-commerce Completo** desenvolvido como avaliação final do módulo de Angular. A aplicação consome uma API REST em Java e oferece funcionalidades de compra (Carrinho) e gestão de produtos (CRUD).

## 🚀 Tecnologias Utilizadas

* **Front-end:** Angular 18 (Standalone Components)
* **Estilização:** Bootstrap 5 & Bootstrap Icons (Tema Dark/Cyber)
* **Back-end:** Java Spring Boot (API REST)
* **Banco de Dados:** PostgreSQL (via Docker)
* **Gerenciamento de Estado:** RxJS (BehaviorSubject)

---

## ⚙️ Pré-requisitos

Para rodar este projeto, você precisa ter a **API Java rodando**.
Certifique-se de que o Back-end está ativo na porta `8080` e o banco de dados PostgreSQL está subido via Docker.

---

## 📦 Como Rodar o Projeto

Siga os passos abaixo para iniciar a aplicação Front-end:

1.  **Instalar dependências:**
    Abra o terminal na pasta do projeto e execute:
    ```bash
    npm install
    ```

2.  **Executar o servidor de desenvolvimento:**
    ```bash
    ng serve
    ```

3.  **Acessar a aplicação:**
    Abra o navegador em: `http://localhost:4200`

---

## ✨ Funcionalidades Implementadas

### 🛒 Módulo Cliente (Loja)
* **Home Page:** Vitrine de produtos consumindo a API real.
* **Carrinho de Compras:**
    * Adicionar produtos (atualiza contador no Header).
    * Listagem de itens com cálculo automático de Subtotal e Total.
    * Remoção de itens.
    * **Persistência:** Os dados do carrinho são salvos no `LocalStorage` (não somem ao atualizar a página).
* **Validações Visuais:** Botão de compra desabilita se o estoque for 0.

### 🔧 Módulo de Gestão (CRUD)
Acesse através do link **"Gerenciar"** no menu superior.
* **Listagem (Read):** Tabela administrativa com dados dos produtos.
* **Cadastro (Create):** Formulário com validações (Reactive Forms) para criar novos produtos.
* **Edição (Update):** Carregamento dos dados existentes para alteração.
* **Exclusão (Delete):** Remoção de produtos (com verificação de integridade referencial da API).

---

## 📂 Estrutura do Projeto

O código foi organizado seguindo as boas práticas de separação de responsabilidades:

* **`src/app/components`**: Componentes reutilizáveis (apenas exibição).
    * `header`, `hero`, `products-cards`, `products-list`, `product-table`.
* **`src/app/pages`**: Componentes de página "inteligentes" (conectam com serviços).
    * `home`, `cart`, `admin`, `product-form`.
* **`src/app/services`**: Lógica de negócios e comunicação HTTP.
    * `product.service.ts` (API Java).
    * `cart.service.ts` (Regras do Carrinho e LocalStorage).
* **`src/app/models`**: Interfaces TypeScript (`Product`, `CartItem`).

---
