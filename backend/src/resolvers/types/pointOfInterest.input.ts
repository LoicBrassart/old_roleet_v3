import { Field, InputType } from "type-graphql";
import { PointOfInterest } from "../../entities/PointOfInterest";
import { Map } from "../../entities/Map";
import { MapInput } from ".";

@InputType()
export class PointOfInterestInput implements Partial<PointOfInterest> {
  @Field({ nullable: true })
  title?: string;

  @Field()
  code!: string;

  @Field({ nullable: true })
  description?: string;

  @Field((_type) => MapInput)
  map!: Map;
}
