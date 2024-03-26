import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { type Repository } from "typeorm";
import { MapInput } from "./types";
import { dataSource } from "../datasource";
import { Map } from "../entities/Map";

@Resolver(Map)
export class MapResolver {
  private readonly mapRepository: Repository<Map>;

  constructor() {
    this.mapRepository = dataSource.getRepository(Map);
  }

  @Query((_returns) => Map, { nullable: true })
  map(@Arg("mapId", (_type) => Int) mapId: number) {
    return this.mapRepository.findOne({ where: { id: mapId } });
  }

  @Query((_returns) => [Map])
  maps(): Promise<Map[]> {
    return this.mapRepository.find({ relations: { scenario: true } });
  }

  @Mutation((_returns) => Map)
  addMap(@Arg("map") mapInput: MapInput): Promise<Map> {
    const map = this.mapRepository.create({
      ...mapInput,
    });
    return this.mapRepository.save(map);
  }
}
