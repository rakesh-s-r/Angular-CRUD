import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/provider/user.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
    form: FormGroup;
    id: string;
    filesToUpload: any = [];
    urlLink: string;
    constructor(
        private fb: FormBuilder,
        private service: UserService,
        public router: Router,
        public activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((res) => {
            if (res.id) {
                this.id = res.id;
                this.fetUser();
            }
        })
        this.loadForm();
    }

    fetUser() {
        this.service.getUserById(this.id).subscribe((res) => {
            this.form.patchValue(res);
        })
    }

    loadForm() {
        this.form = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.compose([
                Validators.required,
                Validators.email
            ])],
            phoneNumber: ['', Validators.compose([
                Validators.required,
                Validators.pattern('[0-9]{10}')
            ])],
            image: ''
        })
    }

    save() {
        const controls = this.form.controls;
        console.log(controls);
        if (this.form.invalid) {
            return;
        }
        if (this.id) {
            this.editUser();
        } else {
            this.createUser();
        }
    }

    createUser() {
        this.service.createUser(this.form.value).subscribe((res) => {
            this.router.navigateByUrl('/list');
        }, (e: any) => {

        })
    }

    editUser() {
        this.service.updateUser(this.id, this.form.value).subscribe((res) => {
            this.router.navigateByUrl('/list');
        }, (e: any) => {

        })
    }

    getText() {
        if (window.location.href.includes('/edit')) {
            return 'Edit';
        }
        return 'Create'
    }

    onFileSelected(fileInput) {
        this.filesToUpload = fileInput.target.files;
        this.makeFileRequest("http://localhost:3000/upload", [], this.filesToUpload).then((result: any) => {
            this.urlLink = 'data:image/png;base64,' + result.url;
            this.form.patchValue({ image: this.urlLink });
        }, (error) => {
            console.error(error);
        });
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            for (var i = 0; i < files.length; i++) {
                formData.append("uploads", files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }

}
