import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/models/user.model";
import { Tokens } from "./tokens.model";

@ObjectType({ description: 'contain user info and access token and refresh token' })
export class LoginResult {
    @Field(type => User)
    user: User;

    @Field(type => Tokens)
    tokens: Tokens;
}