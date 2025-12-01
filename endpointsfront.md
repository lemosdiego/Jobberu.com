# Guia de Endpoints para o Front-end

Este documento serve como um mapa para o desenvolvimento do front-end, detalhando quais endpoints da API devem ser consumidos em cada tela principal da aplicação.

---

## Tela 1: Tela Inicial / Busca de Prestadores

**Objetivo:** O visitante digita uma cidade e vê uma lista de cards de prestadores que atendem naquela região.

**Endpoint Principal:** `GET /usuario/prestadores/cidade/:cidade`

- **Como Usar:**

  1.  O front-end terá um campo de busca. Quando o usuário digitar "São Paulo" e clicar em "Buscar", o front-end deve formatar o texto para `Sao-Paulo` (trocando espaços por hifens).
  2.  O front-end então faz uma chamada para `http://sua-api.com/usuario/prestadores/cidade/Sao-Paulo`.
  3.  A API retornará um array de objetos, onde cada objeto é um prestador pronto para ser exibido em um card. O front-end usará uma função como `.map()` para renderizar um card para cada item do array.

- **Dados Recebidos (Exemplo para 1 Card):**
  ```json
  {
    "prestadores": [
      {
        "id": 15,
        "nome": "João da Silva Eletricista",
        "foto_perfil_url": "https://res.cloudinary.com/...",
        "titulo_profissional": "Eletricista Residencial e Predial",
        "biografia": "Mais de 10 anos de experiência com instalações elétricas...",
        "cidade": "São Paulo",
        "estado": "SP",
        "total_avaliacoes": 25,
        "soma_das_notas": 120,
        "primeiro_servico": {
          "imagem_url": "https://res.cloudinary.com/...",
          "preco": "150.00",
          "categoria": "Instalação Elétrica"
        }
      }
    ]
  }
  ```
  **Nota para o Front-end:** A nota média deve ser calculada no front-end: `soma_das_notas / total_avaliacoes`.

---

## Tela 2: Perfil Público do Prestador

**Objetivo:** O usuário clica em um card e é levado para uma página com todos os detalhes daquele prestador.

**Endpoints Necessários:**

1.  `GET /usuario/:id` (Para os dados principais do perfil e avaliações)
2.  `GET /usuario/:id/servicos` (Para a lista completa de serviços)

- **Como Usar:**

  1.  Quando o usuário clica no card do "João da Silva" (que tem `id: 15`), o front-end navega para a página de perfil, por exemplo, `/perfil/15`.
  2.  A página de perfil fará **duas chamadas** à API assim que carregar:
      - Uma para `http://sua-api.com/usuario/15` para pegar nome, biografia, foto, e a lista de avaliações recebidas.
      - Outra para `http://sua-api.com/usuario/15/servicos` para pegar a lista de todos os serviços que o João oferece e exibi-los em uma galeria.

- **Dados Recebidos (Exemplos):**
  - De `GET /usuario/15`:
    ```json
    {
      "id": 15,
      "nome": "João da Silva Eletricista",
      "foto_perfil_url": "...",
      "biografia": "...",
      "avaliacoes_recebidas": [
        {
          "nota": 5,
          "comentario": "Excelente profissional!",
          "cliente": { "nome": "Maria" }
        },
        {
          "nota": 4,
          "comentario": "Bom serviço, mas atrasou um pouco.",
          "cliente": { "nome": "Carlos" }
        }
      ]
    }
    ```
  - De `GET /usuario/15/servicos`:
    ```json
    [
      {
        "id": 1,
        "titulo": "Instalação de Chuveiro",
        "descricao": "...",
        "imagens": ["url1", "url2"]
      },
      {
        "id": 2,
        "titulo": "Troca de Disjuntor",
        "descricao": "...",
        "imagens": ["url3"]
      }
    ]
    ```

---

## Tela 3: Cadastro e Login

**Objetivo:** Permitir que novos usuários se cadastrem e usuários existentes acessem suas contas.

**Endpoints Necessários:**

1.  `POST /usuario/create` (Para o formulário de cadastro)
2.  `POST /usuario/login` (Para o formulário de login)

- **Como Usar:**
  - **Cadastro:** O front-end terá um formulário com todos os campos (`nome`, `email`, `senha`, `cep`, `is_prestador`, etc.). Ao enviar, ele monta um objeto `FormData` (porque tem upload de foto) e envia para a API. Se receber um status `201`, o cadastro foi um sucesso.
  - **Login:** Um formulário simples com `email` e `senha`. Ao enviar, faz a chamada para a API. Se receber um status `200`, o login foi um sucesso. O front-end deve pegar o `token` da resposta e salvá-lo de forma segura (em `localStorage` ou `sessionStorage`) para usar nas rotas autenticadas.

---

## Tela 4: Dashboard do Usuário Logado ("Meu Perfil")

**Objetivo:** O usuário logado vê suas próprias informações, avaliações que fez e, se for prestador, gerencia seus serviços.

**Endpoints Necessários:**

1.  `GET /usuario/me/avaliacoes` (Para listar as avaliações que _eu_ fiz)
2.  `GET /usuario/:id/servicos` (Se eu for prestador, para listar _meus_ serviços)
3.  `POST /servico/create` (Se eu for prestador, para o formulário de "Adicionar Serviço")
4.  `POST /registro-servico/solicitar` (O coração do "Aperto de Mão Digital")

- **Como Usar:**
  - O front-end pega o ID do usuário logado (que veio na resposta do login) e o token (que está salvo).
  - Ele busca as avaliações que o usuário fez com uma chamada para `/usuario/me/avaliacoes`, passando o token no cabeçalho `Authorization`.
  - Se `is_prestador` for `true`, ele exibe um botão "Adicionar Serviço" que abre um formulário e envia os dados para `/servico/create`.
  - Ele também exibe um botão "Solicitar Confirmação", que abre um modal onde o prestador seleciona um cliente e, ao confirmar, o front-end chama `/registro-servico/solicitar` com o `clienteId`.
