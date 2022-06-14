import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nome= environment.nome
  foto= environment.foto
  id = environment.id

  constructor(private router: Router) { }

  ngOnInit() {

  }

  sair() {
    environment.nome = '';
    environment.id = 0
    environment.usuario = ''
    environment.foto = ''
    environment.token = ''
    environment.tipo = ''

    this.router.navigate(['/entrar'])
  }

}
