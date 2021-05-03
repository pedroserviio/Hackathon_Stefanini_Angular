export class Produto {
    
    constructor(public img:any, public id: number, public nome: string, public preco: number, private desconto: number = 0.10, public descricao: string){

    }

    public aplicarDesconto = (preco: number) => preco -= (preco * this.desconto) 

}