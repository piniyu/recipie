import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: 'contain access token and refresh token' })
export class Tokens {
    @Field()
    access_token: string;

    @Field()
    refresh_token: string;
};
