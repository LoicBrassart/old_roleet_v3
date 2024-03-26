import { Field, InputType } from "type-graphql";
import { Map } from "../../entities/Map";
import { PointOfInterest } from "../../entities/PointOfInterest";
import { PointOfInterestInput, ScenarioInput } from ".";
import { Scenario } from "../../entities/Scenario";

@InputType()
export class MapInput implements Partial<Map> {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  pictureUrl!: string;

  @Field((_type) => [PointOfInterestInput])
  pointsOfInterest!: PointOfInterest[];

  @Field((_type) => ScenarioInput)
  scenario!: Scenario;
}
