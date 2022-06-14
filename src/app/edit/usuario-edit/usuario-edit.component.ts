import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css'],
})
export class UsuarioEditComponent implements OnInit {
  usuario: Usuario = new Usuario();
  confirmarSenha: string;
  tipoUsuario: string;

  constructor(
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      alert('Quer alterar perfil sem estar logado como?');
      this.router.navigate(['/entrar']);
    }

    let id = this.route.snapshot.params['id'];
    this.buscarUsuario(id);
  }

  buscarUsuario(id: number) {
    this.auth.usuarioById(id).subscribe((resp: Usuario) => {
      this.usuario = resp;
      this.usuario.senha = ''
    });
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value;
  }

  atualizar() {
    this.auth.editar(this.usuario).subscribe((resp: Usuario) => {
      this.usuario = resp;
      alert('Usuario atualizado com sucesso. Faça login novamente');

      environment.nome = '';
      environment.id = 0;
      environment.usuario = '';
      environment.foto = '';
      environment.token = '';
      environment.tipo = '';

      this.router.navigate(['/entrar']);
    });
  }
}
