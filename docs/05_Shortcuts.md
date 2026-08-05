# Apple Shortcuts

> **Audience:** Developers / Advanced Users

---

# Overview

Spotify True Shuffle consists of multiple independent Apple Shortcuts.

Every shortcut has exactly one responsibility.

Instead of creating one large workflow, the project is divided into reusable modules.

This improves

- maintainability
- readability
- debugging
- testing
- extensibility

---

> 💡 **Design Note**
>
> Apple Shortcuts are intentionally treated as software modules rather than automation snippets.
> Every shortcut behaves like an individual component with clearly defined inputs, outputs and responsibilities.

---

# Shortcut Overview

| Shortcut | Responsibility |
|-----------|----------------|
| Spotify True Shuffle | Main workflow |
| Spotify Shuffle Engine | Bridge to Scriptable |
| Spotify Playlist Loader | Downloads playlists |
| Spotify Playlist Writer | Uploads generated playlists |
| Spotify API | Central Spotify API communication |
| Spotify API Result Check | Unified API validation |
| Spotify Login | Starts PKCE authentication |
| Spotify Login Callback | Stores authentication tokens |
| Spotify Refresh Token | Refreshes expired access tokens |
| Spotify Settings | Configuration interface |
| Spotify Load Config | Reads config.json |
| Spotify Save Config | Writes config.json |
| Spotify Load Playlists | Reads playlists.json |
| Spotify Save Playlists | Writes playlists.json |

---

# Spotify True Shuffle

## Purpose

Main entry point of the project.

Responsible for executing the complete shuffle workflow.

---

## Responsibilities

- Load configuration
- Load playlist library
- User playlist selection
- Start Playlist Loader
- Build engine input
- Execute Shuffle Engine
- Execute Playlist Writer
- Disable Spotify Shuffle
- Start playback

---

## Input

None

---

## Output

Playback starts.

---

## Dependencies

- Spotify Load Config
- Spotify Load Playlists
- Spotify Playlist Loader
- Spotify Shuffle Engine
- Spotify Playlist Writer
- Spotify API
- Spotify API Result Check

---

## Error Handling

Stops execution whenever one of the underlying modules reports an error.

Playback only starts after the playlist has been successfully written.

---

> 💡 **Design Note**
>
> Spotify True Shuffle intentionally contains almost no business logic.
> It orchestrates the workflow while delegating every specialized task to dedicated modules.

---

# Spotify Shuffle Engine

## Purpose

Bridge between Apple Shortcuts and Scriptable.

---

## Responsibilities

- Receive engine input
- Execute Scriptable
- Return engine output

---

## Input

```json
{
    "config": {},
    "tracks": []
}
```

---

## Output

Engine Contract

See

```
docs/07_Shuffle_Engine.md
```

---

## Dependencies

Scriptable only.

---

> 💡 **Design Note**
>
> Keeping this bridge as a dedicated shortcut allows the Scriptable engine to evolve independently from the Apple Shortcut workflow.

---

# Spotify Playlist Loader

## Purpose

Downloads complete Spotify playlists.

---

## Responsibilities

- Extract Playlist ID
- Load playlist metadata
- Download all playlist pages
- Validate API responses
- Flatten Spotify responses

---

## Input

Playlist URL

---

## Output

Flattened engine track list

---

## Dependencies

- Spotify API
- Spotify API Result Check
- Flatten Track List.js

---

## Error Handling

Stops immediately if any API request fails.

---

> 💡 **Design Note**
>
> The loader never performs shuffle logic.
> Its only responsibility is producing valid engine input.

---

# Spotify Playlist Writer

## Purpose

Uploads generated playback order to the cache playlist.

---

## Responsibilities

- Read cache playlist
- Upload chunk_1
- Append remaining chunks
- Validate every upload

---

## Input

Engine Output

---

## Output

```
PLAYLIST_WRITTEN
```

---

## Dependencies

- Spotify Load Config
- Spotify API
- Spotify API Result Check

---

## Error Handling

Stops immediately if one upload fails.

---

> 💡 **Design Note**
>
> Spotify limits playlist modifications.
> Splitting uploads into chunks keeps the writer independent from playlist size.

---

# Spotify API

## Purpose

Single access point to Spotify Web API.

---

## Responsibilities

- Authentication
- Automatic token refresh
- Execute requests
- Return Spotify responses

---

## Input

```json
{
    "method": "...",
    "endpoint": "...",
    "body": {}
}
```

---

## Output

Original Spotify response

or

API error object

---

## Dependencies

- Spotify Refresh Token

---

## Error Handling

Automatically refreshes expired access tokens.

---

> 💡 **Design Note**
>
> Centralizing Spotify communication avoids duplicated authentication logic throughout the project.

---

# Spotify API Result Check

## Purpose

Normalizes API error handling.

---

## Responsibilities

- Detect API error objects
- Display user friendly errors
- Return

```
API_OK
```

or

```
API_ERROR
```

---

## Input

Spotify API response

---

## Output

```
API_OK
```

```
API_ERROR
```

---

## Dependencies

None.

---

# Spotify Login

## Purpose

Starts PKCE authentication.

---

## Responsibilities

- Open GitHub Pages
- Start Spotify authorization flow

---

## Dependencies

Configuration only.

---

# Spotify Login Callback

## Purpose

Receives authorization callback.

---

## Responsibilities

- Exchange authorization code
- Store tokens
- Calculate expiration

---

## Output

```
LOGIN_SUCCESS
```

---

## Dependencies

Configuration

---

# Spotify Refresh Token

## Purpose

Refresh expired access tokens.

---

## Responsibilities

- Read refresh token
- Request new access token
- Update tokens.json

---

## Output

```
TOKEN_REFRESHED
```

or

```
REFRESH_FAILED
```

---

# Spotify Settings

## Purpose

Central user interface.

---

## Responsibilities

- Configure Spotify
- Configure cache playlist
- Configure shuffle mode
- Configure debugging
- Manage playlist library

---

## Dependencies

Configuration layer.

---

> 💡 **Design Note**
>
> The Settings shortcut is intentionally the only user-facing configuration interface.
> Users never edit JSON files manually.

---

# Spotify Load Config

## Purpose

Load and validate configuration.

---

## Responsibilities

- Read config.json
- Validate required keys
- Return configuration

---

# Spotify Save Config

## Purpose

Persist configuration.

---

## Responsibilities

- Validate input
- Overwrite config.json

---

# Spotify Load Playlists

## Purpose

Load user playlist library.

---

## Responsibilities

- Read playlists.json
- Return playlist dictionary

---

# Spotify Save Playlists

## Purpose

Persist playlist library.

---

## Responsibilities

- Validate playlist URLs
- Overwrite playlists.json

---

# Dependency Diagram

```text
Spotify True Shuffle

│

├───────────────┐

▼               ▼

Playlist Loader   Load Config

│

▼

Shuffle Engine Shortcut

│

▼

Scriptable Engine

│

▼

Playlist Writer

│

▼

Spotify API

│

▼

Spotify
```

---

# Best Practices

✔ One responsibility per shortcut.

✔ Keep shortcuts reusable.

✔ Never duplicate Spotify API logic.

✔ Never access configuration files directly.

✔ Handle errors immediately.

✔ Keep Scriptable independent from Apple Shortcuts.

---

# Next Step

Continue with

```
docs/06_Scriptable.md
```

to understand the JavaScript modules powering the shuffle engine.
