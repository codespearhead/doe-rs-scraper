<h1 align="center"><a href="https://github.com/codespearhead/doe-rs-scraper/">doe-rs-scraper</a></h1>

<p align="center">
    <br>
  <a href="https://www.flaticon.com/free-icon/file_1150643">
    <img src="https://cdn-icons-png.flaticon.com/512/1150/1150643.png" width="120px" height="120px"/>
  </a>
  <br><br>
    Script de arquivo único para consultar publicações da PROCERGS no Diário Oficial do Rio Grande do Sul
  <br>
</p>

<br>

## Por que este projeto existe?

Cada vez mais concursos públicos deixam de publicar as convocações no site da banca organizadora e passam a divulgá-las exclusivamente no Diário Oficial. Com isso, cabe aos candidatos não eliminados acompanhar diariamente as publicações para não perder a convocação.

## Executar projeto

Todo o código-fonte de produção está contido no arquivo [scrape_doe-rs.js](./scrape_doe-rs.js), que não possui dependências e é isomórfico, ou seja, pode ser executado tanto no Node.js (lado do servidor) quanto no console de um navegador (lado do cliente), sem qualquer modificação. Eu particularmente costumo executá-lo no celular (Android) copiando o conteúdo desse arquivo e colando-o [neste aplicativo](https://play.google.com/store/apps/details?id=com.septudio.javascriptcoding).

Executar para o dia de hoje

```bash
npm start
```

Executar para um dia específico

```bash
npm run start -- --data_fixa_a_ser_consultada=2026-07-10
```

## Testar projeto

Suíte inteira

```bash
npm run test
```

Apenas um caso de teste específico

```bash
npm run test -- -t "vazia"
```

## Comandos relevantes

Formatar código

```bash
npm run format
```
