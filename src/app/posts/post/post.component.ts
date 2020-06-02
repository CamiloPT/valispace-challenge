import { Component, Input, Output, EventEmitter, HostListener, ElementRef, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
    selector:'post',
    templateUrl: 'post.component.html',
    styleUrls: ['post.component.scss']
})
export class PostComponent implements OnInit {
    @Input('post') public post: Post;
    @Output('edit') public edit: EventEmitter<boolean> =  new EventEmitter<boolean>();
    @Output('delete') public delete: EventEmitter<number> =  new EventEmitter<number>();

    public isEditing: boolean;
    public isEditingText: string;

    public wordsInPost: string[]= [];

    constructor(private postService: PostService) {}

    ngOnInit() {
        this.post.postTextValue.split(' ').forEach(word => {
            this.wordsInPost.push(word);
        })
    }
    editPost() {
        this.isEditingText = this.post.postText;
        this.isEditing = true;
        this.edit.emit();
    }

    deletePost() {
        this.delete.emit(this.post.id);
    }

    confirmEdit() {
        this.post.postText = this.isEditingText;
        this.post.postTextValue = this.isEditingText;
        this.postService.editPost(this.post);
        this.isEditing = false;
    }

    dateFormat(date: string) {
        return new Date(date).toLocaleDateString()+ '; ' + new Date(date).toLocaleTimeString() ;
    }

    // @HostListener('document:click', ['$event']) 
    // clickout(){
    //     if(this.isEditing && !this.eRef.nativeElement.contains(event.target)) {
    //         this.isEditing = false;
    //     }
    // }

    getIdInWord(value: string): number {
        if(value.includes('@'))
            return +value.replace('@%','');
        if(value.includes('#'))
            return +value.replace('#%','');;
    }

    getFieldInWord(value: string): string {
        if(value.includes('@'))
            return 'username';
        if(value.includes('#'))
            return 'phone';
    }
}