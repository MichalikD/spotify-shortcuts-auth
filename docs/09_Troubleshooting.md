# Troubleshooting

> **Audience:** End Users / Developers / Advanced Users

---

# Overview

This document covers the most common problems that may occur while installing or using Spotify True Shuffle.

Whenever possible, error messages are designed to stop execution early and identify the failing component.

The troubleshooting process should therefore always begin with the first reported error.

---

> 💡 **Design Note**
>
> Spotify True Shuffle follows a fail-fast philosophy.
>
> Components stop execution immediately after detecting an error to avoid misleading follow-up errors further down the workflow.

---

# Authentication

## Spotify Login does not open

### Symptoms

- Safari does not open
- Login page never appears

### Possible Causes

- Invalid Redirect URI
- Missing Client ID
- Invalid configuration

### Solution

Verify

- `spotify_client_id`
- `spotify_redirect_uri`

inside

```
config.json
```

Also verify that the Redirect URI exactly matches the value configured inside the Spotify Developer Dashboard.

---

## Login succeeds but callback never returns

### Symptoms

Spotify authorizes successfully.

Safari remains open.

Shortcuts never resumes.

### Possible Causes

- Redirect URI mismatch
- GitHub Pages not deployed
- Callback page unavailable

### Solution

Verify

- GitHub Pages is reachable
- Redirect URI matches exactly
- Spotify Developer configuration

---

## Refresh Token fails

### Symptoms

Playback stops.

API returns authentication errors.

### Possible Causes

- Revoked refresh token
- Invalid Client ID
- Deleted tokens.json

### Solution

Run

```
Spotify Login
```

again.

---

# Configuration

## Configuration validation failed

### Symptoms

Spotify Load Config stops.

### Possible Causes

Missing required keys.

Examples

```
config_version

shuffle_mode

cache_playlist_id
```

### Solution

Run

```
Spotify Settings
```

and recreate the missing values.

---

## Playlist library cannot be loaded

### Symptoms

No playlists appear.

### Possible Causes

- Missing playlists.json
- Invalid JSON
- Empty playlist library

### Solution

Open

```
Spotify Settings
```

and add at least one playlist.

---

# Playlist Loader

## Playlist cannot be loaded

### Symptoms

Loader stops.

### Possible Causes

- Playlist deleted
- Playlist unavailable
- Invalid playlist URL
- Network error

### Solution

Verify the playlist URL.

Ensure the playlist is still accessible through Spotify.

---

## Playlist contains fewer tracks than expected

### Symptoms

Engine receives too few tracks.

### Possible Causes

- Spotify API interruption
- Playlist modified during loading

### Solution

Run the shuffle again.

---

# Shuffle Engine

## Engine validation failed

### Symptoms

Engine stops before generating output.

### Possible Causes

- Invalid configuration
- Invalid track structure
- Empty playlist

### Solution

Inspect

- Loader output
- Flatten Track List output
- Configuration

---

## Debug output missing

### Symptoms

```
debug = null
```

### Possible Causes

Debug disabled.

### Solution

Enable

```
Debug
```

inside

```
Spotify Settings
```

---

# Playlist Writer

## Playlist not updated

### Symptoms

Playback starts.

Playlist contents remain unchanged.

### Possible Causes

- API error
- Spotify synchronization delay

### Solution

Verify

- Writer output
- Spotify API response

Wait a few seconds and refresh the playlist inside Spotify.

---

## Only part of the playlist was uploaded

### Symptoms

Cache playlist contains too few tracks.

### Possible Causes

- Upload interrupted
- API error

### Solution

Run the shuffle again.

The writer uploads playlists in multiple chunks.

---

# Playback

## Spotify starts the previous playlist

### Symptoms

Playback briefly starts with tracks from the previously generated cache playlist.

The playlist updates afterwards.

### Explanation

Spotify occasionally delays refreshing the playback context.

This behavior appears to originate from Spotify itself rather than Spotify True Shuffle.

### Status

Known Spotify behavior.

---

## Playback does not start

### Symptoms

The cache playlist is written successfully.

Playback never begins.

### Possible Causes

- No active playback device
- Spotify Connect issue
- Playback restrictions

### Solution

Start playback on any device and run Spotify True Shuffle again.

---

# Spotify API

## API_ERROR returned

### Symptoms

Spotify API Result Check returns

```
API_ERROR
```

### Solution

Read the displayed error message.

Spotify API responses are intentionally forwarded without modification whenever possible.

---

## Rate Limiting

### Symptoms

Requests begin to fail after many API calls.

### Explanation

Spotify applies request limits.

### Solution

Wait a short period before retrying.

---

# Scriptable

## Module cannot be imported

### Symptoms

Scriptable reports

```
No file to import
```

### Possible Causes

- Incorrect filename
- Missing module
- Renamed file

### Solution

Verify every module name exactly matches the documentation.

---

## Engine Shortcut returns no output

### Symptoms

Shuffle Engine finishes immediately.

### Possible Causes

- Scriptable module missing
- Invalid engine input

### Solution

Verify

- Engine input
- Module names
- Validation output

---

# Settings

## Playlist cannot be saved

### Symptoms

Spotify Save Playlists reports an error.

### Possible Causes

Invalid playlist URL.

### Solution

Verify the playlist URL.

Only valid Spotify playlist URLs are accepted.

---

# Updating

## Configuration no longer loads

### Symptoms

Validation fails after updating.

### Possible Causes

Configuration version mismatch.

### Solution

Read the release notes.

Update the configuration if required.

---

# Still having problems?

If the issue persists

collect

- error message
- debug output
- engine version
- configuration version

before creating an issue.

This information significantly reduces troubleshooting time.

---

# Next Step

Continue with

```
docs/10_Known_Issues.md
```

for currently known Spotify limitations and project-specific behavior.
