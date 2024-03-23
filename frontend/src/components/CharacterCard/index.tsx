import { CharacterInput } from "../../../../backend/src/resolvers/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function CharacterCard({ name, avatarUrl }: Partial<CharacterInput>) {
  return (
    <Avatar>
      <AvatarImage src={avatarUrl} />
      <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
    </Avatar>
  );
}
