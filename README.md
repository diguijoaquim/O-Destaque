
```md
# O Destaque

Projeto em React/Next.js para visualizar PDFs em formato de flipbook, com zoom, navegação por teclado, fullscreen e compartilhamento. Experiência fluida e responsiva.
Here is the codesandbox Link-

https://codesandbox.io/p/github/mohitkumawat310/react-pdf-flipbook-viewer/master?import=true

## Como começar

Primeiro, execute o servidor de desenvolvimento:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado.

Você pode começar editando a página em `app/(pages)/(website)/page.jsx`. A página atualiza automaticamente conforme você salva.

Este projeto usa [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) para otimizar e carregar a fonte Inter automaticamente.

## Recursos

- **Navegação tipo Flipbook**: folheie páginas com animações suaves.
- **Zoom e Panorâmica**: aproxime/afaste e mova a página para melhor leitura.
- **Modo Tela Cheia**: leitura imersiva com fullscreen.
- **Atalhos de Teclado**: setas esquerda/direita para navegar.
- **Design Responsivo**: otimizado para diferentes tamanhos de tela.

## Componentes

### FlipbookViewer

| Propriedade   | Tipo      | Descrição                                        |
|---------------|-----------|--------------------------------------------------|
| `pdfUrl`      | `string`  | URL do PDF a ser exibido.                        |
| `shareUrl`    | `string`  | URL usada para compartilhamento.                 |
| `className`   | `string`  | Classes CSS adicionais para estilo.              |
| `disableShare`| `boolean` | Desativa o botão de compartilhar.                |

### Toolbar

| Propriedade     | Tipo       | Descrição                                        |
|-----------------|------------|--------------------------------------------------|
| `flipbookRef`   | `object`   | Referência do componente flipbook.               |
| `containerRef`  | `object`   | Referência do contêiner.                         |
| `screenfull`    | `object`   | Instância do Screenfull para fullscreen.         |
| `pdfDetails`    | `object`   | Detalhes do PDF (total de páginas, etc.).        |
| `viewerStates`  | `object`   | Estado do viewer (página atual, zoom).           |
| `shareUrl`      | `string`   | URL para compartilhamento.                       |
| `disableShare`  | `boolean`  | Desativa o botão de compartilhar.                |

### Flipbook

| Propriedade       | Tipo       | Descrição                                       |
|-------------------|------------|-------------------------------------------------|
| `viewerStates`     | `object`   | Estado do viewer (página atual, zoom).          |
| `setViewerStates`  | `function`| Função para atualizar o estado do viewer.       |
| `flipbookRef`      | `object`   | Referência do componente flipbook.              |
| `pdfDetails`       | `object`   | Detalhes do PDF (total de páginas, etc.).       |

### SliderNav

| Propriedade     | Tipo       | Descrição                                        |
|-----------------|------------|--------------------------------------------------|
| `flipbookRef`   | `object`   | Referência do componente flipbook.               |
| `pdfDetails`    | `object`   | Detalhes do PDF (total de páginas, etc.).        |
| `viewerStates`  | `object`   | Estado do viewer (página atual, zoom).           |

## Saiba mais

Para saber mais sobre Next.js, consulte:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

Veja também o [repositório do Next.js no GitHub](https://github.com/vercel/next.js/) — contribuições são bem-vindas!

## Deploy na Vercel

O jeito mais fácil de publicar um app Next.js é usando a [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Consulte a [documentação de deploy do Next.js](https://nextjs.org/docs/deployment) para mais detalhes.

## Agradecimentos

Agradecimentos especiais às bibliotecas que tornaram este projeto possível:

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [react-pdf](https://github.com/wojtekmaj/react-pdf)
- [react-pageflip](https://github.com/Nodlik/react-pageflip)
- [react-zoom-pan-pinch](https://github.com/prc5/react-zoom-pan-pinch)
- [screenfull](https://github.com/sindresorhus/screenfull.js)
- [radix-ui](https://www.radix-ui.com/)
- [tailwindcss](https://tailwindcss.com/)
- [class-variance-authority](https://github.com/joe-bell/class-variance-authority)
- [clsx](https://github.com/lukeed/clsx)
- [lucide-react](https://github.com/lucide-icons/lucide)
- [keyboardjs](https://github.com/RobertWHurst/KeyboardJS)
- [react-share](https://github.com/nygardk/react-share)
- [sonner](https://github.com/emilkowalski/sonner)
