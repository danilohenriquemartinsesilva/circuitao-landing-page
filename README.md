# Circuitão PET — Landing Page

Landing page do **Circuitão**, evento de desenvolvimento acadêmico e profissional do PET UFC Russas. O projeto reúne apresentação do evento, pilares, programação em abas, palestrantes, edições anteriores, patrocinadores, equipe e formulário de contato.

> **Conteúdo ilustrativo.** Projeto desenvolvido como desafio do processo seletivo do PET UFC Russas. Palestrantes, patrocinadores, depoimentos e números da página são fictícios e servem apenas para demonstrar o layout. Marcas e imagens de terceiros pertencem aos seus donos.
>
> Retomei o projeto para finalizá-lo, usando IA (Claude) como apoio na revisão e correção do código; revisei e estudei o resultado.

## Funcionalidades

- Layout responsivo (desktop e celular), com menu hambúrguer
- Contador regressivo configurável, que também trata evento em andamento e já encerrado
- Programação em abas (Dia 1 e Dia 2), com navegação por mouse e setas do teclado
- Animações de entrada ao rolar a página (respeitando `prefers-reduced-motion`)
- Formulário de contato com validação, que abre o aplicativo de e-mail com a mensagem pronta
- Acessibilidade: HTML semântico, link "Pular para o conteúdo", foco visível, abas e menu com ARIA, contraste mínimo de 4,5:1 (WCAG AA)

## Tecnologias

HTML5, CSS3 (variáveis, grid, flexbox, media queries) e JavaScript puro (sem frameworks nem build).

## Como rodar

Não precisa instalar nada. Abra o `index.html` no navegador.

Para servir por um servidor local (opcional):

```bash
python -m http.server 8000
# ou: npx serve
```

e acesse `http://localhost:8000`.

## Estrutura

```
index.html          # página
styles/styles.css   # estilos
scripts/main.js     # contador, abas, menu, animações e formulário
assets/images/      # imagens
```

## Configuração

- **Data do evento:** atributo `data-target` do elemento `#countdown` no `index.html` (formato `2026-10-20T08:00:00-03:00`).
- **E-mail do formulário:** `petrussas@ufc.br`, configurado na constante `CONTACT_EMAIL` no início do `scripts/main.js`.
- **LinkedIn do PET:** https://www.linkedin.com/company/pet-campus-russas-ufc/?originalSubdomain=br (links na seção de contato e no rodapé).
- **Link de inscrição:** botão "Inscreva-se agora" do bloco `#inscricao` (hoje aponta para o formulário de contato).

## Decisões técnicas

- **Imagens otimizadas:** a foto principal passou de 4,8 MB (PNG) para ~160 KB (WebP), as fotos da equipe foram redimensionadas, e as imagens abaixo da dobra usam `loading="lazy"` com `width` e `height` definidos para evitar saltos de layout.
- **Formulário sem servidor:** como o site é estático, o envio usa `mailto:` com assunto e corpo preenchidos. Para envio direto, dá para integrar um serviço como Formspree ou criar uma API.
- **Verificação de acessibilidade:** auditoria automática com axe-core, sem violações no desktop e no celular.

## Publicação (GitHub Pages)

No repositório: *Settings → Pages → Branch: `main` / pasta raiz*.

## Possíveis melhorias futuras

- Envio real do formulário (serviço de formulários ou back-end)
- Tema escuro/claro
- Páginas separadas para cada edição do evento
