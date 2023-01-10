const baseUrl = "https://rickandmortyapi.com/api/character/";
let searc = document.getElementById("searc");
let error = document.getElementById("error");
let corpo = document.getElementById("main");
let next = document.getElementById("btnNext");
let numeroPagina = document.getElementById("number-page");
let prev = document.getElementById("btnPrev");
let pageAtual = 1;

async function buscandoDados(parametro, page) {
  try {
    const resposta = await fetch(`${baseUrl}?${parametro}=${page}`);
    const respostaConvertida = await resposta.json();

    return colocandoDados(respostaConvertida);
  } catch (e) {
    error.innerHTML = "Não encontrado este nome, Tente novamente."

  }
}

function colocandoDados(respostaConvertida) {
  respostaConvertida.results.map((element) => {
    const id = element.id;
    const imagem = element.image;
    const nome = element.name;
    const status = element.status;
    const especies = element.species;
    const localizacao = element.location.name;
    const genero = element.gender;

    return constroiCard(
      id,
      imagem,
      nome,
      status,
      especies,
      localizacao,
      genero
    );
  });
}

function constroiCard(id, imagem, nome, status, especies, localizacao, genero) {
  return (corpo.innerHTML += `
            <a href="character.html?id=${id}">
                <section class="card">
                    <img src="${imagem}" alt="personagem"
                        class="img-personagem">
                    <div class="card__container">
                        <div class="card__container__description">
                            <h3 class="card__container__description-title">${nome}</h3>
                            <section class="card__container__description-img">
                                ${
                                  status === "Alive"
                                    ? `<i class="fa-solid fa-heart"></i>`
                                    : `<i class="fa-regular fa-heart"></i>`
                                } 
                                <span class="paragraph">${
                                  status === "unknown" ? "Desconhecido" : status
                                } - ${especies}</span>
                            </section>
                        </div>
                        <div class="card__container__description">
                            <h3 class="card__title-secondary">Last know location</h3>
                            <p class="paragraph">${localizacao}</p>
                        </div>
                        <div class="card__container__description">
                            <h3 class="card__title-secondary">Gender</h3>
                            <p class="paragraph">${genero}</p>
                        </div>
                    </div>
                 </section>
            </a>
          `);
}

next.addEventListener("click", () => {
  nextPage();
});

prev.addEventListener("click", () => {
  prevPage();
});

searc.addEventListener("blur", (e) => {
  let valorDigitado = e.target.value;
  error.innerHTML = "";
  corpo.innerHTML = "";
  buscandoDados("name", valorDigitado);
});

function nextPage() {
  let incremento = 1;
  error.innerHTML = "";
  corpo.innerHTML = "";
  pageAtual++;
  incremento = pageAtual;
  numeroPagina.innerHTML = incremento;
  buscandoDados("page", incremento);
}

function prevPage() {
  if (pageAtual > 1) {
    error.innerHTML = "";
    corpo.innerHTML = "";
    pageAtual--;
    let decremento = pageAtual;
    numeroPagina.innerHTML = decremento;

    buscandoDados("page", decremento);
  } else {
  }
}

buscandoDados(pageAtual);
