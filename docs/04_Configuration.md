# Configuration

> **Audience:** Developers / Advanced Users

---

# Overview

Spotify True Shuffle is driven by a central configuration system.

All user configurable settings are stored outside of the application logic.

This keeps the engine deterministic while allowing user preferences to be changed without modifying shortcuts or Scriptable modules.

Configuration is accessed exclusively through dedicated shortcuts.

```
Spotify Load Config
Spotify Save Config
```

No other shortcut should directly read or write `config.json`.

---

> 💡 **Design Note**
>
> Configuration is intentionally separated from the implementation.
> This avoids duplicated constants, simplifies maintenance and makes future migration between configuration versions significantly easier.

---

# Configuration Files

Spotify True Shuffle currently maintains three persistent files.

| File | Purpose |
|------|---------|
| `config.json` | Global application configuration |
| `playlists.json` | User defined playlist library |
| `tokens.json` | Spotify authentication tokens |

Temporary authentication data is stored in

```
verifier.txt
```

which is recreated whenever a new login starts.

---

# config.json

The configuration file stores global application settings.

Example

```json
{
    "config_version": 2,
    "spotify_client_id": "...",
    "spotify_redirect_uri": "...",
    "shuffle_mode": "balanced",
    "cache_playlist_id": "...",
    "debug": false,
    "debug_limit": 10
}
```

---

# Configuration Fields

## config_version

Type

```
Number
```

Purpose

Configuration format version.

The loader validates this value before returning the configuration.

Future versions may migrate older configurations automatically.

---

## spotify_client_id

Type

```
String
```

Purpose

Spotify Developer Client ID.

Used by

- Spotify Login
- Spotify Login Callback
- Spotify Refresh Token

---

## spotify_redirect_uri

Type

```
String
```

Purpose

GitHub Pages callback URL used during PKCE authentication.

Must exactly match the Redirect URI configured inside the Spotify Developer Dashboard.

---

## shuffle_mode

Type

```
String
```

Allowed values

```
random
artist
album
balanced
```

Purpose

Defines the default shuffle algorithm executed by the engine.

Changing this value does not require any changes inside Scriptable.

---

## cache_playlist_id

Type

```
String
```

Purpose

Spotify playlist used as playback cache.

Every generated shuffle completely replaces the contents of this playlist before playback starts.

The cache playlist should never be used as a normal playlist.

---

## debug

Type

```
Boolean
```

Purpose

Enables engine debug output.

When disabled the engine returns

```json
"debug": null
```

instead of detailed scoring information.

---

## debug_limit

Type

```
Number
```

Purpose

Limits the number of debug entries returned by the engine.

Useful when debugging very large playlists.

---

# playlists.json

User playlists are stored independently from the main configuration.

Example

```json
{
    "Best Of": "https://open.spotify.com/playlist/...",
    "Rock": "https://open.spotify.com/playlist/...",
    "Chill": "https://open.spotify.com/playlist/..."
}
```

Separating playlists from the global configuration keeps both files focused on a single responsibility.

---

> 💡 **Design Note**
>
> Playlists are considered user data rather than configuration.
> Keeping them in a dedicated file allows future extensions such as playlist categories, favorites or metadata without affecting the configuration format.

---

# tokens.json

Authentication tokens are managed automatically.

The file contains

- access token
- refresh token
- expiration information

Users normally never need to edit this file manually.

---

# Access Layer

Configuration is never accessed directly.

Instead every shortcut uses

```
Spotify Load Config
```

or

```
Spotify Save Config
```

The same applies to

```
Spotify Load Playlists
Spotify Save Playlists
```

This guarantees

- validation
- centralized error handling
- future compatibility

---

# Validation

The configuration loader validates required fields before returning the configuration.

Current validation includes

- configuration version
- shuffle mode
- cache playlist ID

Additional validation may be introduced in future releases.

---

# Adding New Configuration Values

Adding a new configuration value follows a defined workflow.

1.

Add the key to

```
config.json
```

2.

Extend

```
Spotify Load Config
```

validation if required.

3.

Update

```
Spotify Settings
```

to expose the new option.

4.

Update this documentation.

---

> 💡 **Design Note**
>
> Every configuration key should have exactly one owner.
>
> If a value is intended to be user configurable, it belongs inside `config.json`.
> Otherwise it should remain part of the implementation.

---

# Best Practices

✔ Store user configurable values inside the configuration.

✔ Keep implementation details inside the code.

✔ Access configuration only through the dedicated Load/Save shortcuts.

✔ Keep configuration backwards compatible whenever possible.

---

# Future Extensions

Potential future configuration values include

- additional debug settings
- shuffle presets
- playback preferences
- statistics options
- experimental engine features

The configuration system is intentionally designed to grow without requiring architectural changes.

---

# Next Step

Continue with

```
docs/05_Shortcuts.md
```

to learn how every Apple Shortcut works and how the workflow is organized.
