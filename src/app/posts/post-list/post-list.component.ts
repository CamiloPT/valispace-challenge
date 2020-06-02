import { Component, ViewChild, TemplateRef, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Post } from '../post';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { PostService } from '../post.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
    selector: 'post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostsListComponent implements OnInit {
    
    public posts: Post[] = [];
    public newPost: FormGroup;
    
    public dialogRef: MatDialogRef<any, any>;
    @ViewChild('dialog') dialogTemplate: TemplateRef<any>;
    @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

    public userNameOptions: any[] = [];
    public phoneOptions: any[] = [];
    public autocompleteOptions: any[] = [];
    public filterOptions: Observable<any[]>;
    public previousPost: any;

    constructor(public dialog: MatDialog, private postService: PostService) { }

    ngOnInit() { 
        this.newPost = new FormGroup({
            postText: new FormControl(''), // this is what the user sees in the screen
            postTextValue: new FormControl(''), //this is used for saving the autocomplete options
        });

        this.posts = this.postService.getPosts();
        this.postService.getUsers().forEach(user => {
            this.userNameOptions.push({
                name: user.username,
                id: user.id,
            });
            this.phoneOptions.push({
                name: user.phone,
                id: user.id
            });
        });
    }

    openNewPost() {
        this.newPost = new FormGroup({
            postText: new FormControl(''),
            postTextValue: new FormControl('')
        });
        this.dialogRef = this.dialog.open(this.dialogTemplate, {
            width: '500px',
            maxHeight: '350px'
        });

        this.newPost.controls.postText.valueChanges.subscribe((text: any) => {
            console.log(text);
            if(text.name ||text.value)
                return;
            if(text.endsWith('@')) {
                this.autocompleteOptions = [...this.userNameOptions];
                this.openAutocomplete();
            }
            if(text.endsWith('#')) {
                this.autocompleteOptions = [...this.phoneOptions];
                this.openAutocomplete();
            }
        });

        this.dialogRef.afterClosed().subscribe(result => {
            // This is for the manipulation of the post input
            if (result && result.value) {
                let postText = (result.value.postText as string).split(' ');
                let postTextValue = (result.value.postTextValue as string).split(' ');
                if(postText.length < postTextValue.length) {
                    for(let i = postText.length; i<postTextValue.length; i++) {
                        postTextValue.splice(i);
                    }
                }else if(postText.length > postTextValue.length) {
                    for(let i = postTextValue.length; i<postText.length; i++) {
                        postTextValue.push(postText[i]);
                    }
                }

                this.postService.createPost(new Post(postText.reduce((a,b) => a + ' ' + b), postTextValue.reduce((a,b) => a + ' ' + b), result.value.userId, this.posts.length));
                this.posts = this.postService.getPosts();
            }
        });
    }

    cancel(): void {
        this.dialogRef.close();
    }

    deletePost(id: number) {
        this.postService.deletePost(id);
    }

    openAutocomplete() {
        this.filterOptions = this.newPost.controls.postText.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
        );
        this.autocomplete.openPanel();
    }

    optionSelected(event) {
        this.newPost.setValue({
            postText: this.previousPost.postText, 
            postTextValue: this.previousPost.postTextValue
        });
    }

    optionSelectionChange(option) {
        this.previousPost = {
            postText: this.newPost.controls.postText.value + option.source.value.name,
            postTextValue: this.newPost.controls.postTextValue.value === '' ? 
                this.newPost.controls.postText.value + '%' + option.source.value.id : 
                this.newPost.controls.postTextValue.value + ' ' +this.newPost.controls.postText.value.slice(-1) + '%' + option.source.value.id
        };
    }

    private _filter(value: any): string[] {
        if(value.value)
            return;
        const filterValue = value.toLowerCase();
        return this.autocompleteOptions.filter(option => option.name.toLowerCase().includes(filterValue));
    }
}