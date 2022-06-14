import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {
  tema: Tema = new Tema()
  listaTemas: Tema[]

  constructor(private temaService: TemaService, private router: Router) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == '') {
      alert('Vai pá onde??')
      this.router.navigate(['/entrar'])
    }

    this.buscarTemas()
  }

  buscarTemas(){
    this.temaService.getTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
      console.log(this.listaTemas)
    })
  }


  cadastrarTema(){
    this.temaService.postTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp
      alert('Tema criado.')
      this.buscarTemas()
      this.tema = new Tema()
    })
  }

}
