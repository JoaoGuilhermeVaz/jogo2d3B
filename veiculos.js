class Veículo {
    construtor(tipo, marca, cor, velocidade, pasegeiros){
        this.tipo = tipo;
        this.marca = marca;
        this.cor = cor;
        this.velocidade = velocidade;
        this.passageiros = passageiros;
    }
    acelerar = function () {
        this.velocidade += 10
        console.log(this.velocidade)
    }
}
freiar = function (){
    if (this.velocidade > 0)
        this.velocidade -= 5
} else {
    console.log('o carro ja esta parado')
}

const carro = new veiculo( 'Gol','Volkswagen','vinho', 0, 0)
console.log(carro)
carro.acelerar()
carro.acelerar()
carro.freiar()
carro.acelerar()