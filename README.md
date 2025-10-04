# Sistema de Prevenção à Fraudes para VTEX

Dashboard integrado para monitoramento e detecção de transações fraudulentas em lojas virtuais hospedadas na plataforma VTEX.

## 📋 Sobre o Projeto

Solução desenvolvida por Luiz Pina (PUCPR) para auxiliar pequenos lojistas de e-commerce na prevenção de fraudes. O sistema cruza dados de múltiplas fontes (VTEX, Pagar.me, Zendesk) para calcular scores de risco e identificar padrões suspeitos em transações.

### Funcionalidades Principais

- 📊 Dashboard em tempo real com listagem de pedidos
- 🔍 Análise de tentativas de cartão de crédito
- ⚠️ Cálculo de score de risco baseado em múltiplas fontes
- 🎯 Detecção de inconsistências cadastrais
- 🚨 Alertas visuais para transações de alto risco
- 📈 Visualização gráfica da evolução do score

## 🛠️ Tecnologias Utilizadas

- **Frontend:** Next.js, React, Material-UI
- **Backend:** Node.js
- **Integrações:** VTEX API, Pagar.me API, Zendesk API
- **Linguagem:** TypeScript/JavaScript

## 📦 Instalação

### Pré-requisitos

- Node.js 16+ 
- npm ou yarn
- Conta VTEX com permissões de API
- Credenciais do Pagar.me
- Credenciais do Zendesk

### Passo a Passo

1. Clone o repositório
```bash
git clone https://github.com/lafpina/pucpr-ext-mui5.git
cd vtex-fraud-prevention
```

2. Instale as dependências
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais reais.

4. Execute o projeto em modo de desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 🔐 Configuração de APIs

### VTEX
1. Acesse Admin VTEX > Account Settings > Security
2. Gere uma App Key e App Token
3. Adicione ao `.env.local`

### Pagar.me
1. Acesse Dashboard Pagar.me > Configurações > Chaves de API
2. Copie a Secret Key
3. Adicione ao `.env.local`

### Zendesk
1. Gere um API Token no Zendesk
2. Codifique em Base64: `email/token:api_token`
3. Adicione ao `.env.local`

## 📊 Como Funciona

O sistema analisa cada pedido através de múltiplos critérios:

1. **Dados Cadastrais:** Inconsistências entre nome, CPF, endereço
2. **Histórico de Compras:** Primeira compra, frequência
3. **Método de Pagamento:** Tentativas de cartão, parcelas
4. **Atendimento:** Histórico de reclamações no Zendesk

Com base nesses dados, é calculado um **score de risco (0-100%)**:
- 🟢 0-40%: Baixo risco
- 🟡 41-70%: Médio risco
- 🔴 71-100%: Alto risco

## 🔒 Segurança e Regras de Negócio

Por questões de segurança, as regras específicas de detecção de fraude não estão incluídas neste repositório público. O código fornecido contém a estrutura completa do sistema com regras placeholder que devem ser customizadas conforme o perfil de cada lojista.

### Implementação Customizada

As regras de detecção são configuradas conforme:
- Perfil de clientes do lojista
- Tipo de produtos comercializados
- Ticket médio das transações
- Histórico de fraudes específico

Para implementação completa com regras adequadas ao seu negócio, abra uma issue neste repositório ou entre em contato através do GitHub.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto é open-source e está disponível sob a licença MIT.

## 👥 Autor

- **Luiz Pina - Pontifícia Universidade Católica do Paraná (PUCPR)** 


## 📧 Contato

Para dúvidas ou sugestões, abra uma issue no repositório.

---

**Desenvolvido como projeto de extensão universitária na PUCPR**