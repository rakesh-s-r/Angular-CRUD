import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/provider/user.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    collections: any = [];
    constructor(
        public service: UserService,
        public router: Router
    ) { }

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.service.getUser().subscribe((res) => {
            this.collections = res;
        })
    }

    edit(item?: any) {
        if (item) {
            return this.router.navigateByUrl(`/edit/${item._id}`)
        }
        return this.router.navigateByUrl(`/create`);
    }

    delete(item) {
        this.service.deleteUser(item._id).subscribe((res) => {
            this.getUsers();
        })
    }

    view(item) {
        return this.router.navigateByUrl(`/view/${item._id}`);
    }
}
