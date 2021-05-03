import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { Produto } from './../Objetos/Produto'
import { ProdutoService } from '../service/produto.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent implements OnInit {

  id: any
  textoBotao: string = 'Salvar'
  produto: Produto = new Produto('',0, '', 0, 0, '')

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private prodService: ProdutoService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(parametros => {
      if (parametros['id']) {
        this.textoBotao = 'Editar'
        this.id = parametros['id']
        this.prodService.buscarItemID(this.id).subscribe(prod => {
          this.produto = prod
        })

        console.log(`ID enviado: ${this.id}`)
      }
    })
  }

  adicionarItem = () => {
    if (this.textoBotao == 'Salvar') {
      this.prodService.adicionarItem(this.produto).subscribe(
        sucesso => this.navegar('home'),
        error => console.error(new Error('[ERRO]')),
        () => console.log('Requsição Completa'))
    } else {
      this.editarItem()
    }
  }

  editarItem = () => {
    this.prodService.editarItem(this.produto).subscribe(
      sucesso => this.navegar('home'),
      error => console.error(new Error('[ERRO]')),
      () => console.log('Requsição Completa'))
  }

  navegar = (rota: any) => {
    this.router.navigate([rota])
  }

}
