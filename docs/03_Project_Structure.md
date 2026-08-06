# Project Structure

> **Audience:** Developers / Advanced Users

---

# Overview

Spotify True Shuffle is organized into independent modules.

Every component has a clearly defined responsibility.

The project intentionally separates

- Apple Shortcuts
- Scriptable
- Configuration
- Documentation

This keeps the project maintainable while making it easy to extend.

---

# Repository Structure

```text
Spotify True Shuffle
│
├── README.md
├── LICENSE
├── CHANGELOG.md
├── CONTRIBUTING.md
│
├── docs/
│
├── shortcuts/
│
├── scriptable/
│
└── config/
```

---

# Root Directory

The repository root contains project level documentation.

```
README.md
```

Project overview.

---

```
LICENSE
```

Project license.

---

```
CHANGELOG.md
```

Release history.

---

```
CONTRIBUTING.md
```

Development guidelines.

---

# docs/

Contains the complete project documentation.

```
docs/

01_Installation.md
02_Architecture.md
03_Project_Structure.md
04_Configuration.md
05_Shortcuts.md
06_Scriptable.md
07_Shuffle_Engine.md
08_Development.md
09_Troubleshooting.md
10_Known_Issues.md
```

---

# shortcuts/

Contains every Apple Shortcut.

The project logic is intentionally split into multiple shortcuts.

This keeps every workflow focused on a single task.

Current shortcuts include

```
Spotify True Shuffle
```

Main user workflow.

---

```
Spotify Shuffle Engine
```

Bridge between Apple Shortcuts and Scriptable.

---

```
Spotify Playlist Loader
```

Downloads Spotify playlists.

---

```
Spotify Playlist Writer
```

Writes generated playlists back to Spotify.

---

```
Spotify API
```

Central Spotify Web API interface.

---

```
Spotify API Result Check
```

Normalizes API error handling.

---

```
Spotify Refresh Token
```

Refreshes expired access tokens.

---

```
Spotify Login
```

Starts PKCE authentication.

---

```
Spotify Login Callback
```

Stores newly received tokens.

---

```
Spotify Settings
```

Project configuration interface.

---

```
Spotify Load Config
Spotify Save Config
```

Configuration access layer.

---

```
Spotify Load Playlists
Spotify Save Playlists
```

Playlist library access layer.

---

# scriptable/

Contains every JavaScript module.

The Scriptable layer contains all shuffle logic.

Current modules

```
Spotify Shuffle Engine.js
```

Main engine.

---

```
Spotify Shuffle Common.js
```

Shared helper functions.

---

```
Spotify Shuffle Artist.js
```

Artist shuffle implementation.

---

```
Spotify Shuffle Album.js
```

Album shuffle implementation.

---

```
Spotify Shuffle Balanced.js
```

Balanced shuffle implementation.

---

```
Spotify Shuffle Validation.js
```

Input and output validation.

---

```
Spotify Shuffle Output.js
```

Output generation.

---

```
Flatten Track List.js
```

Transforms Spotify playlist responses into the internal engine format.

---

# config/

Contains all persistent project data.

```
config.json
```

Global project configuration.

---

```
playlists.json
```

Stored playlist library.

---

```
tokens.json
```

Spotify authentication tokens.

---

```
verifier.txt
```

Temporary PKCE verifier used during authentication.

---

# Layer Responsibilities

| Layer | Responsibility |
|--------|----------------|
| Documentation | Project documentation |
| Configuration | Persistent user configuration |
| Apple Shortcuts | User interaction and Spotify communication |
| Scriptable | Shuffle engine |
| Spotify API | Playback and playlist management |

---

# Dependency Flow

Dependencies always point downwards.

```text
Spotify True Shuffle

↓

Playlist Loader

↓

Shuffle Engine Shortcut

↓

Scriptable Engine

↓

Playlist Writer

↓

Spotify API
```

Lower layers never depend on higher layers.

This keeps the architecture modular and avoids circular dependencies.

---

# Design Principles

Spotify True Shuffle follows several design principles.

## Single Responsibility

Every shortcut and every Scriptable module has exactly one responsibility.

Examples

- Playlist Loader only downloads playlists.
- Playlist Writer only uploads playlists.
- Spotify API only communicates with Spotify.
- Shuffle Engine only generates playback order.

---

## Modularity

Components should be reusable.

Examples

The Spotify API shortcut is shared by

- Playlist Loader
- Playlist Writer
- Test Player
- Future shortcuts

---

## Separation of Concerns

Shuffle logic never exists inside Apple Shortcuts.

Spotify communication never exists inside Scriptable.

---

## Configuration Driven

Behavior is controlled through

```
config.json
```

instead of hardcoded values whenever appropriate.

---

## Expandability

Adding a new shuffle mode should only require

- one new Scriptable module
- one Engine switch entry
- one Settings entry
- documentation updates

No other architectural changes should be necessary.

---

# Next Step

Continue with

```
docs/04_Configuration.md
```

to learn how Spotify True Shuffle stores and manages its configuration.
