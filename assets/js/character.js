const url = new URLSearchParams(window.location.search);
const urlParams = url.get("id");

console.log(urlParams);

const div = document.getElementById("div");

async function buscaDados(id) {
    let resposta = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    let respostaTransformada = await resposta.json();

    return colocaDados(respostaTransformada);
}


function colocaDados(respostaTransformada) {
    const name = respostaTransformada.name;
    const imagem = respostaTransformada.image;
    const id = respostaTransformada.id;
    const estatus = respostaTransformada.status;
    const especie = respostaTransformada.species;
    const tipo = respostaTransformada.type;
    const sexo = respostaTransformada.gender;
    const origen = respostaTransformada.origin.name;
    const localizacao = respostaTransformada.location.name;

    div.innerHTML = `
        <h2 id="name">${name}</h2>
        <section class="container__description">
            <img src="${imagem}" alt="personagem" id="imagem">
            <ul>
                <li>
                    <h3>Id: </h3>
                    <p>${id}</p>
                </li>
                <li>
                    <h3>Status: </h3>
                    <p>${estatus}</p>
                </li>
                <li>
                    <h3>Species: </h3>
                    <p>${especie}</p>
                </li>
                <li>
                    <h3>Type: </h3>
                    <p>${tipo}</p>
                </li>
                <li>
                    <h3>Gender: </h3>
                    <p>${sexo}</p>
                </li>
                <li>
                    <h3>Origin: </h3>
                    <p>${origen}</p>
                </li>
                <li>
                    <h3>Location: </h3>
                    <p>${localizacao}</p>
                </li>
            </ul>
        </section>
    `;
}

buscaDados(urlParams);

