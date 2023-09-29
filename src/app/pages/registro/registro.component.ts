import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/service/session.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  form !: FormGroup;
  constructor(private fb: FormBuilder,
              private sessionService:SessionService){
    this.initForm();
  }
  initForm(): void{
    this.form = this.fb.group({
      Nombre: ['',[Validators.required]],
      Apellido: ['',[Validators.required]],
      Correo: ['',[Validators.email,Validators.required]],
      Documento: ['',[Validators.required]],
      TipoIdDocumento: [1,[Validators.required]],
      Password: ['',[Validators.required]],
    })
  }
  submit(){
    if(this.form.valid){
      this.registro();
    }
  }
  registro(){
    this.sessionService
        .registro(this.form.value)
        .subscribe((resp:any)=>{
          switch(resp){
            case 1:
              Swal.fire('BIEN', 'Usuario creado', 'success');
              break;
            case 2:
              Swal.fire('ATENCIÓN', 'Usuario no creado, rveise los datos', 'info');
              break;
            case 3:
              Swal.fire('ATENCIÓN', 'El correo ya existe', 'info');
              break;
            default:
              Swal.fire('ERROR', 'El sistema no esta disponible', 'error');
              break;
          }
        },error=>{
          Swal.fire('ERROR', 'El sistema no esta disponible', 'error');
        });
  }
}
