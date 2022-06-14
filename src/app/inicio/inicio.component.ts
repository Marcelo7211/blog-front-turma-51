import { AuthService } from './../service/auth.service';
import { Postagem } from './../model/Postagem';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemaService } from '../service/tema.service';
import { Tema } from '../model/Tema';
import { PostagemService } from '../service/postagem.service';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  idUsuario = environment.id
  usuario: Usuario = new Usuario()

  constructor(
    private router: Router,
    private temaService: TemaService,
    private postagemService: PostagemService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == '') {
      alert('Vai pá onde??')
      this.router.navigate(['/entrar'])
    }

    this.auth.refreshToken()
    this.buscarTemas()
    this.getPostagens()
  }

  buscarUsuario(){
    this.auth.usuarioById(this.idUsuario).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  buscarTemas(){
    this.temaService.getTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  buscarTemaPorId() {
    this.temaService.getTemaById(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  publicar() {
    this.postagem.tema = this.tema

    this.usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem efetuada com sucesso')
      this.postagem = new Postagem()
      this.getPostagens()
    })
  }

  getPostagens() {
    this.postagemService.getPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

}
