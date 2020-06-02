import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    public getUsers() {
        var users = JSON.parse(localStorage.getItem('users'));
        return users ? users : [];
    }

    public getUserById(id: number) {
        return this.getUsers().find(user => user.id === id);
    }
}