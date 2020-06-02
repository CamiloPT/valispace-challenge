import { Injectable } from "@angular/core";
import { Post } from './post';
import { User } from '../users/user-list/user-list.component';
import { SharedService } from '../shared/shared.service';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private sharedService: SharedService) {}

    createPost(post: Post) {
        var posts = localStorage.getItem('posts');
        var postsObj = JSON.parse(posts) as Post[];
        if (!posts || postsObj.length===0) {
            post.id = 0;
            localStorage.setItem('posts', JSON.stringify([post]));
        } else {    
            post.id = postsObj[0].id + 1;
            postsObj.unshift(post);
            localStorage.setItem('posts', JSON.stringify(postsObj));
        }
    }

    editPost(newPost: Post) {
        var posts = JSON.parse(localStorage.getItem('posts')) as Post[];
        var previousPost = posts.find(post => post.id === newPost.id);
        var postIndex = posts.indexOf(previousPost);
        posts.splice(postIndex, 1, newPost);
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    deletePost(id: number) {
        var posts = JSON.parse(localStorage.getItem('posts')) as Post[];
        posts = posts.filter(post => post.id !== id);
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    getPosts(): Post[] {
        var posts = JSON.parse(localStorage.getItem('posts'));
        return posts ? posts : [];
    }

    getUsers(): User[] {
        return this.sharedService.getUsers();
    }
}