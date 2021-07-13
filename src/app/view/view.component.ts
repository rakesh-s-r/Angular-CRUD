import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/provider/user.service';

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
    user: any = {};
    constructor(
        public service: UserService,
        public router: Router,
        public activatedRoute: ActivatedRoute
    ) { }
    
    ngOnInit() {
        this.activatedRoute.params.subscribe((res) => {
            this.fetUser(res.id);
        })
    }

    fetUser(id) {
        this.service.getUserById(id).subscribe((res) => {
            this.user = res;
        })
    }

    back() {
        this.router.navigateByUrl('/list');
    }
}
