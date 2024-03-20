import { Field, InputType } from "type-graphql";
import { Event } from "../../entities/Event";

@InputType()
export class EventInput implements Partial<Event> {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  timestampStart!: number;

  @Field({ nullable: true })
  timestampEnd?: number;

  @Field()
  location!: string;
}
