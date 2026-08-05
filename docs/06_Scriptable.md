# Scriptable Modules

> **Audience:** Developers / Advanced Users

---

# Overview

The Scriptable layer contains the complete shuffle engine.

Unlike Apple Shortcuts, Scriptable has no knowledge of

- Spotify
- Authentication
- Configuration files
- Playlists
- Networking

It only receives validated input and produces validated output.

---

> 💡 **Design Note**
>
> Scriptable is intentionally implemented as a pure computation layer.
> Every module should be deterministic and independent from Spotify itself.
>
> This makes the engine easier to test, debug and extend.

---

# Architecture

```text
                Engine Input

                     │

                     ▼

             Validation Module

                     │

                     ▼

             Shuffle Engine.js

                     │

     ┌───────────────┼───────────────┐

     ▼               ▼               ▼

 Artist.js      Album.js      Balanced.js

                     │

                     ▼

             Output Module

                     │

                     ▼

              Engine Output
```

---

# Module Responsibilities

Every Scriptable module has exactly one responsibility.

No module should implement unrelated functionality.

---

# Spotify Shuffle Engine.js

## Purpose

Main entry point of the Scriptable engine.

---

## Responsibilities

- receive engine input
- validate input
- normalize configuration
- select shuffle mode
- execute algorithm
- generate output

---

## Dependencies

- Validation
- Output
- Common
- Shuffle modules

---

## Notes

This module should contain as little algorithm-specific logic as possible.

Its primary responsibility is orchestration.

---

# Spotify Shuffle Common.js

## Purpose

Shared helper functions.

---

## Responsibilities

Examples include

- artist normalization
- album normalization
- utility helpers
- shared scoring helpers

---

## Notes

Whenever helper logic is required by more than one shuffle module it should be moved here.

---

> 💡 **Design Note**
>
> Duplicated helper functions should never exist across shuffle modules.

---

# Spotify Shuffle Validation.js

## Purpose

Validate engine input and output.

---

## Responsibilities

- validate engine contract
- validate configuration
- validate track objects
- validate output contract

---

## Notes

Every engine execution should pass through this module.

Validation should fail as early as possible.

---

# Spotify Shuffle Output.js

## Purpose

Generate standardized engine output.

---

## Responsibilities

- create output contract
- generate chunks
- attach debug information
- version output

---

## Notes

No shuffle module should construct output manually.

---

> 💡 **Design Note**
>
> Centralizing output generation guarantees that every shuffle mode returns the same contract.

---

# Shuffle Modules

Every shuffle algorithm lives inside its own independent module.

Each module receives

```json
{
    "tracks": [],
    "config": {}
}
```

and returns

```
Track Array
```

Nothing else.

The module does not know

- Spotify
- Apple Shortcuts
- Engine Output
- Chunking

---

## Artist.js

Purpose

Distribute tracks from the same artist.

Uses artist-based scoring and scheduling.

---

## Album.js

Purpose

Distribute tracks from the same album.

Uses album-based scoring and scheduling.

---

## Balanced.js

Purpose

Combine Artist and Album scoring.

Uses weighted scoring to produce a balanced playback order.

---

## Future Shuffle Modules

The architecture intentionally supports new modules.

Examples

```
Genre.js

Mood.js

Energy.js

Year.js

BPM.js

Decade.js

Favorites.js

Discovery.js
```

No existing module should require structural changes when a new shuffle mode is added.

Only

- new module
- Engine registration
- Settings entry
- Documentation

should be required.

---

> 💡 **Design Note**
>
> The project is intentionally moving toward a plugin-like architecture.
>
> Every shuffle algorithm should eventually become an independent module.

---

# Module Lifecycle

Adding a new shuffle algorithm follows the same workflow every time.

```text
Create Module

        │

        ▼

Register in Engine

        │

        ▼

Add Configuration

        │

        ▼

Expose in Settings

        │

        ▼

Update Documentation
```

No additional architectural work should be necessary.

---

# Data Ownership

Every module owns only its own responsibility.

| Module | Owns |
|----------|------|
| Engine | Workflow |
| Validation | Contracts |
| Output | Output Format |
| Common | Shared Helpers |
| Shuffle Modules | Shuffle Algorithm |

Modules should never manipulate responsibilities owned by another module.

---

# Engine Contracts

The Scriptable layer depends on two contracts.

## Input Contract

Guaranteed by Apple Shortcuts.

```json
{
    "config": {},
    "tracks": []
}
```

---

## Output Contract

Guaranteed by Output.js.

```json
{
    "engine_version": 5,
    "mode": "...",
    "count": 0,
    "chunk_count": 0,
    "tracks": [],
    "debug": null
}
```

Future engine versions may extend this contract.

Existing fields should remain backwards compatible whenever possible.

---

# Folder Structure

Example

```text
scriptable/

Spotify Shuffle Engine.js

Spotify Shuffle Common.js

Spotify Shuffle Validation.js

Spotify Shuffle Output.js

Spotify Shuffle Artist.js

Spotify Shuffle Album.js

Spotify Shuffle Balanced.js

Flatten Track List.js
```

As additional shuffle modes are added, new modules should simply appear alongside the existing ones.

---

# Best Practices

✔ One responsibility per module.

✔ Keep helper functions inside Common.

✔ Keep algorithms independent.

✔ Never duplicate normalization logic.

✔ Never access Spotify directly.

✔ Always validate inputs.

✔ Always generate output through Output.js.

✔ Keep modules deterministic.

---

# Long-Term Vision

The Scriptable layer should evolve into a modular shuffle framework.

Future development should focus on

- additional shuffle modules
- improved scoring algorithms
- optional plugin modules
- performance improvements

without changing the surrounding Apple Shortcut workflow.

---

# Next Step

Continue with

```
docs/07_Shuffle_Engine.md
```

to understand the internal architecture of the shuffle engine and every supported shuffle mode.
