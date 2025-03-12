class Veiculo {
    constructor( tipo, marca,cor, velocidade, passageiros){
        this.tipo = tipo;
        this.marca = marca;
        this.cor = cor;
        this.velocidade = velocidade;
        this.passageiros = passageiros;
    }
    acelerar = function(){
        this.velocidade += 10
        console.log(this.velocidade)
    }
    freiar = function(){
        if (this.velocidade > 0){
            this.velocidade -= 5
            console.log(this.velocidade)
        }else{
            console.log("o carro já está parado")
        }
    }
}
class Aviao extends Veiculo{
    constructor(tipo, marca, cor, mach, passageiros, companhia){
        super(tipo, marca, cor, mach, passageiros, companhia);
        this.companhia = companhia;
    }
}

class Barco extends Veiculo{
    constructor(tipo, marca, cor, noz, tripulação, marina){
    super(tipo, marca, cor, noz, tripulação, marina);
    this.marina = marina;
    }
}


const carro = new Veiculo('SUV','renaut','cinza',0,0)
const outro_carro = new Veiculo('sedan','fiat', 'preto', 0,0)
outro_carro.acelerar()
carro.acelerar()
carro.acelerar()
carro.freiar()
carro.freiar()
console.log(carro)

const aviao = new Aviao('Comercial', 'boeing', 'branco', 0, 0, 'azul')
aviao.acelerar()
aviao.freiar()
console.log(aviao)

const barco = new Barco('iate', 'seila', 'azul', 0,0, 'Biguaçu')
barco.acelerar()
barco.freiar()
console.log(barco)