import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { type Repository } from "typeorm";
import { CharacterInput } from "./types";
import { dataSource } from "../datasource";
import { Character } from "../entities/Character";

@Resolver(Character)
export class CharacterResolver {
  private readonly characterRepository: Repository<Character>;

  constructor() {
    this.characterRepository = dataSource.getRepository(Character);
  }

  @Query((_returns) => Character, { nullable: true })
  character(@Arg("characterId", (_type) => Int) characterId: number) {
    return this.characterRepository.findOneBy({ id: characterId });
  }

  @Query((_returns) => [Character])
  characters(): Promise<Character[]> {
    return this.characterRepository.find();
  }

  @Mutation((_returns) => Character)
  addCharacter(
    @Arg("character") characterInput: CharacterInput
  ): Promise<Character> {
    const character = this.characterRepository.create({
      ...characterInput,
    });
    return this.characterRepository.save(character);
  }
}
