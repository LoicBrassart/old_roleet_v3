import { Field, InputType } from "type-graphql";
import { Scenario } from "../../entities/Scenario";

@InputType()
export class ScenarioInput implements Partial<Scenario> {
  @Field()
  title!: string;

  @Field()
  teaser!: string;

  @Field()
  fullStory!: string;

  @Field({ nullable: true })
  bannerUrl?: string;

  @Field()
  credits!: string;
}
