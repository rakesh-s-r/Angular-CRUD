import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    url: string = environment.serverURL;
    constructor(
        private http: HttpClient
    ) { }

    getUser() {
        return this.http.get(`${this.url}/user/get`);
    }

    deleteUser(id) {
        return this.http.delete(`${this.url}/user/delete/${id}`);
    }

    updateUser(id, payload) {
        return this.http.post(`${this.url}/user/update/${id}`, payload);
    }

    createUser(payload) {
        return this.http.post(`${this.url}/user/post`, payload);
    }

    getUserById(id) {
        return this.http.get(`${this.url}/user/get/${id}`);
    }
}
