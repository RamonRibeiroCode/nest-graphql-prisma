import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Author {
  @Field(() => ID)
  id: string

  @Field()
  email: string

  @Field({ nullable: true })
  name: string
}
