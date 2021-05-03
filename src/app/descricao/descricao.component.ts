import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Produto } from '../Objetos/Produto';
import { ProdutoService } from '../service/produto.service';


@Component({
  selector: 'app-descricao',
  templateUrl: './descricao.component.html',
  styleUrls: ['./descricao.component.css']
})

export class DescricaoComponent implements OnInit {

  id: any
  produto: Produto = new Produto('', 0, '', 0, 0, '')

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private prodService: ProdutoService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(parametros => {
      if (parametros['id']) {
        this.id = parametros['id']
        this.prodService.buscarItemID(this.id).subscribe(prod => {
          this.produto = prod
        })

        console.log(`ID enviado: ${this.id}`)
      }
    })
  }

  voltarHome = () => {
    this.navegar('home')
  }

  navegar = (rota: any) => {
    this.router.navigate([rota])
  }
}
