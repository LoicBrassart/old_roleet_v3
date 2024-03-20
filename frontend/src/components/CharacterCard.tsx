import { CharacterInput } from "../../../backend/src/resolvers/types";

export function CharacterCard({ name, description }: Partial<CharacterInput>) {
  return (
    <li>
      {name} ({description})
    </li>
  );
}
