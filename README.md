# 🚽 Easyout - A "Número 1" em Gestão de Banheiros Acadêmicos

Este projeto surgiu de uma maneira cômica no programa de aprendizagem que participei! Durante uma das aula um dos professores comentou que não deveriamos mais pedir a ele para ir ao banheiro, e sim, simplesmente ir, porem deveriamos ir somente um de cada vez. Mas estávamos com dificuldade de nos organizar, e então resolvi criar este sistema de gerenciamento de filas. 

## 🎯 Objetivo
Resolver o problema de gestão de acesso ao banheiro em salas de aula, permitindo:
- Controle automático de filas
- Histórico de utilização
- Notificações em tempo real
- Sistema de autenticação seguro

## ✨ Funcionalidades Principais
- **Autenticação Segura**:
  - Login com Email/Senha
  - Cadastro de novos usuários
  - Integração com Firebase Authentication
  
- **Sistema de Filas**:
  - Fila de espera em tempo real
  - Histórico das últimas 5 utilizações
  - Notificação automática quando é a vez do usuário
  - Confirmação de retorno do banheiro

- **Interface Intuitiva**:
  - Visualização clara da posição na fila
  - Temporização de uso
  - Botão para sair da fila
  - Sinalização de retorno à sala

## 🛠️ Tecnologias Utilizadas
- **Frontend**:
  - Next.js (App Router)
  - Tailwind CSS
  - Shadcn/ui
  - React Firebase Hooks

- **Backend**:
  - Firebase Authentication
  - Firestore Database
  - Cloud Functions (implícito)

- **Outras Bibliotecas**:
  - Lucide React Icons
  - date-fns para manipulação de datas
 
## 🖥️ Estrutura Principal do Projeto

```bash
src/
├── components/
│   ├── auth-guard.tsx      # Componente de proteção de rotas
|   ├── footer.tsx          # Rodapé da aplicação
│   ├── header.tsx          # Cabeçalho da aplicação
│   ├── history-queue.tsx   # Componente do histórico
│   ├── login-form.tsx      # Formulário de login
│   ├── main-queue.tsx      # Tela principal de filas
|   ├── register-form.tsx   # Formulário de cadastro
│   └── user-queue.tsx      # Item da fila de espera
├── services/
│   └── firebaseConfig.ts   # Configuração do Firebase
└── app/
    ├── login/page.tsx      # Página de login
    ├── register/page.tsx   # Página de registro
    └── page.tsx            # Página principal
```

## 📝 Fluxo de Uso
- **Autenticação**:
  - Novo usuário: Cadastro com email/senha
  - Usuário existente: Login tradicional ou com Google

- **Gestão de Filas**:
  - Entrar na fila: Adiciona usuário à fila de espera
  - Sua vez chegou!: Modal aparece automaticamente
  - Confirmar: Registra retorno do banheiro e atualiza histórico

- **Gestão de Histórico**:
  - Mantém últimos 5 registros
  - Exibe horário de retorno
  - Atualização em tempo real
