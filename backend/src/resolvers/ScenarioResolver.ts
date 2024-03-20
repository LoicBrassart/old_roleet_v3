import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { type Repository } from "typeorm";
import { ScenarioInput } from "./types";
import { dataSource } from "../datasource";
import { Scenario } from "../entities/Scenario";

@Resolver(Scenario)
export class ScenarioResolver {
  private readonly scenarioRepository: Repository<Scenario>;

  constructor() {
    this.scenarioRepository = dataSource.getRepository(Scenario);
  }

  @Query((_returns) => Scenario, { nullable: true })
  scenario(@Arg("scenarioId", (_type) => Int) scenarioId: number) {
    return this.scenarioRepository.findOneBy({ id: scenarioId });
  }

  @Query((_returns) => [Scenario])
  scenarios(): Promise<Scenario[]> {
    return this.scenarioRepository.find();
  }

  @Mutation((_returns) => Scenario)
  addScenario(
    @Arg("scenario") scenarioInput: ScenarioInput
  ): Promise<Scenario> {
    const scenario = this.scenarioRepository.create({
      ...scenarioInput,
    });
    return this.scenarioRepository.save(scenario);
  }
}
