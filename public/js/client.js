window.addEventListener("load", function () {

    // Sporadic website base URL
    const BASE_URL = "./services/pokemon";

    fetchTypeData();
    fetchRandomPokemon();

    document.querySelector("#btn-randomize").addEventListener("click", fetchRandomPokemon);

    async function fetchTypeData() {
        const response = await fetch(`${BASE_URL}/types`);
        const typeData = await response.json();
        populateTypeChartTable(typeData);
    }

    async function fetchRandomPokemon() {
        const response = await fetch(`${BASE_URL}/random`);
        const pokemonSummary = await response.json();

        displayFeaturedPokemon(pokemonSummary);

        const detailResponse = await fetch(`${BASE_URL}?id=${pokemonSummary.id}`);
        const pokemonDetail = await detailResponse.json();

        populateModal(pokemonDetail);
    }

    function populateTypeChartTable(typeData) {

        const thead = document.querySelector("#type-chart-header");
        const tbody = document.querySelector("#type-chart-body");

        const headerRow = document.createElement("tr");
        headerRow.innerHTML += "<th></th>";
        typeData.forEach(function(type) {
            headerRow.innerHTML += `<th>${type.name}</th>`;

            addTypeChartRow(tbody, type);
        });
        thead.appendChild(headerRow);

    }

    function addTypeChartRow(tbody, type) {
        const row = document.createElement("tr");
        row.innerHTML += `<th>${type.name}</th>`;
        type.data.forEach(function(cell) {
            row.innerHTML += `<td>${cell}</td>`;
        });

        tbody.appendChild(row);
    }

    function displayFeaturedPokemon(pokemonSummary) {

        const featuredPokemonCard = document.querySelector("#featured-pokemon-card");
        const cardImg = featuredPokemonCard.querySelector("img");
        const nameHeader = featuredPokemonCard.querySelector(".card-title");
        const typesP = featuredPokemonCard.querySelector(".card-text");

        cardImg.src = `./images/pokemon/${pokemonSummary.imageUrl}`;
        cardImg.alt = pokemonSummary.name;
        nameHeader.innerText = pokemonSummary.name;
        typesP.innerHTML = `<strong>Types: </strong>${pokemonSummary.types.join()}`;
    }

    function populateModal(pokemonDetail) {

        const detailHeader = document.querySelector("#detail-modal-title");
        const detailImg =  document.querySelector("#detail-image");
        const detailTypesP =  document.querySelector("#detail-types");
        const detailDescP =  document.querySelector("#detail-description");

        detailHeader.innerText = pokemonDetail.name;
        detailImg.src = `./images/pokemon/${pokemonDetail.imageUrl}`;
        detailTypesP.innerHTML = `<strong>Types: </strong>${pokemonDetail.types.join()}`;
        detailDescP.innerText = pokemonDetail.description;

    }
});