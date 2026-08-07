────────────────────────────────────────────

Spotify True Shuffle

A modular shuffle framework for Spotify
built with Apple Shortcuts and Scriptable

────────────────────────────────────────────

# Spotify True Shuffle

> A modular Spotify shuffle framework built with Apple Shortcuts and Scriptable.

Spotify True Shuffle replaces Spotify's built-in shuffle with a fully customizable shuffle engine.

Instead of relying on Spotify's playback algorithm, playlists are analyzed, reordered using configurable shuffle strategies and written to a dedicated cache playlist before playback starts.

The project is designed around a modular architecture, making it easy to extend with additional shuffle algorithms while keeping Apple Shortcuts and Scriptable cleanly separated.

---

![Architecture](docs/images/architecture.png)

*Placeholder – Overall project architecture*

---

# Features

- Completely replaces Spotify's default shuffle
- Multiple shuffle algorithms
  - Random
  - Artist Shuffle
  - Album Shuffle
  - Balanced Shuffle
- Modular Scriptable engine
- Modular Apple Shortcuts workflow
- Configuration system
- Playlist management
- Automatic Spotify authentication using PKCE
- Automatic access token refresh
- Built-in debugging
- Centralized Spotify API module
- Designed for future expansion

---

# Why?

Spotify's built-in shuffle often groups tracks from the same artist or album together.

Spotify True Shuffle allows complete control over the playback order.

Examples include:

- separating songs from the same artist
- separating songs from the same album
- balancing artist and album distribution simultaneously
- implementing completely new shuffle strategies

The shuffle engine is entirely independent from Spotify's own algorithm.

---

# Project Overview

The project consists of two parts.

## Apple Shortcuts

Responsible for

- user interaction
- Spotify authentication
- API communication
- playlist loading
- playlist writing
- configuration management

## Scriptable

Responsible for

- shuffle algorithms
- validation
- output generation
- debugging
- engine logic

Keeping both responsibilities separated makes the project easier to maintain and extend.

---

# Current Shuffle Modes

| Mode | Description |
|-------|-------------|
| Random | Fisher-Yates shuffle |
| Artist | Distributes songs from the same artist |
| Album | Distributes songs from the same album |
| Balanced | Combines artist and album distribution using weighted scoring |

More modes can easily be added thanks to the modular engine architecture.

---

# Architecture

```text
Spotify Playlist

        │

        ▼

Playlist Loader

        │

        ▼

Flatten Track List

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

A detailed explanation can be found in:

```
docs/02_Architecture.md
```

---

# Project Structure

```
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

The complete project structure is documented in

```
docs/03_Project_Structure.md
```

---

# Configuration

The entire project is driven by a central configuration file.

Examples:

- Spotify Client ID
- Redirect URI
- Cache Playlist
- Shuffle Mode
- Debug Settings
- Shuffle Parameters

See

```
docs/04_Configuration.md
```

---

# Documentation

## Installation

```
docs/01_Installation.md
```

---

## Architecture

```
docs/02_Architecture.md
```

---

## Project Structure

```
docs/03_Project_Structure.md
```

---

## Configuration

```
docs/04_Configuration.md
```

---

## Apple Shortcuts

```
docs/05_Shortcuts.md
```

---

## Scriptable Modules

```
docs/06_Scriptable.md
```

---

## Shuffle Engine

```
docs/07_Shuffle_Engine.md
```

---

## Development

```
docs/08_Development.md
```

---

## Troubleshooting

```
docs/09_Troubleshooting.md
```

---

## Known Issues

```
docs/10_Known_Issues.md
```

---

# Screenshots

## Settings

> Placeholder

---

## Shuffle Menu

> Placeholder

---

## Debug Output

> Placeholder

---

## Engine Architecture

> Placeholder

---

# Requirements

- iPhone / iPad
- Apple Shortcuts
- Scriptable
- Spotify Premium
- Spotify Developer Account
- GitHub Pages

---

# Roadmap

Current goals include

- additional shuffle modes
- improved playback handling
- enhanced playlist management
- configurable shuffle presets
- statistics
- performance improvements

---

# Contributing

Contributions are welcome.

Please read

```
CONTRIBUTING.md
```

before opening an issue or pull request.

---

# License

This project is released under the MIT License.

See

```
LICENSE
```

---

# Acknowledgements

This project was built using

- Apple Shortcuts
- Scriptable
- Spotify Web API

Special thanks to OpenAI for assisting throughout the design, architecture and implementation of the project.
