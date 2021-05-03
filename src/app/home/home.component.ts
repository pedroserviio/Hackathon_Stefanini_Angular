import { Component, OnInit } from '@angular/core';
import { Produto } from '../Objetos/Produto';
import { ProdutoService } from './../service/produto.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  prod: any
  produtos: Array<Produto> = []
  carregarLoading: boolean = false
  filtroPesquisa: any 
  key: any = 'id'
  reverse: boolean = false

  constructor(private produtoService: ProdutoService, private router: Router) { }

  ngOnInit(): void {
    this.produtoService.listar().subscribe(prods => {
      setTimeout(() => {
        this.carregarLoading = true
        this.produtos = prods
      }, 3000)

    })
  }

  excluirItem = (id: any) => {
    this.produtoService.excluirItem(id).subscribe(
      sucesso => this.navegar('home'),
      error => console.error(new Error('[ERRO]')),
      () => console.log('Requsição Completa'))
    this.ngOnInit()
  }

  descricaoItem = (id: any) => {
    this.router.navigate(['descricao', id])
  }

  editarItem = (id: any) => {
    this.router.navigate(['cadastro', id])
  }

  sort = (key: any) => {
    this.key = key
    this.reverse = !this.reverse
  }

  aplicarDesconto = (preco: any, desconto: number = 0.10) => {
    return preco -= (preco * desconto)
  }

  navegar = (rota: any) => {
    this.router.navigate([rota])
  }

}
