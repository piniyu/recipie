import { Field, InputType } from "@nestjs/graphql";
// import { UserInput } from "src/graphql.schema";
// import { GQLUser } from "../users.service";

@InputType()
export class UserInput {
    @Field()
    email: string;

    @Field({ nullable: true })
    name?: string;

    @Field()
    password: string;
}

