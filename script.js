//pegar o elemento canvas pelo id
const canvas = document.getElementById('jogo2D')

//inicializar o canvas
const ctx = canvas.getContext('2d')
const gravidade = 0.5

document.addEventListener('keypress', (e)=> {
    if(e.code == 'Space' && personagem.pulando==false) {
        console.log('clicou para pular')
        personagem.velocidadey = 15
        personagem.pulando = true
    }
})

const personagem = {
    x:100,
    y:canvas.height - 50,
    altura:50,
    largura:50,
    velocidadey:0,
    pulando: false, 
}

function desenharPersonagem(){
    ctx.fillStyle = 'yellow'
    ctx.fillRect(personagem.x,personagem.y,personagem.altura,personagem.largura)
}
function atualizarPersonagem (){
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


// criar a função loop

    // apagar a tela interior
    function loop () {
        ctx.clearRect(0,0,canvas.width,canvas.height)
    
    //desenhar novamente
    desenharPersonagem()
    //atualizar posições 
    atualizarPersonagem()

    //chamar o loop denovo
    requestAnimationFrame(loop)

}
loop()