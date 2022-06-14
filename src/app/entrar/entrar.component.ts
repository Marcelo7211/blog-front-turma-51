import { environment } from './../../environments/environment.prod';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin()

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0,0)
  }

  // logar(){
  //   this.auth.logar(this.usuarioLogin).subscribe((resp: UsuarioLogin) => {
  //     this.usuarioLogin = resp
  //       environment.nome = this.usuarioLogin.nome;
  //       environment.id = this.usuarioLogin.id;
  //       environment.usuario = this.usuarioLogin.usuario;
  //       environment.foto = this.usuarioLogin.foto;
  //       environment.token = this.usuarioLogin.token;
  //       environment.tipo = this.usuarioLogin.tipo;

  //       this.router.navigate(['/inicio'])
  //   }, erro => {
  //     if (erro.status == 401) {
  //       alert('Usuario ou senha invalidos')
  //     }
  //   })
  // }

  entrar(){
    this.auth.logar(this.usuarioLogin).subscribe({
      next: (resp: UsuarioLogin) => {
        this.usuarioLogin = resp
        environment.nome = this.usuarioLogin.nome;
        environment.id = this.usuarioLogin.id;
        environment.usuario = this.usuarioLogin.usuario;
        environment.foto = this.usuarioLogin.foto;
        environment.token = this.usuarioLogin.token;
        environment.tipo = this.usuarioLogin.tipo;
        this.router.navigate(['/inicio'])
      },
      error: erro => {
        if (erro.status == 401) {
          alert('Usuario ou senha inválidos')
        }
      }
    })
  }

}
