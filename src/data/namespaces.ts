import Namespace from "../classes/Namespace";
import Room from "../classes/Room";

let namespaces: Namespace[] = [];

let warcraftNs = new Namespace(
  0,
  "Warcraft",
  "https://upload.wikimedia.org/wikipedia/commons/e/eb/WoW_icon.svg",
  "/warcraft"
);
let memeNs = new Namespace(
  1,
  "Memes",
  "https://upload.wikimedia.org/wikipedia/commons/8/83/Noto_Emoji_Pie_1f60e.svg",
  "/memes"
);
let polNs = new Namespace(
  2,
  "Politics",
  "https://www.svgrepo.com/show/293777/politics.svg",
  "/politics"
);

warcraftNs.addRoom(new Room(0, "General", false, "Warcraft"));
warcraftNs.addRoom(new Room(1, "Theorycrafting", false, "Warcraft"));
warcraftNs.addRoom(new Room(2, "News", false, "Warcraft"));

memeNs.addRoom(new Room(0, "General", false, "Memes"));
memeNs.addRoom(new Room(1, "Fresh Memes", false, "Memes"));
memeNs.addRoom(new Room(2, "Old", false, "Memes"));
memeNs.addRoom(new Room(3, "Rehab", false, "Memes"));

polNs.addRoom(new Room(0, "Breaking", false, "Politics"));
polNs.addRoom(new Room(1, "Dems", false, "Politics"));
polNs.addRoom(new Room(2, "GOP", false, "Politics"));

namespaces.push(warcraftNs, memeNs, polNs);

export default namespaces;
