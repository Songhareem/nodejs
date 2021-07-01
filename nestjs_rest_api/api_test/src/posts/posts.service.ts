import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CreatePostDto from "./dtos/create-post.dto";
import UpdatePostDto from "./dtos/update-post.dto";
import { Post } from "./entities/post.entity";
// import { Post } from "./interfaces/post.interface";

@Injectable()
export class PostsService {

    constructor (
        @InjectRepository(Post) private postsRepository: Repository<Post>
    ) {}

    // private lastPostId = 0;
    // private posts: Post[] = [];

    async getAllPosts() {
        // return this.posts;
        return await this.postsRepository.find();
    }

    async getPostById(id: number) {
        // const post = this.posts.find(port => post.id === id);
        const post = this.postsRepository.findOne(id);
        if(post) {
            return post;
        }
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    async updatePost(id: number, post: UpdatePostDto) {
        // const postIndex = this.posts.findIndex(post => post.id === id);
        // if(postIndex > -1) {
        //     this.posts[postIndex] = post;
        //     return post;
        // }
        await this.postsRepository.update(id, post);    // .update => Put이 아니라 Patch
        const updatedPost = await this.postsRepository.findOne(id);
        if(updatedPost) {
            return updatedPost
        }
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    async createPost(post: CreatePostDto) {
        // const newPost = {
        //     id: ++this.lastPostId,
        //     ...post
        // }
        // this.posts.push(newPost);
        const newPost = await this.postsRepository.create(post);
        await this.postsRepository.save(newPost);
        return newPost;
    }

    async deletePost(id: number) {
        // const postIndex = this.posts.findIndex(post => post.id === id);
        // if(postIndex > -1) {
        //     this.posts.splice(postIndex, 1);
        // } else {
        //     throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        // }

        const deleteResponse = await this.postsRepository.delete(id);
        if(!deleteResponse.affected) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
    }
}