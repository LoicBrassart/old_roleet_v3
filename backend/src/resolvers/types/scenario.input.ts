import { Field, InputType } from "type-graphql";
import { Scenario } from "../../entities/Scenario";
import { MapInput } from ".";
import { Map } from "../../entities/Map";

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

  @Field((_type) => [MapInput])
  maps!: Map[];
}
