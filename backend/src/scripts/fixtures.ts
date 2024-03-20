import { Character } from "../entities/Character";
import { dataSource } from "../datasource";
import { Event } from "../entities/Event";
import { Scenario } from "../entities/Scenario";

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
const scenariosData = [
  {
    title: "The Curse of the Lost Temple",
    teaser:
      "Explore the mysteries of a forgotten temple and lift its ancient curse.",
    fullStory:
      "Long ago, a powerful curse befell the ancient temple, trapping its treasures and condemning all who enter. Brave adventurers are needed to break the curse and claim the temple's riches.",
    bannerUrl: "https://example.com/lost_temple_banner.png",
    credits: "Written by Dungeon Master X",
  },
  {
    title: "The Shadow Over Blackwood Manor",
    teaser:
      "Investigate the eerie occurrences plaguing the haunted Blackwood Manor.",
    fullStory:
      "Blackwood Manor has long been shrouded in mystery and fear. Strange shadows lurk in its halls, and eerie whispers echo through its corridors. A group of intrepid investigators must uncover the truth behind the manor's dark past before it consumes them.",
    bannerUrl: "https://example.com/blackwood_manor_banner.png",
    credits: "Written by Dungeon Master Y",
  },
  {
    title: "The Siege of Dragonspire Keep",
    teaser:
      "Defend the legendary Dragonspire Keep from the onslaught of an ancient dragon.",
    fullStory:
      "Dragonspire Keep, once an impregnable fortress, now faces its greatest threat. A fearsome dragon has laid siege to the keep, threatening to raze it to the ground. Heroes must rally to defend the keep and vanquish the dragon before it's too late.",
    bannerUrl: "https://example.com/dragonspire_keep_banner.png",
    credits: "Written by Dungeon Master Z",
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

    const savedScenarios = await Promise.all(
      scenariosData.map(async (scenarioData) => {
        const scenario = new Scenario();
        scenario.title = scenarioData.title;
        scenario.bannerUrl = scenarioData.bannerUrl;
        scenario.teaser = scenarioData.teaser;
        scenario.credits = scenarioData.credits;
        scenario.fullStory = scenarioData.fullStory;
        return await scenario.save();
      })
    );
    console.log("Scenarios enregistrés avec succès:", savedScenarios.length);
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des fixtures:", error);
  } finally {
    await dataSource.destroy();
  }
}
generateAndSaveFixtures();
