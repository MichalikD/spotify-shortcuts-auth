# Architecture

> **Audience:** Developers / Advanced Users

Spotify True Shuffle is divided into two independent layers.

- Apple Shortcuts
- Scriptable

Apple Shortcuts are responsible for communication with Spotify and user interaction.

Scriptable is responsible for all shuffle logic.

Keeping both layers separated makes the project easier to maintain and allows new shuffle algorithms to be added without changing the surrounding workflow.

---

# High Level Architecture

```text
                 Spotify Playlist

                        │
                        ▼

               Spotify Playlist Loader

                        │
                        ▼

             Flatten Track List (Scriptable)

                        │
                        ▼

            Spotify Shuffle Engine Shortcut

                        │
                        ▼

          Spotify Shuffle Engine (Scriptable)

                        │
                        ▼

              Spotify Playlist Writer

                        │
                        ▼

                 Spotify API Shortcut

                        │
                        ▼

                     Spotify
```

---

# Apple Shortcuts Layer

The Shortcuts layer is responsible for everything related to Spotify itself.

Responsibilities include

- user interaction
- configuration
- authentication
- Spotify Web API
- playlist loading
- playlist writing
- playback control

Apple Shortcuts intentionally contain no shuffle logic.

---

# Scriptable Layer

Scriptable contains the complete shuffle engine.

Responsibilities include

- shuffle algorithms
- validation
- debugging
- output generation
- common helper functions

The engine never communicates directly with Spotify.

Instead it only receives a list of tracks and returns a new order.

---

# Data Flow

## Step 1

The user starts

```
Spotify True Shuffle
```

The shortcut loads

- configuration
- playlist library

The user selects the playlist to shuffle.

---

## Step 2

The selected playlist is passed to

```
Spotify Playlist Loader
```

The loader

- extracts the Playlist ID
- loads every playlist page
- validates API responses
- combines all pages

---

## Step 3

The loader passes all Spotify responses to

```
Flatten Track List
```

This Scriptable module converts Spotify's API response into the internal engine format.

Example

```json
{
    "uri": "...",
    "name": "...",
    "artists": [],
    "album": {}
}
```

The engine never receives raw Spotify responses.

---

## Step 4

The flattened track list together with the configuration is passed to

```
Spotify Shuffle Engine Shortcut
```

The shortcut simply forwards both values to Scriptable.

No shuffle logic exists inside Apple Shortcuts.

---

## Step 5

Scriptable executes the selected shuffle algorithm.

Current modes

- Random
- Artist
- Album
- Balanced

Each algorithm produces the same output contract.

---

## Step 6

The engine output is passed to

```
Spotify Playlist Writer
```

The writer

- reads the cache playlist ID
- replaces playlist contents
- uploads remaining chunks
- validates every API response

---

## Step 7

Playback starts.

Spotify Shuffle is disabled.

The cache playlist becomes the active playback source.

---

# Project Layers

```text
User

│

▼

Apple Shortcuts

│

▼

Spotify API

│

▼

Spotify Servers

▲

│

Scriptable Engine
```

Only Apple Shortcuts communicate with Spotify.

Scriptable remains completely offline.

---

# Engine Contract

The engine always receives

```json
{
    "config": {},
    "tracks": []
}
```

The engine always returns

```json
{
    "engine_version": 5,
    "mode": "...",
    "count": 0,
    "chunk_count": 0,
    "tracks": [],
    "debug": null,
    "chunk_1": []
}
```

Every shuffle mode follows the same contract.

This allows new algorithms to be added without changing the surrounding shortcuts.

---

# Error Handling

Spotify True Shuffle follows a layered error model.

```text
Spotify API

↓

API Result Check

↓

Calling Shortcut

↓

Workflow stops
```

Every layer is responsible for validating the layer directly below it.

Examples

Spotify API

↓

returns API_ERROR

↓

Playlist Writer

↓

stops

↓

Spotify True Shuffle

↓

does not start playback

---

# Configuration

The configuration is only accessed through

```
Spotify Load Config

Spotify Save Config
```

No other shortcut reads or writes

```
config.json
```

directly.

The same principle applies to

```
playlists.json
```

---

# Modularity

Every module has a single responsibility.

Examples

```
Spotify API
```

only communicates with Spotify.

```
Playlist Loader
```

only downloads playlists.

```
Playlist Writer
```

only uploads playlists.

```
Shuffle Engine
```

only generates playback order.

---

# Versioning

The shuffle engine is versioned independently.

The surrounding shortcuts remain stable while new engine versions introduce additional algorithms or improvements.

This allows experimental shuffle modes to be developed without changing the user workflow.

---

# Future Extensions

The architecture intentionally supports additional modules.

Examples

- Mood Shuffle
- Genre Shuffle
- BPM Shuffle
- Decade Shuffle
- Playlist Statistics

No architectural changes should be required to integrate future shuffle modes.

---

# Next Step

Continue with

```
docs/03_Project_Structure.md
```

to learn how the project is organized.
