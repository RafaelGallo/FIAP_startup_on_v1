# BICOS - Mapa de Navegação

## Sitemap e Rotas

### Rotas Comuns
- `/role` - Seleção de perfil (Prestador ou Contratante)
- `/login?role=provider|contractor` - Login com autenticação
- `/forgot-password` - Recuperação de senha (placeholder)

### Fluxo Prestador de Serviços (SPS-1 a SPS-11)

1. **SPS-1: Seleção de Perfil** (`/role`)
   - Escolha entre Prestador e Contratante
   - → `/login?role=provider`

2. **SPS-2: Login** (`/login?role=provider`)
   - Email/senha + Google/Apple
   - Validações inline
   - → `/home-provider`

3. **SPS-3: Home Provider** (`/home-provider`)
   - Métricas rápidas (orçamentos pendentes/aprovados)
   - CTA "Candidatar-se a Serviços"
   - → `/opportunities`

4. **SPS-4: Oportunidades** (`/opportunities`)
   - 3 categorias: Pedreiro, Pintor, Jardineiro
   - → `/opportunities/:category`

5. **SPS-5: Lista por Categoria** (`/opportunities/:category`)
   - Cards de solicitações com reputação do cliente
   - → `/opportunities/:category/:id`

6. **SPS-6: Detalhes da Solicitação** (`/opportunities/:category/:id`)
   - Formulário de orçamento (valor, prazo, mensagem)
   - Reputação completa do cliente
   - → `/budget/:id/pending`

7. **SPS-7: Orçamento Pendente** (`/budget/:id/pending`)
   - Status "Aguardando aprovação"
   - Timeline do processo
   - → `/budget/:id/approved` (após aprovação)

8. **SPS-8: Orçamento Aprovado** (`/budget/:id/approved`)
   - Resumo do acordo
   - CTAs: "Abrir Chat", "Propor Data"
   - → `/chat/:threadId`

9. **SPS-9: Chat** (`/chat/:threadId`)
   - Mensagens texto/foto
   - "Propor data" button
   - → `/schedule/:id`

10. **SPS-10: Agendamento** (`/schedule/:id`) [Placeholder]
    - Calendário e horários
    - → `/service/:id/summary`

11. **SPS-11: Resumo do Serviço** (`/service/:id/summary`) [Placeholder]
    - Detalhes finais e instruções

### Fluxo Contratante (SC-1 a SC-8)

1. **SC-1: Seleção de Perfil** (`/role`)
   - → `/login?role=contractor`

2. **SC-2: Login** (`/login?role=contractor`)
   - → `/home-contractor`

3. **SC-3: Home Contractor** (`/home-contractor`)
   - Estatísticas (serviços ativos/concluídos)
   - CTA "Contratar um Serviço"
   - → `/hire`

4. **SC-4: Selecionar Tipo** (`/hire`)
   - 3 categorias com exemplos
   - → `/hire/:category/briefing`

5. **SC-5: Briefing** (`/hire/:category/briefing`)
   - Formulário: descrição, prazo, endereço, orçamento, fotos
   - → `/request/:id/waiting`

6. **SC-6: Aguardando** (`/request/:id/waiting`)
   - "0 candidatos ainda"
   - Opções: editar, cancelar
   - → `/request/:id/proposals`

7. **SC-7: Avaliar Propostas** (`/request/:id/proposals`)
   - Cards com reputação do prestador
   - Ação: "Aceitar proposta"
   - → `/chat/:threadId`

8. **SC-8: Chat** (`/chat/:threadId`)
   - Mesmo chat do prestador
   - Comunicação segura

## Componentes Reutilizáveis

### UI Components
- `Header` - Cabeçalho com navegação
- `ReputationCard` - Card de reputação com estrelas
- `CurrencyInput` - Input formatado para moeda BRL

### Cards
- `ServiceRequestCard` - Solicitação de serviço
- `ProposalCard` - Proposta de orçamento
- `CategoryCard` - Categoria de serviço

## Estados e Regras de Negócio

### Status de Orçamento
- `pending` - Aguardando resposta do cliente
- `approved` - Aprovado pelo cliente
- `rejected` - Rejeitado pelo cliente

### Chat
- Habilitado apenas após status `approved`
- Banner de segurança sempre visível
- Suporte a texto e imagens

### Reputação Digital
- Média de estrelas (0-5)
- Número total de avaliações
- Taxa de pontualidade (%)
- Número de serviços realizados
- Últimas 2 avaliações com comentários

## Dados Mock

### Categorias
1. **Pedreiro** 🧱
   - Construção de muros
   - Reforma de banheiros
   - Assentamento de pisos

2. **Pintor** 🎨
   - Pintura residencial
   - Pintura comercial
   - Textura decorativa

3. **Jardineiro** 🌱
   - Poda de árvores
   - Paisagismo
   - Manutenção de jardins

### Propostas de Exemplo
- R$ 950,00 (3 dias) - João Silva ⭐ 4.8
- R$ 1.100,00 (4 dias) - Carlos Santos ⭐ 4.5

### Reputações
- Cliente: ⭐ 4.7 (86 avaliações) - 92% pontual
- Prestador: ⭐ 4.3 (52 avaliações) - 88% pontual

## Validações

### Login
- Email: formato válido obrigatório
- Senha: mínimo 8 caracteres

### Orçamento (Prestador)
- Valor: > R$ 0,00
- Prazo: > 0 dias
- Mensagem: ≥ 20 caracteres

### Solicitação (Contratante)
- Descrição: ≥ 30 caracteres
- Prazo: data futura obrigatória
- Endereço: obrigatório

## Acessibilidade

- Contraste WCAG AA
- Labels em todos os inputs
- Touch targets ≥ 44px
- Navegação por teclado
- Focus visível

## Responsividade

- Mobile-first design
- Breakpoints automáticos
- Cards com rounded-2xl
- Spacing generoso
- Typography escalável