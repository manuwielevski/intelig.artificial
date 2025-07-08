const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const perguntas = [
    {
        enunciado: "Como você lida com os sentimentos dos outros?",
        alternativas: [
            { texto: "Percebo facilmente o que os outros sentem.", afirmacao: "empatico" },
            { texto: "Nem sempre percebo, mas tento ajudar como posso.", afirmacao: "determinado" }
        ]
    },
    {
        enunciado: "Diante de um obstáculo, você...",
        alternativas: [
            { texto: "Enfrenta sem pensar duas vezes.", afirmacao: "corajoso" },
            { texto: "Analisa e tenta prever o que pode acontecer.", afirmacao: "estrategico" }
        ]
    },
    {
        enunciado: "Qual dessas qualidades mais combina com você?",
        alternativas: [
            { texto: "Liberdade acima de tudo!", afirmacao: "livre" },
            { texto: "Prefiro observar antes de agir.", afirmacao: "observador" }
        ]
    },
    {
        enunciado: "Você costuma ser mais...",
        alternativas: [
            { texto: "Aventureiro, ama novidades.", afirmacao: "aventureiro" },
            { texto: "Reservado, gosta do seu espaço.", afirmacao: "reservado" }
        ]
    },
    {
        enunciado: "Se tivesse um minuto extra no tempo, você...",
        alternativas: [
            { texto: "Refletiria para tomar a melhor decisão.", afirmacao: "reflexivo" },
            { texto: "Usaria para agir com mais força!", afirmacao: "determinado" }
        ]
    }
];

let atual = 0;
let respostas = [];

if (localStorage.getItem("progresso")) {
    atual = parseInt(localStorage.getItem("progresso"));
    respostas = JSON.parse(localStorage.getItem("respostas")) || [];
}

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }

    const perguntaAtual = perguntas[atual];
    caixaPerguntas.innerHTML = `<strong>Pergunta ${atual + 1} de ${perguntas.length}</strong><br><br>${perguntaAtual.enunciado}`;
    caixaAlternativas.textContent = "";

    for (const alternativa of perguntaAtual.alternativas) {
        const botao = document.createElement("button");
        botao.textContent = alternativa.texto;
        botao.addEventListener("click", () => respostaSelecionada(alternativa.afirmacao));
        caixaAlternativas.appendChild(botao);
    }
}

function respostaSelecionada(afirmacao) {
    respostas.push(afirmacao);
    atual++;

    localStorage.setItem("progresso", atual);
    localStorage.setItem("respostas", JSON.stringify(respostas));

    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.textContent = "Resultado: Seu superpoder seria...";
    caixaAlternativas.textContent = "";

    const contagem = {};
    respostas.forEach(resp => contagem[resp] = (contagem[resp] || 0) + 1);

    const maisFrequente = Object.keys(contagem).reduce((a, b) => contagem[a] > contagem[b] ? a : b);

    let superpoder = "";

    switch (maisFrequente) {
        case "empatico":
        case "intuitivo":
            superpoder = "🧠 Telepatia — Você entende os outros como ninguém!";
            break;
        case "corajoso":
        case "determinado":
            superpoder = "💪 Superforça — Você enfrenta qualquer desafio sem medo!";
            break;
        case "reservado":
        case "observador":
            superpoder = "🕵️ Invisibilidade — Você age nas sombras, com astúcia.";
            break;
        case "estrategico":
        case "reflexivo":
            superpoder = "⏳ Controle do Tempo — Você pensa antes de agir e manipula o momento certo.";
            break;
        case "livre":
        case "aventureiro":
            superpoder = "🕊️ Voo — Nada pode te prender!";
            break;
        default:
            superpoder = "✨ Um poder misterioso que nem mesmo a ciência explica!";
    }

    caixaResultado.style.display = "block";
    textoResultado.textContent = superpoder;

    const botaoReiniciar = document.createElement("button");
    botaoReiniciar.textContent = "Recomeçar";
    botaoReiniciar.addEventListener("click", () => {
        localStorage.clear();
        location.reload();
    });

    caixaAlternativas.appendChild(botaoReiniciar);
}

mostraPergunta();

// Animação de partículas (mantida do original)
const canvas = document.getElementById('particulas');
const ctx = canvas.getContext('2d');
let particulas = [];
const quantidade = 100;

function redimensionar() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", redimensionar);
redimensionar();

class Particula {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.tamanho = Math.random() * 2 + 1;
        this.velocidadeX = Math.random() * 0.4 - 0.2;
        this.velocidadeY = Math.random() * 0.4 - 0.2;
        this.alpha = Math.random() * 0.5 + 0.3;
    }

    desenhar() {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.arc(this.x, this.y, this.tamanho, 0, Math.PI * 2);
        ctx.fill();
    }

    atualizar() {
        this.x += this.velocidadeX;
        this.y += this.velocidadeY;

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }

        this.desenhar();
    }
}

function initParticulas() {
    particulas = [];
    for (let i = 0; i < quantidade; i++) {
        particulas.push(new Particula());
    }
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i of particulas) {
        i.atualizar();
    }
    requestAnimationFrame(animar);
}

initParticulas();
animar();
