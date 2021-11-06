import { useRoute } from "wouter";

export default function CharacterDetail(): JSX.Element {
  const [match, params] = useRoute("/character/:characterId");
  let characterId = params?.characterId || "";
  // TODO get character from API
  return <>{characterId}</>;
}
