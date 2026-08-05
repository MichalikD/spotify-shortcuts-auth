# Installation

> **Audience:** End Users

This guide describes the complete installation process for Spotify True Shuffle.

By the end of this guide you will have:

- a Spotify Developer application
- a configured GitHub Pages redirect
- all required Apple Shortcuts
- all Scriptable modules
- a valid configuration
- working Spotify authentication
- your first successful shuffle

---

# Prerequisites

Before starting, make sure you have:

- an iPhone or iPad
- the latest version of Apple Shortcuts
- Scriptable installed
- a Spotify Premium subscription
- a GitHub account
- a Spotify Developer account

---

# Required Apps

## Apple Shortcuts

Used for

- user interaction
- configuration
- Spotify API communication
- playlist management

App Store:

> Placeholder

---

## Scriptable

Used for

- shuffle engine
- algorithms
- debugging
- validation

App Store:

> Placeholder

---

# GitHub Pages

Create a new repository.

Example

```
spotify-shortcuts-auth
```

Enable

```
Settings

↓

Pages

↓

Deploy from branch

↓

main

↓

/
```

After deployment your GitHub Pages URL should look similar to

```
https://YOUR_USERNAME.github.io/spotify-shortcuts-auth/
```

---

# Download the Project

Clone or download the repository.

```
git clone ...
```

or

Download ZIP.

---

# Spotify Developer

Open

https://developer.spotify.com/dashboard

Create a new application.

Example

```
Name

Spotify True Shuffle
```

Description

```
Spotify Shuffle Framework
```

---

## Redirect URI

Add the Redirect URI that points to your GitHub Pages installation.

Example

```
https://YOUR_GITHUB_USERNAME.github.io/spotify-shortcuts-auth/
```

The Redirect URI **must exactly match** the value configured inside Spotify True Shuffle.

---

## Client ID

After creating the application copy

```
Client ID
```

This value will later be stored inside

```
config.json
```

The Client Secret is **not** required.

Spotify True Shuffle uses the PKCE authentication flow.

---

# Scriptable

Copy every JavaScript module into Scriptable.

The folder should contain files similar to

```
Spotify Shuffle Engine.js

Spotify Shuffle Artist.js

Spotify Shuffle Album.js

Spotify Shuffle Balanced.js

Spotify Shuffle Common.js

Spotify Shuffle Output.js

Spotify Shuffle Validation.js

Flatten Track List.js
```

> Screenshot Placeholder

---

# Apple Shortcuts

Import every shortcut.

Recommended order

1.

Spotify API

2.

Spotify API Result Check

3.

Spotify Refresh Token

4.

Spotify Login

5.

Spotify Login Callback

6.

Spotify Load Config

7.

Spotify Save Config

8.

Spotify Load Playlists

9.

Spotify Save Playlists

10.

Spotify Playlist Loader

11.

Spotify Playlist Writer

12.

Spotify Settings

13.

Spotify Shuffle Engine

14.

Spotify True Shuffle

---

# Configuration

Run

```
Spotify Settings
```

Configure

- Spotify Client ID
- Redirect URI
- Cache Playlist

If required also configure

- Debug
- Shuffle Mode

---

# Cache Playlist

Create a dedicated Spotify playlist.

Example

```
Spotify True Shuffle Cache
```

Copy its Playlist ID into the configuration.

This playlist is automatically overwritten every time a new shuffle is generated.

It should not be used as a normal playlist.

---

# Authentication

Run

```
Spotify Login
```

Safari opens.

Log in to Spotify.

Grant permissions.

Safari redirects back to Apple Shortcuts.

The callback shortcut stores

```
tokens.json
```

inside Scriptable.

No manual interaction is required afterwards.

---

# First Test

Run

```
Spotify True Shuffle
```

Choose any playlist.

The workflow should

- load the playlist
- generate a shuffle
- write the cache playlist
- start playback

If playback starts successfully the installation is complete.

---

# Updating

When updating Spotify True Shuffle

- replace Scriptable modules
- replace updated shortcuts
- keep

```
config.json

playlists.json

tokens.json
```

No new login is required unless

- the Client ID changes
- the Redirect URI changes

---

# Troubleshooting

Common problems are documented in

```
docs/09_Troubleshooting.md
```

---

# Next Step

Continue with

```
docs/02_Architecture.md
```

to understand how Spotify True Shuffle works internally.
