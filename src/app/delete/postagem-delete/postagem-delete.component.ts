import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from 'src/app/model/Postagem';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem()

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == '') {
      alert('Vai pá onde??')
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.getPostagemById(id)

  }

  getPostagemById(id: number) {
    this.postagemService.getPostagemById(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  deletarPostagem() {
    this.postagemService.deletePostagem(this.postagem.id).subscribe(() => {
      alert('Postagem apagada com sucesso')
      this.router.navigate(['/inicio'])
    })
  }

}
