## Visão Geral

Este projeto é uma aplicação web de monitoramento industrial em tempo real, desenvolvida com Next.js e TypeScript. O objetivo é fornecer um painel (dashboard) interativo para visualização do status operacional de máquinas industriais, com dados simulados e atualizações dinâmicas.

## Arquitetura e Tecnologias

A aplicação utiliza uma stack moderna baseada em React, com foco em componentização, performance e boas práticas de desenvolvimento.

- **Framework Principal**: [Next.js](https://nextjs.org/) (com App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Componentes de UI**: [ShadCN UI](https://ui.shadcn.com/)
- **Ícones**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Gráficos**: [Recharts](https://recharts.org/)
- **Manipulação de Datas**: [date-fns](https://date-fns.org/)

## Estrutura de Diretórios

O projeto segue a estrutura básica do Next.js App Router, com uma organização clara e utilizando conceitos de Monorepo.

## Fluxo de Dados e Simulação

O núcleo da interatividade do painel reside no hook customizado `src/hooks/use-machine-data.ts`.

1.  **Inicialização**: O hook `useMachineData` é chamado na página principal (`apps/web/src/app/page.tsx`). Ele inicializa o estado da máquina, os alertas e o histórico de métricas com valores padrão.
2.  **Simulação em Tempo Real**: Dentro de um `useEffect`, um `setInterval` é configurado para executar a cada 2.5 segundos. A cada iteração, ele atualiza o estado da aplicação:
    - **Métricas**: Novos valores de temperatura e RPM são calculados com base nos valores anteriores, adicionando uma variação aleatória para simular flutuações.
    - **Estado da Máquina**: Há uma pequena probabilidade de o estado da máquina mudar para "ERROR" ou "MAINTENANCE", simulando falhas ou paradas programadas.
    - **Alertas**: Com base nas mudanças de estado ou em anomalias de métricas (ex: temperatura muito alta), novos alertas são gerados e adicionados a uma lista, que é limitada aos 5 mais recentes.
    - **Histórico**: Os novos dados de métricas são adicionados a um array de histórico, que mantém no máximo os últimos 30 pontos de dados para alimentar o gráfico.
3.  **Renderização**: A página `page.tsx` recebe os dados atualizados do hook e os repassa como propriedades para os componentes de apresentação (`MachineStateCard`, `MetricCard`, `MetricsChart`, etc.), que então re-renderizam para exibir as informações mais recentes.


## Instruções de Instalação e Execução

Pré-requisitos:
Node.js (>= 18)
npm ou pnpm

Para executar a aplicação no ambiente de desenvolvimento local, siga estes passos:

1.  **Instalar Dependências**:
    Primeiro, certifique-se de ter o Node.js e o npm (ou um gerenciador de pacotes compatível) instalados. Depois, instale as dependências do projeto no root:
    ```bash
    npm install
    ```

2.  **Executar o Servidor de Desenvolvimento**:
    Para iniciar a aplicação, execute:
    ```bash
    npm run dev
    ```
    Isso iniciará o servidor Next.js (com Turbopack para maior velocidade) na porta `3000` por padrão. É possível acessar a aplicação em `http://localhost:3000`.

    3.  **Rodar os Testes**:
    Para rodar os testes, execute:
    ```bash
    npm test
    ```

## Decisões Técnicas

1.  **Next.js + App Router**
Adotado para SSR, desempenho e melhor organização de rotas com layouts reutilizáveis.

2.  **Tailwind + ShadCN**
Escolhido por produtividade, personalização via design tokens e tipagem robusta.

3.  **Simulação via Hook**
Simulação embutida via useEffect facilita prototipação e testes isolados sem dependência externa.# fabrica-monitoramento
