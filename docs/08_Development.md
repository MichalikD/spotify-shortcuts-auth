# Development Guide

> **Audience:** Developers / Advanced Users

---

# Overview

This document describes the development philosophy behind Spotify True Shuffle.

Rather than documenting only the current implementation, it defines the principles that should guide future development.

The goal is to ensure that Spotify True Shuffle can continue to evolve without losing consistency, maintainability or backwards compatibility.

---

# Development Philosophy

Spotify True Shuffle is designed as a framework.

New functionality should be implemented by extending existing systems instead of modifying them.

Whenever possible, development should follow the Open/Closed Principle:

> Existing components should remain unchanged while new functionality is added through extension.

---

> 💡 **Design Note**
>
> The project intentionally favors modularity over convenience.
>
> A slightly more complex architecture is preferable to duplicated logic spread across multiple modules.

---

# Core Principles

Every contribution should follow these principles.

## Single Responsibility

Each module should have exactly one responsibility.

Examples

✔ Playlist Loader downloads playlists.

✔ Playlist Writer uploads playlists.

✔ Spotify API communicates with Spotify.

✔ Shuffle modules calculate playback order.

---

## Separation of Concerns

Apple Shortcuts and Scriptable intentionally solve different problems.

Apple Shortcuts

- User Interface
- Spotify
- Configuration
- Authentication

Scriptable

- Algorithms
- Validation
- Scoring
- Output

Responsibilities should never overlap.

---

## Configuration Driven

User configurable values belong inside

```
config.json
```

Implementation details belong inside the code.

Never hardcode user settings.

---

## Reusability

If functionality is useful in more than one place it should become its own module.

Avoid copy & paste.

---

## Predictability

The engine should behave consistently.

Changes to shuffle quality should result from deliberate algorithm improvements rather than accidental side effects.

---

# Engine Contracts

Several contracts should be considered stable.

## Input Contract

```json
{
    "config": {},
    "tracks": []
}
```

---

## Output Contract

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

These contracts should only change when absolutely necessary.

---

## Configuration Contract

Required configuration values should remain backwards compatible whenever possible.

If a breaking change is unavoidable

- increase the configuration version
- migrate existing configurations
- update documentation

---

# Adding a Shuffle Mode

Adding a new shuffle mode should follow the same workflow every time.

## Step 1

Create a new Scriptable module.

Example

```
Spotify Shuffle Mood.js
```

---

## Step 2

Implement the shuffle algorithm.

The module should only calculate track order.

---

## Step 3

Register the module inside

```
Spotify Shuffle Engine.js
```

---

## Step 4

Expose the new mode inside

```
Spotify Settings
```

---

## Step 5

Document the new mode.

---

## Step 6

Test all existing shuffle modes.

Adding a new algorithm must never break existing modes.

---

> 💡 **Design Note**
>
> New shuffle modes should integrate into the existing architecture rather than modifying it.

---

# Coding Guidelines

## Keep Functions Small

Large functions should be split into helpers.

---

## Avoid Duplicate Logic

If code appears twice

move it into

```
Common.js
```

---

## Keep Modules Independent

Modules should communicate through well defined interfaces.

Avoid hidden dependencies.

---

## Validate Early

Never assume input is valid.

Validation belongs inside

```
Validation.js
```

---

## Generate Output Centrally

Only

```
Output.js
```

should generate engine output.

---

## Comment Decisions

Comments should explain

why

instead of

what.

Bad

```javascript
// Increase index
index++;
```

Good

```javascript
// Keep at least one candidate available
// even for heavily duplicated artists.
```

---

# Versioning

Spotify True Shuffle uses semantic versioning.

```
MAJOR.MINOR.PATCH
```

Examples

```
1.0.0

1.1.0

1.1.1
```

---

## Major

Breaking architectural changes.

---

## Minor

New functionality.

Examples

- new shuffle modes
- new settings
- new modules

---

## Patch

Bug fixes.

No new functionality.

---

# Testing

Every release should verify

✔ Login

✔ Token Refresh

✔ Playlist Loader

✔ Shuffle Engine

✔ Playlist Writer

✔ Playback

✔ Settings

✔ Configuration

✔ Playlist Library

---

## Shuffle Tests

Every shuffle mode should be tested with

- small playlists
- large playlists
- duplicate artists
- duplicate albums
- mixed artists
- edge cases

---

## Regression Testing

After every feature

verify

- Random
- Artist
- Album
- Balanced

continue to work correctly.

---

# Performance

Shuffle quality always has higher priority than execution speed.

However

avoid unnecessary

- sorting
- recursion
- repeated normalization

whenever possible.

---

# Documentation

Every significant change should update

- README
- Documentation
- Changelog

Documentation is considered part of the project.

---

# Future Development

Potential long-term improvements include

- additional shuffle modes
- configurable presets
- plugin architecture
- statistics
- benchmarking
- performance profiling
- unit testing
- automated regression testing

The architecture intentionally leaves room for these additions.

---

# Contributing

When contributing

please

- keep modules focused
- preserve existing contracts
- update documentation
- test existing functionality

The goal is to improve Spotify True Shuffle without increasing complexity unnecessarily.

---

# Next Step

Continue with

```
docs/09_Troubleshooting.md
```

for common problems and solutions.
