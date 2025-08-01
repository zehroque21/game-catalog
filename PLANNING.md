# Game Catalog - Planning Document

## Objetivo
Criar um web app para catalogar jogos que já foram zerados/completados, permitindo ao usuário manter um registro organizado de suas conquistas gaming.

## Funcionalidades Principais

### 1. Adicionar Jogo
- Nome do jogo
- Plataforma (PC, PlayStation, Xbox, Nintendo, Mobile, etc.)
- Gênero (RPG, Action, Adventure, etc.)
- Data de conclusão
- Tempo jogado (horas)
- Nota/avaliação (1-5 estrelas)
- Comentários/observações
- Imagem/capa do jogo (opcional)

### 2. Visualizar Catálogo
- Lista de todos os jogos zerados
- Filtros por plataforma, gênero, ano
- Ordenação por data, nota, tempo jogado
- Busca por nome

### 3. Estatísticas
- Total de jogos zerados
- Tempo total jogado
- Plataforma mais utilizada
- Gênero favorito
- Média de avaliações

### 4. Editar/Remover
- Editar informações de jogos existentes
- Remover jogos do catálogo

## Estrutura de Dados
```javascript
{
  id: unique_id,
  name: "Nome do Jogo",
  platform: "PC/PlayStation/Xbox/Nintendo/Mobile/Other",
  genre: "RPG/Action/Adventure/Strategy/etc",
  completionDate: "YYYY-MM-DD",
  hoursPlayed: number,
  rating: 1-5,
  comments: "text",
  imageUrl: "url_optional"
}
```

## Interface
- Design limpo e moderno
- Responsivo (mobile-friendly)
- Cards para exibir jogos
- Modal para adicionar/editar
- Dashboard com estatísticas

## Tecnologias
- HTML5
- CSS3 (com Flexbox/Grid)
- JavaScript vanilla
- LocalStorage para persistência
- GitHub Pages para hospedagem

## Armazenamento
- Usar LocalStorage do navegador
- Backup/export em JSON
- Import de dados

