import { Field, InputType } from "type-graphql";
import { Character } from "../../entities/Character";

@InputType()
export class CharacterInput implements Partial<Character> {
  @Field()
  name!: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  avatarUrl?: string;
}
