import _ from 'lodash';
import axios from 'axios';
import "./style.scss";
import "./images/BookLady_Logo.svg"
import "./images/favicon.png"

// apis
const API_URL = "https://openlibrary.org";
const COVER_URL = "https://covers.openlibrary.org/b/id/";

// HTML elements
let searchForm;
let resultsContainer;
let booksContainer;
let paginationContainer;

// templates
let resultsTemplate;
let bookTemplate;
let spinnerTemplate;
let paginationTemplate;

// global variables
let currentPageNumber;
let numberOfPages;

initApp();

function initApp() {
    // forms
    searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", (event) => {
        searchCategories(event);
    });

    // HTML elements
    resultsContainer = document.getElementById("results-container")
    booksContainer = document.getElementById("books-container");
    paginationContainer = document.getElementById("pagination-container");

    // templates
    resultsTemplate = document.getElementById("results-template");
    bookTemplate = document.getElementById("book-template");
    spinnerTemplate = document.getElementById("spinner-template");
    paginationTemplate = document.getElementById("pagination-template");

    // global variables
    currentPageNumber = 1;
    numberOfPages = 0;
}

function searchCategories(event) {
    if (event != null && event != undefined) event.preventDefault();
    if (!validateSearch()) return;
    initSearch();
}

function changePage(direction) {
    if (direction == 'next') {
        currentPageNumber = currentPageNumber + 1;
        searchCategories();
    } else {
        if (currentPageNumber > 1) {
            currentPageNumber = currentPageNumber - 1;
            searchCategories();
        }
    }
}

function validateSearch() {
    if (searchForm.searchBar.value.toLowerCase().trim()) {
        searchForm.searchBar.value = searchForm.searchBar.value.toLowerCase().trim()
        return true
    };
    return false;
}

function initSearch() {
    resultsContainer.innerHTML = "";
    booksContainer.innerHTML = "";
    paginationContainer.innerHTML = "";

    showSpinner();
    getBooksList();
}

function showSpinner() {
    let spinnerTemplateClone = spinnerTemplate.content.cloneNode(true);
    booksContainer.appendChild(spinnerTemplateClone);
}

function getBooksList() {
    let offset = (currentPageNumber - 1) * 10;
    let jsonString = searchForm.searchBar.value.toLowerCase().trim().replace(/ /g, "_");
    let endpoint = API_URL + "/subjects/" + jsonString + ".json";

    axios.get(endpoint, {
        params: {
            limit: 10,
            offset: offset
        }
    }).then(response => {
        populateResults(response)
    }).catch(error => {
        console.error(error);
    });
}

function populateResults(response) {
    booksContainer.innerHTML = "";
    createResultsText(response.data.work_count);

    for (let i = 0; i < response.data.works.length; i++) {
        createBook(booksContainer, response.data.works[i]);
    }
    createPagination(response.data.work_count);
}

function createResultsText(resultsNumber) {
    let resultsTemplateClone = resultsTemplate.content.cloneNode(true);

    if (resultsNumber === 0) {
        resultsTemplateClone.getElementById("search-results").innerHTML = "No books found";
    } else {
        resultsTemplateClone.getElementById("search-results").innerHTML = "Results: " + resultsNumber;
    }
    resultsContainer.appendChild(resultsTemplateClone);
}


function createPagination(resultsNumber) {
    if (resultsNumber === 0) return;

    paginationContainer.innerHTML = "";
    numberOfPages = Math.ceil(resultsNumber / 10);
    let paginationTemplateClone = paginationTemplate.content.cloneNode(true);
    let pagesText = paginationTemplateClone.getElementById("pages");
    pagesText.innerHTML = currentPageNumber + "/" + numberOfPages;

    let prevButton = paginationTemplateClone.getElementById("prev-button");
    let nextButton = paginationTemplateClone.getElementById("next-button");

    if (currentPageNumber === 1) {
        prevButton.style.visibility = 'hidden';
    }
    if (currentPageNumber === numberOfPages) {
        nextButton.style.visibility = 'hidden';
    }

    prevButton.addEventListener("click", () => {
        changePage('prev')
    });
    nextButton.addEventListener("click", () => {
        changePage('next')
    });

    paginationContainer.append(paginationTemplateClone);
}

function createBook(parent, book) {
    let templateClone = bookTemplate.content.cloneNode(true);
    let bookTitle = templateClone.getElementById("book-title");
    bookTitle.innerHTML = book.title;

    let bookAuthors = templateClone.getElementById("book-authors");
    let authorString = "by ";

    if (book.authors === null || book.authors === undefined || book.authors.length === 0) {
        authorString = authorString + "Unknown author";
    } else {
        for (let i = 0; i < book.authors.length; i++) {
            authorString = authorString + book.authors[i].name;

            if (i < book.authors.length - 1) {
                authorString = authorString + ", ";
            }
        }
    }

    bookAuthors.innerHTML = authorString;
    getBookData(templateClone, book);

    parent.appendChild(templateClone);
}


function getBookData(clone, book) {
    let modalBtn = clone.getElementById("modal-button");

    modalBtn.addEventListener("click", function () {
        let modalBookDescription = initBookData(book);

        let endpoint = API_URL + book.key + ".json";

        axios.get(endpoint).then(response => {
            populateBookData(modalBookDescription, response);
        }).catch(error => {
            console.error(error);
        });
    });
}

function initBookData(book) {
    let modalBookTitle = document.getElementById("staticBackdropLabel");
    modalBookTitle.innerHTML = book.title;

    let modalBookDescription = document.getElementById("book-description");
    modalBookDescription.innerHTML = "";

    let spinnerTemplateClone = spinnerTemplate.content.cloneNode(true);
    modalBookDescription.appendChild(spinnerTemplateClone);
    return modalBookDescription;
}

function populateBookData(modalBookDescription, response) {
    modalBookDescription.innerHTML = "";

    addCoverImage(response, modalBookDescription); 

    addBookDescription(response, modalBookDescription);
    
}

function addBookDescription(response, modalBookDescription) {
    let description = document.createElement("div");
    if (response.data.description !== undefined) {
        if (typeof response.data.description === 'string') {
            description.innerHTML = response.data.description;
        } else {
            description.innerHTML = response.data.description.value;
        }
    } else {
        description.innerHTML = "Descrizione non disponibile";
    }
    description.classList.add("word-break");
    modalBookDescription.append(description);
}

function addCoverImage(response, modalBookDescription) {
    if (response.data.covers && response.data.covers.length > 0) {
        let coverEndpoint = COVER_URL + response.data.covers[0] + "-M.jpg";
        let image = document.createElement("img");
        image.src = coverEndpoint;
        image.classList.add("cover");
        modalBookDescription.append(image);
    }
}

