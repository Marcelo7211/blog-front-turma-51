import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: Tema = new Tema()

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == '') {
      alert('Vai pá onde??')
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.buscarTemaPorId(id)
  }

  buscarTemaPorId(id: number) {
    this.temaService.getTemaById(id).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  deletarTema() {
    this.temaService.deleteTema(this.tema.id).subscribe(() => {
      alert('Tema apagado com sucesso')
      this.router.navigate(['/temas'])
    })
  }

}
