import { Character } from "../entities/Character";
import { dataSource } from "../datasource";
import { Event } from "../entities/Event";
import { Scenario } from "../entities/Scenario";
import { Map } from "../entities/Map";
import { PointOfInterest } from "../entities/PointOfInterest";

const charactersData = [
  {
    name: "Mario",
    description: "Plumber from the Mushroom Kingdom.",
    avatarUrl:
      "https://i.pinimg.com/originals/7b/3b/f8/7b3bf86b732eba43fddf8b7eacc8a727.jpg",
  },
  {
    name: "Luigi",
    description: "Mario's brother and sidekick.",
    avatarUrl:
      "https://i.pinimg.com/originals/34/c6/35/34c635bf0599b3381e560013fe4614e3.jpg",
  },
  {
    name: "Princess Peach",
    description: "Ruler of the Mushroom Kingdom.",
    avatarUrl:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d5e34c18-c95a-4d77-8b31-5972d1ad8c22/d9k17fl-338466d2-04e5-40da-8669-68f93ad71871.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi9kNWUzNGMxOC1jOTVhLTRkNzctOGIzMS01OTcyZDFhZDhjMjIvZDlrMTdmbC0zMzg0NjZkMi0wNGU1LTQwZGEtODY2OS02OGY5M2FkNzE4NzEucG5nIn1dXX0.Lni4xojmOm7A5MRj8Gc5gzE-O1Jt1BC7OTPpuxn-zdE",
  },
  {
    name: "Bowser",
    description: "Villainous king of the Koopas.",
    avatarUrl:
      "https://img0.etsystatic.com/113/0/13410978/il_fullxfull.1054615784_at3e.jpg",
  },
  {
    name: "Yoshi",
    description: "Friendly dinosaur companion.",
    avatarUrl:
      "https://2.bp.blogspot.com/-8EEC2QyYQOk/TmeonOdrSZI/AAAAAAAAA00/FcIWBaVWGNA/w1200-h630-p-k-no-nu/Yoshi.jpg",
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
    title: "A la chasse aux gobs",
    teaser:
      "Depuis environ deux semaines, plusieurs villageois ont aperçu sur la colline, à l'ouest, des gobelins.",
    fullStory: `En début d'après-midi, Thron, le forgeron qui fait également
      office de chef du village, convoque les personnages.
      Mes enfants, vous êtes les jeunes les plus aguerris du
      village, et certains d'entre vous sont des amis de ma fille
      Lanéa.
      Un commis du vieil Erdrios, le meunier, vient de
      m'apprendre qu'il vient de voir sur la colline un petit
      groupe de gobelins portant une jeune femme qui
      ressemblait beaucoup à ma fille. Or justement Lanéa est
      partie tôt ce matin dans cette direction, et elle n'est pas
      revenue à l'heure du repas. Je ne vous cache pas ma
      préoccupation, et si sa mère l'apprend, elle risque de
      mourir d'inquiétude.
      Alors en toute franchise, je voudrais vous demander un
      énorme service : pourriez-vous aller vérifier si c'est bien
      ma fille que ces monstres ont attrapée et, si vous le
      pensez possible, en profiter pour la délivrer des mains de
      ces créatures ? Si j'y vais moi, ma femme va se douter
      que quelque chose de grave est en train de se passer.
      Le commis du meunier, qui a suivi de loin les gobelins, pourra
      indiquer au groupe où se situe l'entrée de leur antre, à environ
      trois heures de marche à l'ouest, dans les collines, mais il se
      gardera bien, personnellement, de s'approcher trop près.
      De plus, si les personnages posent quelques questions aux
      autres villageois avant de partir, ils apprennent également qu'un
      gobelours, un monstre bien plus grand et bien plus fort qu'un
      gobelin, a également été aperçu du même côté il y a quelques
      jours.`,
    bannerUrl:
      "https://www.reddit.com/media?url=https%3A%2F%2Fexternal-preview.redd.it%2FyA0NUZl9HITCySQzbV0mXCp-LtoIQPC4kLu46kCGTdY.jpg%3Fwidth%3D1080%26crop%3Dsmart%26auto%3Dwebp%26s%3D155f5e4272095bbed722e15f251af831a717b4b2",
    credits: "Honteusement pompé sur www.aidedd.org",
  },
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
const mapsData = [
  {
    title: "L'antre des gobelins",
    description: undefined,
    pictureUrl: "/fixtures/map-antre-gobelins.png",
  },
];
const poisData = [
  {
    title: "L'entrée",
    code: "1",
    description: `Deux gobelins sont censés y monter la garde, mais pour le
    moment… ils somnolent. Ils n'entendront pas si on crochète la
    serrure et seront surpris (donc n'agiront pas durant le premier
    round), de même pour une entrée violente et en force dans la
    pièce.
    Ils portent une armure de cuir et un cimeterre mais ont peu de
    chance d'avoir le temps de prendre leur bouclier (baisser leur CA
    de 2 dans ce cas). L'un possède 12 po, l'autre 16 pc.
    À partir de là, si tout se passe trop facilement pour les joueurs,
    vous pouvez ajouter quelques rencontres dans les couloirs avec
    un groupe de deux ou trois gobelins.`,
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
        character.avatarUrl = characterData.avatarUrl;
        return character.save();
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
        return event.save();
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
        return scenario.save();
      })
    );
    console.log("Scenarios enregistrés avec succès:", savedScenarios.length);

    const savedMaps = await Promise.all(
      mapsData.map(async (mapData) => {
        const map = new Map();
        map.title = mapData.title;
        map.pictureUrl = mapData.pictureUrl;
        map.description = mapData.description;
        return map.save();
      })
    );
    console.log("Maps enregistrées avec succès:", savedMaps.length);

    const savedPoI = await Promise.all(
      poisData.map(async (poiData) => {
        const poi = new PointOfInterest();
        poi.title = poiData.title;
        poi.code = poiData.code;
        poi.description = poiData.description;
        poi.map = savedMaps[0];
        console.log(poi);

        return poi.save();
      })
    );
    console.log("PoI enregistrées avec succès:", savedPoI.length);
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des fixtures:", error);
  } finally {
    await dataSource.destroy();
  }
}
generateAndSaveFixtures();
