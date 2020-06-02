import { Component, OnInit } from '@angular/core';
import { User } from '../user-list/user-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, AbstractControl, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '../user.service';

// This is necessary to the reactive form only check the errors on submit
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return !!(control && control.invalid && form && form.submitted);
    }
}

@Component({
    selector: 'user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.scss']
})
export class UserComponent implements OnInit {
    public userForm: FormGroup;

    public matcher = new MyErrorStateMatcher();

    constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            if (params.has('id')) {
                var user = this.userService.getUser(+params.get('id'));
                this.userForm = new FormGroup({
                    id: new FormControl(user.id),
                    username: new FormControl(user.username, [Validators.required, Validators.pattern('[\\w\-\_]\+')]),
                    phone: new FormControl(user.phone, [Validators.required, Validators.pattern('\^[0-9]\*\$'), this.validatePhoneNumber(user.id)]),
                    role: new FormControl(user.role, [Validators.required]),
                    name: new FormControl(user.name, [Validators.required])
                });
            } else {
                this.userForm = new FormGroup({
                    username: new FormControl('', [Validators.required, Validators.pattern('[\\w\-\_]\+')]),
                    phone: new FormControl('', [Validators.required, Validators.pattern('\^[0-9]\*\$') ,this.validatePhoneNumber()]),
                    role: new FormControl('', [Validators.required]),
                    name: new FormControl('', [Validators.required])
                });
            }
        });
    }

    confirmUser() {
        if (this.userForm.valid) {
            if (this.userForm.value.id >= 0) {
                this.userService.editUser(this.userForm.value as User)
            } else {
                this.userService.createUser(this.userForm.value as User);
            }
            this.router.navigateByUrl('admin');
        }
    }

    cancel() {
        this.router.navigateByUrl('admin');
    }

    getErrorMessage(fieldErros: AbstractControl) {
        if (fieldErros.hasError('required')) {
            return 'This field is required'
        }
        if (fieldErros.hasError('pattern')) {
            return 'Incorrect format'
        }
        if (fieldErros.hasError('phoneUnique')) {
            return 'Already exists a user with that phone number'
        }

    }

    validatePhoneNumber(id?:number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            var phones = this.userService.getUsers().filter(user=> user.id !== id).map(user => user.phone);
            if (control.value !== null) {
                return phones.find(phone => control.value === phone) ? { phoneUnique: true } : null;
            }
            return null;
        };
    }
}