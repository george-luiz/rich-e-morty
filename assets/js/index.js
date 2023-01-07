// const baseUrl = "https://rickandmortyapi.com/api/character";
const baseUrl = "https://rickandmortyapi.com/api/character/?page=1";
let corpo = document.getElementById("main");
let next = document.getElementById("btnNext");
let numeroPagina = document.getElementById("number-page");
let prev = document.getElementById("btnPrev");
let valor = 1;

async function buscandoDados(valor) {
  let resposta = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${valor}`
  );
  let respostaTransformada = await resposta.json();

  return colocandoDados(respostaTransformada);
}

function colocandoDados(respostaTransformada) {
  respostaTransformada.results.map((element) => {
    const imagem = element.image;
    const nome = element.name;
    const status = element.status;
    const especies = element.species;
    const localizacao = element.location.name;
    const genero = element.gender;

    return (corpo.innerHTML += `
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
        `);
  });
}

let incremento = 1;

next.addEventListener("click", () => {
  corpo.innerHTML = "";
  valor++;
  incremento = valor
  numeroPagina.innerHTML = incremento;

  console.log(incremento);
  buscandoDados(incremento);
});

prev.addEventListener("click", () => {
  if (valor > 1) {
    corpo.innerHTML = "";
    valor--;
    let decremento = valor;
    numeroPagina.innerHTML = decremento;

    console.log(decremento);
    buscandoDados(decremento);
  } else {
    console.log("valor menor ou igual a 1", valor);
  }
});

buscandoDados(valor);
