# Protótipo Multi-Apps (CMX)

Este projeto é um protótipo de alta fidelidade desenvolvido em **Next.js** para demonstrar um conceito de interface unificada (**Shell**) para um ecossistema multi-aplicativos (Multi-Apps). O objetivo principal é ilustrar a experiência de navegação, usabilidade e transição fluida entre diferentes sistemas, como ERP, CRM e Controladoria.

---

## 🚀 Sobre o Projeto

O protótipo funciona como um portal unificado (shell) que encapsula múltiplos microsserviços ou aplicações de front-end em uma única experiência contínua para o usuário. 

- **Foco no Front-end:** Trata-se de um demonstrador visual e interativo de UX/UI.
- **Hospedagem:** Publicado diretamente na **Vercel** para fácil compartilhamento e feedback rápido.
- **Sem Back-end/Integrações:** Não possui conexões com APIs externas nem banco de dados. Os fluxos e exibições utilizam dados mockados locais.
- **Sem Autenticação Real:** O fluxo simula o comportamento de um usuário logado para manter o foco na experiência de uso dos apps.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando as ferramentas mais modernas do ecossistema React/Next.js:

- **[Next.js 15](https://nextjs.org/)** (App Router & React Server Components) com suporte a Turbopack.
- **[React 19](https://react.dev/)** para a biblioteca de componentes.
- **[Tailwind CSS v4](https://tailwindcss.com/)** para estilização rápida, moderna e utilitária.
- **[Lucide React](https://lucide.dev/)** para ícones modernos e consistentes.
- **[Base UI](https://base-ui.com/)** & **[Shadcn UI](https://ui.shadcn.com/)** para a base de componentes de interface ricos e acessíveis.

---

## 📂 Estrutura das Aplicações

O protótipo está estruturado de forma modular na pasta `/app`, simulando a coexistência de três grandes soluções:

1. **ERP (`/app/erp`):** Gestão integrada de processos e recursos.
2. **CRM (`/app/crm`):** Relacionamento com clientes e pipeline de vendas.
3. **Controladoria (`/app/controladoria`):** Painéis e relatórios de controle financeiro e orçamentário.

---

## 💻 Instalação e Execução Local

Caso queira clonar o repositório e rodar o projeto localmente para desenvolvimento ou testes, siga os passos abaixo:

### Pré-requisitos
Certifique-se de ter o **Node.js** (versão 18+) instalado em sua máquina.

### Passos para Rodar

1. **Clonar o Repositório:**
   ```bash
   git clone https://github.com/seu-usuario/prototypes-cmx.git
   cd prototypes-cmx
   ```

2. **Instalar as Dependências:**
   ```bash
   npm install
   ```

3. **Iniciar o Servidor de Desenvolvimento:**
   ```bash
   npm run dev
   ```
   O servidor iniciará em `http://localhost:3000`. Acesse no seu navegador para ver o protótipo em ação!

4. **Gerar Build de Produção (Opcional):**
   ```bash
   npm run build
   ```

---

## 🌐 Deploy na Vercel

O projeto está configurado para deploy contínuo via Vercel. Cada alteração na branch principal realiza o build e atualiza a demonstração online automaticamente.

---

*Desenvolvido como um protótipo de design e arquitetura de front-end para demonstrar o futuro da experiência multi-app.*
