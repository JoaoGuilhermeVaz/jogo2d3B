const canvas = document.getElementById('jogo2D')
const ctx = canvas.getContext('2d')
const gravidade = 0.5
let gameOver = false
let pontuacao = 0  // Variável de pontuação

// Carregar a imagem da moto
const motoImg = new Image()
motoImg.src = 'https://can-am.brp.com/content/dam/global/en/can-am-off-road/my24/photos/vehicle-lineup/atv/outlander/outlander-x-mr-1000r/ORV-ATV-MY24-Outlander-Xmr-1000R-Hyper-silver-Legion-red-0005KRB00-34FR-NA.png'  // Substitua com o caminho ou URL para a imagem da moto

// Carregar a imagem da viatura da polícia
const viaturaImg = new Image()
viaturaImg.src = 'https://i.pinimg.com/550x/69/e7/83/69e783cb3093100a417b6287956dad4e.jpg'  // Substitua com o caminho ou URL para a imagem da viatura

// Carregar a imagem de fundo
const fundoImg = new Image()
fundoImg.src = 'https://thumbs.dreamstime.com/b/vista-lateral-de-uma-estrada-com-barreira-impacto-fundo-claro-do-c%C3%A9u-azul-prado-verde-da-borda-ilustra%C3%A7%C3%A3o-vetor-134226839.jpg'  // Substitua com o caminho ou URL para a sua imagem de fundo

document.addEventListener('keypress', (e) => {
    if(e.code == 'Space' && personagem.pulando == false && !gameOver){
        personagem.velocidadey = 15
        console.log("PULOU")
        personagem.pulando = true
    }
})

const personagem = {
    x: 100,
    y: canvas.height - 50,
    altura: 50,
    largura: 100,  // Ajuste a largura para a moto
    velocidadey: 0,
    pulando: false
}

function desenharPersonagem(){
    // Agora desenhamos a moto em vez de um quadrado
    ctx.drawImage(motoImg, personagem.x, personagem.y, personagem.largura, personagem.altura)
}

function atualizarPersonagem(){
    if(personagem.pulando){
        personagem.velocidadey -= gravidade
        personagem.y -= personagem.velocidadey
        if(personagem.y >= canvas.height - 50){
            personagem.velocidadey = 0
            personagem.pulando = false
            personagem.y = canvas.height - 50
        }
    }
}

const obstaculo = {
    x: canvas.width - 100,  // Ajuste a posição inicial da viatura
    y: canvas.height - 120,  // Ajuste a posição vertical da viatura
    largura: 70,  // Largura da viatura
    altura: 50,  // Altura da viatura
    velocidadex: 7
}

function desenharObstaculo(){
    // Agora desenhamos a viatura no lugar do obstáculo
    ctx.drawImage(viaturaImg, obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura)
}

function atualizarObstaculo(){
    obstaculo.x -= obstaculo.velocidadex
    if(obstaculo.x <= 0 - obstaculo.largura){
        obstaculo.x = canvas.width
        obstaculo.velocidadex += 0.2
        let nova_altura = (Math.random() * 50) + 60  // Ajuste a altura da viatura se necessário
        obstaculo.altura = nova_altura
        obstaculo.y = canvas.height - nova_altura
        pontuacao++  // Aumenta a pontuação quando o personagem passa por um obstáculo
        console.log("Pontuação: " + pontuacao)  // Exibe a pontuação no console
    }
}

function detectarColisao(){
    if (
        personagem.x < obstaculo.x + obstaculo.largura &&
        personagem.x + personagem.largura > obstaculo.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y
    ) {
        console.log("GAME OVER")
        gameOver = true
    }
}

function desenharGameOver(){
    ctx.fillStyle = 'red'
    ctx.font = '50px Arial'
    ctx.fillText('GAME OVER', canvas.width / 2 - 150, canvas.height / 2)
}

function desenharPontuacao(){
    ctx.fillStyle = 'black'
    ctx.font = '30px Arial'
    ctx.fillText('Pontuação: ' + pontuacao, 20, 30)  // Exibe a pontuação no canto superior esquerdo
}

function desenharFundo(){
    // Desenha a imagem de fundo na tela
    ctx.drawImage(fundoImg, 0, 0, canvas.width, canvas.height)
}

function loop(){
    if (gameOver) {
        desenharGameOver()
        return // Para o jogo se gameOver for verdadeiro
    }
   
    ctx.clearRect(0, 0, canvas.width, canvas.height)
   
    desenharFundo()  // Desenha o fundo antes dos outros elementos
    desenharPersonagem()
    desenharObstaculo()
    desenharPontuacao()  // Desenha a pontuação no jogo
    atualizarPersonagem()
    atualizarObstaculo()
    detectarColisao()
   
    requestAnimationFrame(loop)
}

// Aguarda as imagens serem carregadas antes de iniciar o jogo
motoImg.onload = function() {
    viaturaImg.onload = function() {
        fundoImg.onload = function() {
            loop()  // Inicia o loop do jogo depois de todas as imagens carregadas
        }
    }
}
