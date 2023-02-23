import { Component } from '@angular/core';
import { FormBuilder, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private builder: FormBuilder,
    private toaster: ToastrService,
    private router: Router,
    private service: AuthService
  ) {}

  registerform = this.builder.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern('(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    gender: ['male', [Validators.required]],
    role: [''],
    isactive: [false],
  });

  proceedregister() {
    if (this.registerform.valid) {
      this.service.post(this.registerform.value).subscribe((result) => {
        this.toaster.success('Registered Successfully');
        this.router.navigate(['login']);

        // console.log(this.registerform.value);
      });
    } else {
      this.toaster.warning('Please enter Valid Data');
    }
  }
}
