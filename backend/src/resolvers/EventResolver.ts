import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { type Repository } from "typeorm";
import { EventInput } from "./types";
import { dataSource } from "../datasource";
import { Event } from "../entities/Event";

@Resolver(Event)
export class EventResolver {
  private readonly eventRepository: Repository<Event>;

  constructor() {
    this.eventRepository = dataSource.getRepository(Event);
  }

  @Query((_returns) => Event, { nullable: true })
  event(@Arg("eventId", (_type) => Int) eventId: number) {
    return this.eventRepository.findOneBy({ id: eventId });
  }

  @Query((_returns) => [Event])
  events(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  @Mutation((_returns) => Event)
  addEvent(@Arg("event") eventInput: EventInput): Promise<Event> {
    const event = this.eventRepository.create({
      ...eventInput,
    });
    return this.eventRepository.save(event);
  }
}
