// Run once:  node scripts/fetch-assets.mjs     (Node 18+, needs internet)
// Downloads planet textures and a real NASA photo for every machine into ./assets
import fs from "fs";
const J = JSON.parse(fs.readFileSync(new URL("./photos.json", import.meta.url)));
fs.mkdirSync("assets/textures", { recursive: true }); fs.mkdirSync("assets/images", { recursive: true });
const SSS = "https://www.solarsystemscope.com/textures/download/";
const TEX = { "sun.jpg": "2k_sun.jpg", "mercury.jpg": "2k_mercury.jpg", "venus.jpg": "2k_venus_atmosphere.jpg", "earth.jpg": "2k_earth_daymap.jpg", "earth_clouds.jpg": "2k_earth_clouds.jpg", "moon.jpg": "2k_moon.jpg", "mars.jpg": "2k_mars.jpg", "ceres.jpg": "2k_ceres_fictional.jpg", "jupiter.jpg": "2k_jupiter.jpg", "saturn.jpg": "2k_saturn.jpg", "saturn_ring.png": "2k_saturn_ring_alpha.png", "uranus.jpg": "2k_uranus.jpg", "neptune.jpg": "2k_neptune.jpg" };
const get = async (u) => { const r = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" } }); if (!r.ok) throw new Error(r.status + " " + u); return r; };
const slug = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
for (const [f, u] of Object.entries(TEX)) {
  try { fs.writeFileSync("assets/textures/" + f, Buffer.from(await (await get(SSS + u)).arrayBuffer())); console.log("texture ok", f); }
  catch (e) { console.log("texture FAILED", f, "-> download", u, "from solarsystemscope.com/textures and save as assets/textures/" + f); }
}
let credits = "Photos: NASA Image and Video Library (images.nasa.gov). Textures: Solar System Scope, CC BY 4.0.\n";
for (const [name, [q, re]] of Object.entries(J)) {
  try {
    const s = await (await get("https://images-api.nasa.gov/search?media_type=image&q=" + encodeURIComponent(q))).json();
    const it = s.collection.items.find((i) => i.data && new RegExp(re, "i").test(i.data[0].title));
    if (!it) throw new Error("no match");
    const id = it.data[0].nasa_id, a = await (await get("https://images-api.nasa.gov/asset/" + encodeURIComponent(id))).json();
    const hrefs = a.collection.items.map((x) => x.href), pick = hrefs.find((h) => /~large\.jpg$/i.test(h)) || hrefs.find((h) => /~medium\.jpg$/i.test(h)) || hrefs.find((h) => /\.jpg$/i.test(h));
    fs.writeFileSync("assets/images/" + slug(name) + ".jpg", Buffer.from(await (await get(pick.replace("http://", "https://"))).arrayBuffer()));
    credits += `${name}: ${it.data[0].title} (NASA ID ${id})\n`; console.log("photo ok", name, "-", it.data[0].title);
  } catch (e) { console.log("photo FAILED", name, e.message, "-> save your own as assets/images/" + slug(name) + ".jpg"); }
}
fs.writeFileSync("assets/CREDITS.txt", credits);
