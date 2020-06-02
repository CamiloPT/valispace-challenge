import { Component, OnInit } from "@angular/core";
import { UserService } from '../user.service';
import { Router } from '@angular/router';

export class User {
    id: number;
    username: string;
    phone: string;
    role: string;
    name: string;
}

@Component({
    selector: 'user-list',
    templateUrl: 'user-list.component.html',
    styleUrls: ['user-list.component.scss']
})
export class UserListComponent implements OnInit{
    public users: User[] = [];

    public displayedColumns = ['id', 'username', 'phone', 'role', 'name', 'actions'];

    constructor(private router: Router, private userService: UserService) {}

    ngOnInit() {
        this.users = this.userService.getUsers();
    }

    deleteUser(id: number) {
        this.userService.deleteUser(id);
        this.users = this.userService.getUsers();
    }
}