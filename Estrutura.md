# JobberU - Guia de Desenvolvimento do Frontend

Este documento serve como o guia arquitetural e o roteiro de desenvolvimento para a aplicação frontend do JobberU. Ele detalha a estrutura de pastas, os fluxos de usuário e as decisões de design que formam a base da nossa experiência de usuário.

## 1. Visão Geral e Escolha Tecnológica

O frontend do JobberU é uma aplicação web moderna construída com **Next.js** e o **App Router**.

A escolha pelo Next.js é estratégica por três motivos principais:

1.  **Otimização para Buscadores (SEO):** Perfis públicos de prestadores (`/perfil/[id]`) são renderizados no servidor, entregando HTML completo para os buscadores e garantindo que nossos profissionais sejam encontrados no Google.
2.  **Performance:** O Next.js permite uma experiência de usuário rápida, renderizando conteúdo essencial no servidor e carregando a interatividade do lado do cliente de forma otimizada.
3.  **Flexibilidade Arquitetural:** Conseguimos mesclar Componentes de Servidor (para páginas estáticas e de perfil) e Componentes de Cliente (para dashboards interativos e formulários), usando o melhor de cada abordagem.

---

## 2. Estrutura de Pastas (O "Blueprint" da Aplicação)

A estrutura de pastas foi projetada para ser intuitiva, escalável e alinhada com as melhores práticas do App Router.

```
/
├── /app/                          # O coração do App Router, onde as URLs são definidas
│   ├── /cadastro/                 # Fluxo de cadastro
│   │   ├── /cliente/
│   │   │   └── page.jsx           # Formulário de cadastro de Cliente
│   │   └── /prestador/
│   │   │   └── page.jsx           # Formulário de cadastro de Prestador
│   │   └── page.jsx               # Página "hub" que pergunta "Contratar ou Oferecer?"
│   │
│   ├── /confirmar-servico/
│   │   └── /[registroId]/         # Rota dinâmica do "Link Mágico"
│   │       └── page.jsx           # Página que o cliente acessa para confirmar
│   │
│   ├── /dashboard/                # Área privada do usuário logado
│   │   ├── /configuracoes/
│   │   │   └── page.jsx           # Página para editar perfil, senha, etc.
│   │   ├── /servicos/
│   │   │   └── page.jsx           # Página para o prestador gerenciar (CRUD) seus serviços
│   │   └── page.jsx               # Página principal do dashboard (renderiza cliente ou prestador)
│   │
│   ├── /login/
│   │   └── page.jsx               # Página de login
│   │
│   ├── /perfil/
│   │   └── /[id]/                 # Rota dinâmica do perfil público
│   │       └── page.jsx           # Página de perfil público do prestador
│   │
│   ├── globals.css                # Estilos globais
│   ├── layout.jsx                 # Layout principal (com Header, Footer, e <Providers>)
│   └── page.jsx                   # A página inicial (Home)
│
├── /components/                   # Nossos "blocos de Lego" reutilizáveis
│   ├── /ui/                       # Componentes de UI puros (Button, Input, Card, Modal)
│   ├── /auth/                     # Componentes de autenticação (LoginForm, RegisterForm)
│   └── /dashboard/                # Componentes para a área privada (WidgetConfirmacoes, etc.)
│
├── /context/                      # Nossos provedores de estado global ("cérebros")
│   ├── AuthContext.js             # Gerencia o estado de autenticação (quem está logado)
│   └── Providers.jsx              # Agrupa todos os provedores para o layout
│
├── /lib/                          # Funções utilitárias e helpers
│   └── utils.js                   # Funções como 'truncate', formatação de data, etc.
│
└── /services/                     # Onde configuramos a comunicação com o backend
    └── api.js                     # Nossa instância configurada do Axios, a "ponte" para a API
```

---

## 3. Fluxos de Desenvolvimento e Jornada do Usuário

Esta seção detalha a jornada do usuário pela aplicação, conectando a visão de produto com a estrutura de pastas.

### Fluxo 1: Descoberta e Gatilho de Cadastro

1.  **Página Inicial (`/app/page.jsx`):** O usuário acessa o site. Ele vê um `BannerPrincipal` e uma `BarraDeBusca`.
2.  **Busca:** O usuário digita uma cidade (ex: "Recife") na barra de busca. O componente chama nosso endpoint `GET /usuario/prestadores/cidade/Recife`.
3.  **Visualização:** A grade de `PrestadoresEmDestaque` é preenchida com componentes `PrestadorCard`, mostrando um resumo de cada profissional.
4.  **Gatilho:** O usuário se interessa por um prestador e clica no botão "Ver Detalhes" dentro do `PrestadorCard`.
5.  **A "Muralha":** A lógica no `PrestadorCard` usa o `AuthContext` para verificar se há um usuário logado.
    - **Se NÃO estiver logado:** O usuário é redirecionado para `/login`.
    - **Se estiver logado:** O usuário é redirecionado para o perfil público (`/perfil/[id]`).

### Fluxo 2: O Funil de Login e Cadastro

1.  **Página de Login (`/app/login/page.jsx`):** O usuário que foi redirecionado chega aqui. Ele pode fazer login ou clicar no link "Cadastre-se aqui".
2.  **Hub de Cadastro (`/app/cadastro/page.jsx`):** Ao clicar para se cadastrar, o usuário não vê um formulário, mas sim uma pergunta central: "O que você deseja fazer?".
    - Botão "Quero Contratar" -> Leva para `/cadastro/cliente`.
    - Botão "Quero Oferecer Serviços" -> Leva para `/cadastro/prestador`.
3.  **Cadastro Específico (`/app/cadastro/...`):** O usuário preenche o formulário correspondente. A lógica para `is_prestador` é pré-definida e oculta, garantindo a segmentação correta.

### Fluxo 3: A Experiência do Usuário Logado

1.  **Perfil Público (`/app/perfil/[id]/page.jsx`):** Após o login, o cliente agora pode ver a página completa do prestador, com todos os seus serviços, biografia completa e avaliações.
2.  **Dashboard (`/app/dashboard/page.jsx`):** Esta é a área privada. O componente principal desta página verifica o `AuthContext` (`usuario.is_prestador`) e renderiza um de dois painéis:
    - **Dashboard do Cliente:** Simples e focado em ações. Mostra "Confirmações Pendentes", "Meus Favoritos" e, crucialmente, um banner **"Torne-se um Prestador"** para incentivar a conversão.
    - **Dashboard do Prestador:** Uma central de controle para gerenciar serviços (CRUD via `/dashboard/servicos`), ver estatísticas e, o mais importante, iniciar o fluxo de avaliação.

### Fluxo 4: O "Aperto de Mão Digital" (Confirmação de Serviço)

Este é o fluxo central que garante a integridade do nosso sistema de reputação.

1.  **Iniciativa do Prestador:** No seu dashboard, o prestador precisa solicitar a confirmação de um serviço. Ele não digita um número de telefone. Em vez disso, ele usa um campo de busca inteligente ("Para qual cliente?").
2.  **Seleção do Cliente:** Ao digitar o nome do cliente, o frontend busca na API (`GET /usuarios/buscar?q=...`) e exibe uma lista de usuários existentes. O prestador seleciona o cliente correto.
3.  **Criação do Registro:** Com o `clienteId` confirmado, o frontend envia a requisição `POST /registro-servico/solicitar` para o backend.
4.  **Construção do Link:** O backend responde com o `registroId`. O frontend então constrói o "Link Mágico": `https://www.jobberu.com/confirmar-servico/[registroId]`.
5.  **Ponte para o WhatsApp:** O frontend apresenta ao prestador o link e um botão "Enviar via WhatsApp". Este botão abre o WhatsApp do prestador com uma mensagem pré-preenchida contendo o link. **A plataforma não envia a mensagem; ela facilita o envio pelo próprio prestador.**
6.  **Confirmação do Cliente:** A cliente recebe o link, clica e é levada para a página `/app/confirmar-servico/[registroId]/page.jsx`.
7.  **A Fechadura de Segurança:** A página pede que a cliente faça login. Ao clicar em "Confirmar", o frontend envia `PATCH /registro-servico/[registroId]/responder`. O backend então verifica se o `id` da usuária logada é o mesmo `clienteId` atrelado àquele registro. Se for, o serviço é confirmado e a avaliação é liberada. Se não for, o acesso é negado.

---

Este documento deve ser a fonte da verdade para o desenvolvimento do frontend. Qualquer nova funcionalidade ou alteração de fluxo deve ser refletida aqui.
