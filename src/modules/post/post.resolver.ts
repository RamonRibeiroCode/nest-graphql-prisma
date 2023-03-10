import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { PostService } from './post.service'
import { Post } from './entities/post.entity'
import { CreatePostInput } from './dto/create-post.input'
import { Author } from '../author/entities/author.entity'
import { AuthorService } from '../author/author.service'

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly authorService: AuthorService,
  ) {}

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postService.create(createPostInput)
  }

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postService.findAll()
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.postService.findOne(id)
  }

  @ResolveField(() => Author, { name: 'author' })
  async findAuthorByPost(@Parent() post: Post): Promise<Author> {
    return this.authorService.findOne(post.authorId)
  }
}
