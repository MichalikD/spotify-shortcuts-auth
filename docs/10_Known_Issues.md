# Known Issues

> **Audience:** End Users / Developers / Advanced Users

---

# Overview

This document describes currently known limitations of Spotify True Shuffle.

Not every unexpected behavior is caused by the project itself.

Some limitations originate from Spotify's Web API or playback behavior and cannot currently be solved reliably.

Known issues are grouped into three categories:

- Spotify Limitations
- Framework Limitations
- Planned Improvements

---

# Spotify Limitations

These issues originate from Spotify itself rather than Spotify True Shuffle.

---

## Playback Context Refresh

### Description

After generating a new shuffle, Spotify may briefly continue using the previously cached playback context.

In rare situations

- the previous cache playlist starts playing briefly
- playback then switches to the newly generated playlist
- or the Spotify client updates only after changing views

### Status

Known Spotify behavior.

### Impact

Low.

The cache playlist itself is written correctly.

Only playback synchronization may be delayed.

### Workaround

If necessary

- switch to another playlist
- return to the cache playlist

or simply restart playback.

Most users should rarely notice this behavior.

---

## Playlist View Refresh

### Description

The Spotify client does not always immediately refresh playlist contents after they have been modified through the Web API.

The API reports the updated playlist correctly while the user interface may still display an older version.

### Status

Spotify client behavior.

### Workaround

Refresh the playlist view or switch to another playlist and back.

---

## Spotify Connect

### Description

Playback behavior may differ depending on the currently active Spotify Connect device.

Spotify controls playback context internally and does not document every synchronization detail.

### Status

Known Spotify limitation.

---

## Rate Limiting

### Description

Spotify applies request limits to the Web API.

Large numbers of requests within a short time may temporarily fail.

### Status

Expected API behavior.

---

## Refresh Token Expiration

Spotify refresh tokens expire after six months.

When a refresh token expires, automatic refresh is no longer possible and the user must run Spotify Login again.

# Framework Limitations

These behaviors are currently part of Spotify True Shuffle by design.

---

## Cache Playlist

Spotify True Shuffle currently relies on a dedicated cache playlist.

Every shuffle completely replaces its contents.

### Reason

This approach provides

- deterministic playback order
- compatibility with Spotify playback
- support for large playlists

Alternative playback methods were evaluated during development but proved less reliable.

---

## One Active Shuffle Mode

Only one shuffle mode can be active at a time.

### Reason

The engine intentionally executes exactly one algorithm per run.

Hybrid algorithms should be implemented as dedicated shuffle modules rather than combining multiple modes dynamically.

---

## Apple Shortcuts Dependency

Spotify True Shuffle requires Apple Shortcuts.

### Reason

The project intentionally builds upon Apple's automation framework.

Cross-platform support is currently outside the project scope.

---

## Scriptable Dependency

The shuffle engine requires Scriptable.

### Reason

Apple Shortcuts alone does not provide the flexibility required for advanced shuffle algorithms and modular JavaScript development.

---

## Spotify Premium

Spotify Premium is required.

### Reason

Spotify restricts playback control through the Web API for free accounts.

This limitation cannot be bypassed.

---

# Design Decisions

The following behaviors are intentional.

---

## Centralized Spotify API

All Spotify communication passes through one shortcut.

### Reason

- centralized authentication
- centralized error handling
- easier maintenance

---

## Central Configuration

Configuration is stored in dedicated JSON files.

### Reason

Avoid duplicated constants.

Improve maintainability.

---

## Modular Engine

Every shuffle algorithm lives inside its own module.

### Reason

Future algorithms should be added without changing existing implementations.

---

## Engine Contracts

Input and output contracts are intentionally strict.

### Reason

Stable interfaces make long-term maintenance significantly easier.

---

# Planned Improvements

The following ideas are under consideration.

Their order and implementation are subject to change.

---

## Additional Shuffle Modes

Potential future modes include

- Genre Shuffle
- Mood Shuffle
- BPM Shuffle
- Energy Shuffle
- Decade Shuffle
- Discovery Shuffle

---

## Shuffle Presets

Support user-defined shuffle profiles.

Example

```
Driving

Workout

Relax

Focus
```

Each preset could combine multiple engine parameters.

---

## Statistics

Possible additions include

- artist distribution
- album distribution
- playlist diversity
- shuffle quality
- duplicate spacing

---

## Benchmark Mode

Compare shuffle algorithms using identical playlists.

Potential metrics include

- execution time
- artist spacing
- album spacing
- distribution quality

---

## Plugin Architecture

The modular engine has been designed with future plugin support in mind.

Long-term goals include allowing new shuffle algorithms to be added with minimal changes to the core engine.

---

## Improved Playback Handling

Playback synchronization will continue to be evaluated as Spotify evolves.

Should Spotify introduce more reliable playback APIs, Spotify True Shuffle may adopt them.

---

# Reporting Issues

Before opening an issue, please verify whether the behavior

- is already documented here,
- is caused by Spotify,
- or is reproducible.

Whenever possible include

- Spotify True Shuffle version
- Engine version
- Configuration version
- Debug output
- Steps to reproduce

This information greatly improves issue analysis.

---

# Next Step

Continue with

```
CHANGELOG.md
```

to review the development history of Spotify True Shuffle.
