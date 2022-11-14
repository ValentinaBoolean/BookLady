<a name="readme-top"></a>

<!-- LOGO -->
<div align="center">
  <img src="./readme_assets/img/booleanStudio.svg" alt="Logo" width="auto" height="30">

  <h1 align="center">BOOK LADY</h1>

  <p align="center">
    Progetto per il corso avanzato di Javascript di Start2Impact
    <br />
    <a href="https://valentinaboolean.github.io/BookLady/"><strong>View Project</strong></a>
    <br />
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## Introduzione

<div align="center">
  <img src="./readme_assets/img/appScreen.png" alt="Logo" width="auto" height="300">
</div>

Per il corso avanzato di Javascript, ho realizzato una breve webapp che permetta la consultazione del catalogo online di libri fornito da [Open Library](https://openlibrary.org/), con le seguenti funzionalità:

* Possibilità di cercare tutti i libri appartenenti ad una specifica categoria, tramite campo di input testuale. 
* Possibilità di visualizzare la lista dei libri paginata con titolo ed autori.
* Possibilità di visualizzare, per un singolo libro, la cover e la descrizione qualora siano presenti.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Tecnologie Impiegate

Per la realizzazione del progetto sono state impiegate le seguenti tecnologie:

<p float="left">
  <img src="./readme_assets/img/html.png" width="100" height="100" />
  <img src="./readme_assets/img/css.png" width="100" height="100" /> 
  <img src="./readme_assets/img/js.png" width="100" height="100" />
  BOOTSTRAP
  WEBPACK
  AXIOS
</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Specifiche Tecniche

Per la creazione del bundle del progetto è stato utilizzato Webpack, mentre per la gestione delle dipendenze è stato utilizzato NPM.

Tutto il codice risiede all'interno della cartella `src`, ed è composto dai seguenti files:
* index.js: entry point dell'applicazione, osservata da webpack per generare il bundle definitivo.
* index.html: file di template utilizzando da `HtmlWebpackPlugin` per la generazione dell'HTML.
* style.scss: foglio di stile SASS, preferito al normale CSS per la maggiore organizzazione del codice.
* ogni altra risorsa (nello specifico: le immagini) è stata aggiunta a questa cartella e includa nel bundle tramite import in index.js

Dal lato tecnico, le functions che vengono richiamate dagli elementi HTML (nello specifico, il form di ricerca, i pulsanti per la paginazione e il pulsante di apertura dialog dei dettagli), sono state assegnate all'oggetto built-in `window` per permettere di essere richiamate tramite submit e onclick.

Oltre a questo, per contattare le API GET di ricerca è stata utilizzata la libreria AXIOS, che semplifica notevolmente il recupero della response delle chiamate.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTATTI -->
## Contact

Valentina Bulian

[Github](https://github.com/ValentinaBoolean)

[Project Repository](https://github.com/ValentinaBoolean/BookLady)

[Project Url](https://valentinaboolean.github.io/BookLady/dist/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>