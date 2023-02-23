import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, Validator, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  result: any;

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {}

  loginform = this.builder.group({
    id: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  proceedlogin() {
    if (this.loginform.valid) {
      this.service.getById(this.loginform.value.id).subscribe((data) => {
        this.result = data;

        if (this.result.password === this.loginform.value.password) {
          if (this.result.isactive) {
            sessionStorage.setItem('username', this.result.id);
            sessionStorage.setItem('role', this.result.role);
            this.router.navigate(['']);
          } else {
            this.toastr.error('Please contact Admin', 'InActive User');
          }
        } else {
          this.toastr.error('Invalid credentials');
        }
      });
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }
}
