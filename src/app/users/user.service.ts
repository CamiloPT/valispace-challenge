import { Injectable } from "@angular/core";
import { User } from './user-list/user-list.component';
import { Observable } from 'rxjs';
import { SharedService } from '../shared/shared.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private sharedService: SharedService) {}

    createUser(user: User) {
        var users = localStorage.getItem('users');
        var usersObj = JSON.parse(users) as User[];
        if (!users || usersObj.length===0) {
            user.id = 0;
            localStorage.setItem('users', JSON.stringify([user]));
        } else {    
            user.id = usersObj[0].id + 1;
            usersObj.unshift(user);
            localStorage.setItem('users', JSON.stringify(usersObj));
        }
    }

    editUser(newUser: User) {
        var users = JSON.parse(localStorage.getItem('users')) as User[];
        var previousUser = users.find(user => user.id === newUser.id);
        var userIndex = users.indexOf(previousUser);
        users.splice(userIndex, 1, newUser);
        localStorage.setItem('users', JSON.stringify(users));
    }

    getUsers(): User[] {
        return this.sharedService.getUsers();
    }

    getUser(id: number): User {
        return this.sharedService.getUserById(id);
    }

    deleteUser(id: number) {
        var usersObj = JSON.parse(localStorage.getItem('users')) as User[];
        usersObj = usersObj.filter(user => user.id !== id);
        localStorage.setItem('users', JSON.stringify(usersObj));
    }
}