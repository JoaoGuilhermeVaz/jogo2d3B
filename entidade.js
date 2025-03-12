const canvas = document.getElementById('jogo2D')
const ctx = canvas.getContext('2d')
const gravidade = 0.5
document.addEventListener('keypress', (e) => {
    if(e.code == 'Space' && personagem.pulando==false){
        personagem.velocidadey =  15
        console.log("PULOU")
        personagem.pulando = true
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

function desenharPersonagem() {
    ctx.fillStyle = 'indigo'
    ctx.fillRect(personagem.x, personagem.y, personagem.altura, personagem.largura)
}

function atualizarPersonagem() {
    if(personagem.pulando == true){
        personagem.velocidadey -= gravidade
        personagem.y -= personagem.velocidadey
        if(personagem.y >= canvas.height-50){
            personagem.velocidadey = 0
            personagem.pulando = false
            personagem.y = canvas.height-50
        }
    }
}

const obstaculo = {
    x: canvas.width - 50,
    y: canvas.height - 100,
    largura: 50,
    altura: 100,
    velocidadex: 7
}

function desenharObstaculo() {
    ctx.fillStyle = 'crimson'
    ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura)
}

function atualizarObstaculo() {
    obstaculo.x -= obstaculo.velocidadex
    if(obstaculo.x <= 0 - obstaculo.largura){
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

let jogoAtivo = true;

function loop() {
    if (!jogoAtivo) {
        exibirGameOver();
        return;
    }
   
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    desenharPersonagem()
    desenharObstaculo()
    atualizarPersonagem()
    atualizarObstaculo()
   
    if (verificarColisao()) {
        jogoAtivo = false;
    }

    requestAnimationFrame(loop)
}

loop()