# Etherium Tamagochi

Virtual pet Tamagochi game built for Etherium blockchain with Web3 UI

## Idea

Pets are the main entity in this game. Each pet has predefined list of stats
such as:

- Type
- Name
- Age
- Level
- Health
- Happiness
- Hunger levels

Logical details:

- Pets can be bred and each child's stats are influenced by its parents'
- Each pet can be owened by at most one user
- Users take care of pets, changing some stats (e.g. hunger, levels)
- Users can trade pets using auction system
- Users can participate in different competitions, results of which are based on
  pet's stats and a bit of randomness (races, battles, talent competitions). For
  winning users get rewards and/or achievements

One of the main goals of this project is to make the game easy to maintain and
extend, thus some planned features include:

- User-defined extensions (for e.g. for competitions)
- Updates from certified developers

### Pets

Pet images are generated using stable diffusion with [DiffusionBee](https://diffusionbee.com/) as frontend client.

Prompt: `cute and playful unusual animal with large expressive eyes,fur,
full-sized with visible body and face, happy, photorealistic, unreal engine,
octane render, (pokemon-like)`
Negative prompt: `scary, opened mouth, teeth, pokemon, cat, dog, wolf`

## References

- [Upgradable contracts](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable).

