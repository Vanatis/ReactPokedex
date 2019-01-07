export function FixPokemonNameForImages(pokemon) {
  switch (pokemon) {
    case "nidoran-f":
      return "nidoranf";
    case "nidoran-m":
      return "nidoranm";
    case "deoxys-normal":
      return "deoxys";
    case "wormadam-plant":
      return "wormadam";
    case "giratina-altered":
      return "giratina";
    case "shaymin-land":
      return "shaymin";
    case "basculin-red-striped":
      return "basculin";
    case "darmanitan-standard":
      return "darmanitan";
    case "tornadus-incarnate":
      return "tornadus";
    case "thundurus-incarnate":
      return "thundurus";
    case "landorus-incarnate":
      return "landorus";
    case "keldeo-ordinary":
      return "keldeo";
    case "meloetta-aria":
      return "meloetta";
    case "meowstic-male":
      return "meowstic";
    case "aegislash-shield":
      return "aegislash";
    case "pumpkaboo-average":
      return "pumpkaboo";
    case "gourgeist-average":
      return "gourgeist";
    default:
      return pokemon;
  }
}

export function FixPokemonNameForAPI(pokemon) {
  switch (pokemon) {
    case "deoxys-normal":
      return "deoxys";
    case "wormadam-plant":
      return "wormadam";
    case "giratina-altered":
      return "giratina";
    case "shaymin-land":
      return "shaymin";

    case "basculin-red-striped":
      return "basculin";
    case "darmanitan-standard":
      return "darmanitan";
    case "tornadus-incarnate":
      return "tornadus";
    case "thundurus-incarnate":
      return "thundurus";
    case "landorus-incarnate":
      return "landorus";
    case "keldeo-ordinary":
      return "keldeo";
    case "meloetta-aria":
      return "meloetta";
    case "meowstic-male":
      return "meowstic";
    case "aegislash-shield":
      return "aegislash";
    case "pumpkaboo-average":
      return "pumpkaboo";
    case "gourgeist-average":
      return "gourgeist";
    default:
      return pokemon;
  }
}
