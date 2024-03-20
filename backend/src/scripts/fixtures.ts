import { Character } from "../entities/Character";
import { dataSource } from "../datasource";
import { Event } from "../entities/Event";

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
const eventsData = [
  {
    title: "Campaign: The Lost Kingdom",
    description:
      "Embark on a quest to discover the secrets of the ancient lost kingdom.",
    timestampStart: new Date("2024-03-20T18:00:00").getTime(),
    timestampEnd: new Date("2024-03-20T22:00:00").getTime(),
    location: "The Wizard's Tower",
  },
  {
    title: "One-shot Adventure: The Goblin Cave",
    description:
      "Explore a treacherous cave filled with goblins and uncover hidden treasures.",
    timestampStart: new Date("2024-03-22T19:00:00").getTime(),
    timestampEnd: new Date("2024-03-22T23:00:00").getTime(),
    location: "The Forgotten Forest",
  },
  {
    title: "Character Creation Session",
    description:
      "Session dedicated to creating new characters for upcoming adventures.",
    timestampStart: new Date("2024-03-18T14:00:00").getTime(),
    timestampEnd: new Date("2024-03-18T17:00:00").getTime(),
    location: "The Adventurer's Guild",
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

    const savedEvents = await Promise.all(
      eventsData.map(async (eventData) => {
        const event = new Event();
        event.title = eventData.title;
        event.description = eventData.description;
        event.timestampStart = eventData.timestampStart;
        event.timestampEnd = eventData.timestampEnd;
        event.location = eventData.location;
        return await event.save();
      })
    );
    console.log("Evenements enregistrés avec succès:", savedEvents.length);
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des fixtures:", error);
  } finally {
    await dataSource.destroy();
  }
}
generateAndSaveFixtures();
