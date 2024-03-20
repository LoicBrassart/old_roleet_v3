import { Character } from "../entities/Character";
import { dataSource } from "../datasource";

const charactersData = [
  {
    name: "Mario",
    description: "Plumber from the Mushroom Kingdom.",
    avatarUrl: "https://example.com/mario.png",
  },
  {
    name: "Luigi",
    description: "Mario's brother and sidekick.",
    avatarUrl: "https://example.com/luigi.png",
  },
  {
    name: "Princess Peach",
    description: "Ruler of the Mushroom Kingdom.",
    avatarUrl: "https://example.com/peach.png",
  },
  {
    name: "Bowser",
    description: "Villainous king of the Koopas.",
    avatarUrl: "https://example.com/bowser.png",
  },
  {
    name: "Yoshi",
    description: "Friendly dinosaur companion.",
    avatarUrl: "https://example.com/yoshi.png",
  },
];

async function generateAndSaveFixtures() {
  try {
    await dataSource.initialize();
    const savedCharacters = await Promise.all(
      charactersData.map(async (characterData) => {
        const character = new Character();
        character.name = characterData.name;
        character.description = characterData.description;
        return await character.save();
      })
    );
    console.log("Personnages enregistrés avec succès:", savedCharacters.length);
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des fixtures:", error);
  } finally {
    await dataSource.destroy();
  }
}
generateAndSaveFixtures();
