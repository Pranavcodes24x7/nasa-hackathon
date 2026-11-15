# Abandoned but not Forgotten: first-person, VR-ready Solar System
NASA Space Apps Challenge 2026 | Team: The Rookie | Pranav Kaushik

## Run on localhost
1. (Once, needs internet) `node scripts/fetch-assets.mjs` downloads real planet textures and a real NASA photo for each of the 22 machines into `assets/`.
2. `npm start` (or double-click `start.bat` on Windows) and open http://localhost:3000

Without `assets/`, the site still works: planets use generated textures and each card looks up a photo live from the NASA Image Library.

## Controls
W A S D fly | mouse look | scroll = speed | Shift boost | Space/C up/down | N navigator | click a beacon to warp | Next Object button.
VR: left stick moves, right stick snap-turns and goes up/down, grip boosts, trigger on a beacon warps.

## VR on a headset
WebXR needs HTTPS or localhost. Easiest: deploy to Vercel and open the https link in the headset browser (Meta Quest Browser). The ENTER VR button appears only where WebXR is supported.

## Assets
Real textures: `assets/textures/{sun,mercury,venus,earth,earth_clouds,moon,mars,ceres,jupiter,saturn,uranus,neptune}.jpg` and `saturn_ring.png`.
Real photos: `assets/images/<object>.jpg`, e.g. `viking-1-and-2.jpg`. Files here override the live NASA lookup.
Check each photo; the downloader takes the first matching NASA result.

## Credits
NASA Image and Video Library; Solar System Scope textures (CC BY 4.0); mission facts from NASA NSSDCA and mission pages.
