import { Component } from '@angular/core';
import { FormBuilder, Validators ,FormGroup} from '@angular/forms';
import { SessionService } from 'src/app/service/session.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form !: FormGroup;
  constructor(private fb: FormBuilder,
              private sessionService:SessionService){
    this.initForm();
  }
  initForm(): void{
    this.form = this.fb.group({
      email: ['',[Validators.email,Validators.required]],
      password: ['',[Validators.required]],
    })
  }
  submit(){
    if(this.form.valid){
      this.login();
    }
  }
  login(){
    this.sessionService
        .login(this.form.value.email,this.form.value.password)
        .subscribe((resp:any)=>{
          if(resp){
            Swal.fire('BIEN', 'Usuario y contraseña existen', 'success');
          }else{
            Swal.fire('ATENCIÓN', 'Usuario o contraseña incorrecto', 'info');
          }
        },error=>{
          console.log(error);
          
          Swal.fire('ERROR', 'El sistema no esta disponible', 'error');
        });
  }
}
