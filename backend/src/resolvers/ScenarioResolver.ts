import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { type Repository } from "typeorm";
import { ScenarioInput } from "./types";
import { dataSource } from "../datasource";
import { Scenario } from "../entities/Scenario";
import { PointOfInterest } from "../entities/PointOfInterest";
import { Map } from "../entities/Map";

@Resolver(Scenario)
export class ScenarioResolver {
  private readonly scenarioRepository: Repository<Scenario>;
  private readonly mapRepository: Repository<Map>;
  private readonly poiRepository: Repository<PointOfInterest>;

  constructor() {
    this.scenarioRepository = dataSource.getRepository(Scenario);
    this.mapRepository = dataSource.getRepository(Map);
    this.poiRepository = dataSource.getRepository(PointOfInterest);
  }

  @Query((_returns) => Scenario, { nullable: true })
  scenario(@Arg("scenarioId", (_type) => Int) scenarioId: number) {
    return this.scenarioRepository.findOne({
      where: { id: scenarioId },
      relations: { maps: { pointsOfInterest: true } },
    });
  }

  @Query((_returns) => [Scenario])
  scenarios(): Promise<Scenario[]> {
    return this.scenarioRepository.find({
      relations: { maps: { pointsOfInterest: true } },
    });
  }

  @Mutation((_returns) => Scenario)
  async addScenario(
    @Arg("scenario") scenarioInput: ScenarioInput
  ): Promise<Scenario> {
    const scenario = this.scenarioRepository.create({
      ...scenarioInput,
    });
    const savedScenario = await this.scenarioRepository.save(scenario);

    const populatedMaps = await Promise.all(
      scenarioInput.maps.map(async (mapInput) => {
        const map = this.mapRepository.create({
          ...mapInput,
          scenario: savedScenario,
        });

        const savedMap = await this.mapRepository.save(map);

        const populatedPOIs = await Promise.all(
          mapInput.pointsOfInterest.map(async (poiInput) => {
            const poi = this.poiRepository.create({
              ...poiInput,
              map: savedMap,
            });

            return this.poiRepository.save(poi);
          })
        );

        savedMap.pointsOfInterest = populatedPOIs;
        return savedMap;
      })
    );

    savedScenario.maps = populatedMaps;

    return savedScenario;
  }
}
