const canvas = document.getElementById('jogo2D')
const ctx = canvas.getContext('2d')
const gravidade = 0.5

const fundoImg = new Image();
fundoImg.src = 'https://img.freepik.com/vetores-gratis/fundo-do-mar-para-videoconferencia_52683-46343.jpg?w=360';  

const personagemImg = new Image();
personagemImg.src = 'https://upload.wikimedia.org/wikipedia/pt/b/bf/SpongeBob_SquarePants_personagem.png'; 

const obstaculoImg = new Image();
obstaculoImg.src = 'https://static.wixstatic.com/media/3de713_4aa75a82e3a8486c9fe632fe36500ff9~mv2.png/v1/crop/x_76,y_111,w_1127,h_478/fill/w_560,h_238,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/branquinha_edited.png'; 

document.addEventListener('keypress', (e) => {
    if (e.code == 'Space' && personagem.pulando == false) {
        personagem.velocidadey = 15
        console.log("PULOU")
        personagem.pulando = true
        pulos += 1; 
    }
})

const personagem = {
    x: 100,
    y: canvas.height - 50,
    altura: 50,
    largura: 50,
    velocidadey: 0,
    pulando: false
}

let pulos = 0; 
let recorde = 0; 

function desenharPersonagem() {
    ctx.drawImage(personagemImg, personagem.x, personagem.y, personagem.altura, personagem.largura)
}

function atualizarPersonagem() {
    if (personagem.pulando == true) {
        personagem.velocidadey -= gravidade
        personagem.y -= personagem.velocidadey
        if (personagem.y >= canvas.height - 50) {
            personagem.velocidadey = 0
            personagem.pulando = false
            personagem.y = canvas.height - 50
        }
    }
}

const obstaculo = {
    x: canvas.width - 50,
    y: canvas.height - 100,
    largura: 100,
    altura: 100,
    velocidadex: 7
}

function desenharObstaculo() {
    ctx.drawImage(obstaculoImg, obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura)
}

function atualizarObstaculo() {
    obstaculo.x -= obstaculo.velocidadex
    if (obstaculo.x <= 0 - obstaculo.largura) {
        obstaculo.x = canvas.width
        obstaculo.velocidadex += 0.2
        let nova_altura = (Math.random() * 50) + 100
        obstaculo.altura = nova_altura
        obstaculo.y = canvas.height - nova_altura
    }
}

function verificarColisao() {
    if (
        personagem.x < obstaculo.x + obstaculo.largura &&
        personagem.x + personagem.largura > obstaculo.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y
    ) {
        return true;
    }
    return false;
}

function exibirGameOver() {
    ctx.fillStyle = 'black'
    ctx.font = '48px Arial'
    ctx.fillText('GAME OVER', canvas.width / 2 - 120, canvas.height / 2)
}

function exibirContador() {
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText('Pulos: ' + pulos, 20, 30);
    ctx.fillText('Recorde: ' + recorde, 20, 60);
}

let jogoAtivo = true;

function loop() {
    if (!jogoAtivo) {
        if (pulos > recorde) {
            recorde = pulos;
        }
        exibirGameOver();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.drawImage(fundoImg, 0, 0, canvas.width, canvas.height)

    desenharPersonagem()
    desenharObstaculo()
    atualizarPersonagem()
    atualizarObstaculo()

    exibirContador();

    if (verificarColisao()) {
        jogoAtivo = false;
    }

    requestAnimationFrame(loop)
}

fundoImg.onload = () => {
    personagemImg.onload = () => {
        obstaculoImg.onload = () => {
            loop()
        }
    }
}
