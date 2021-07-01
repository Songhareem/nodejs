import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import CreatePostDto from "./dtos/create-post.dto";
import UpdatePostDto from "./dtos/update-post.dto";
import { PostsService } from "./posts.service";

@Controller('posts')
@ApiTags('Posts')
export class PostsContoller {
    constructor(
        private readonly postsService: PostsService
    ) {}

    @Get()
    getAllPosts() {
        return this.postsService.getAllPosts();
    }

    @Get(':id')
    getPostById(@Param('id') id: string) {
        return this.postsService.getPostById(Number(id));
    }

    @Post()
    async createPost(@Body() post: CreatePostDto) {
        return this.postsService.createPost(post);
    }

    @Patch(':id')
    async updatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
        return this.postsService.updatePost(Number(id), post);
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string) {
        return this.postsService.deletePost(Number(id));
    }
}