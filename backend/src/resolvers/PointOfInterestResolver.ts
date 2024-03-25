import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { type Repository } from "typeorm";
import { PointOfInterestInput } from "./types";
import { dataSource } from "../datasource";
import { PointOfInterest } from "../entities/PointOfInterest";

@Resolver(PointOfInterest)
export class PointOfInterestResolver {
  private readonly poiRepository: Repository<PointOfInterest>;

  constructor() {
    this.poiRepository = dataSource.getRepository(PointOfInterest);
  }

  @Query((_returns) => PointOfInterest, { nullable: true })
  poi(@Arg("poiId", (_type) => Int) poiId: number) {
    return this.poiRepository.findOneBy({ id: poiId });
  }

  @Query((_returns) => [PointOfInterest])
  pois(): Promise<PointOfInterest[]> {
    return this.poiRepository.find({ relations: { map: true } });
  }

  @Mutation((_returns) => PointOfInterest)
  addPoI(@Arg("poi") poiInput: PointOfInterestInput): Promise<PointOfInterest> {
    const poi = this.poiRepository.create({
      ...poiInput,
    });
    return this.poiRepository.save(poi);
  }
}
