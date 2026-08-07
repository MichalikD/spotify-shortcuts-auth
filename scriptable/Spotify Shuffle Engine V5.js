// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: magic;
/*
Variables used by Scriptable.
These must be at the very top of the file. Do not edit.
icon-color: teal; icon-glyph: magic;
======================================================
Spotify Shuffle Engine v5
Revision 1
Modi: random, artist, album, balanced
======================================================
Spotify Shuffle Engine Contract v1

Alle Engine-Versionen müssen folgenden Output liefern:

{
    engine_version,
    mode,
    count,
    chunk_count,
    tracks,

    chunk_1...
    chunk_n,

    debug
}

Der Playlist Writer darf niemals angepasst werden.
======================================================
*/

// ======================================================
// 1. LOAD MODULES
// ======================================================

const common =
  importModule(
    "Spotify Shuffle Common"
  );

const validation =
  importModule(
    "Spotify Shuffle Validation"
  );

const outputModule =
  importModule(
    "Spotify Shuffle Output"
  );

const artist =
  importModule(
    "Spotify Shuffle Artist"
  );

const album =
  importModule(
    "Spotify Shuffle Album"
  );

const balanced =
  importModule(
    "Spotify Shuffle Balanced"
  );

// ======================================================
// 2. EINGABE
// ======================================================
const rawInput = args.shortcutParameter;

const input =
  common.parseInput(rawInput);

if (
  !input ||
  typeof input !== "object" ||
  Array.isArray(input)
) {
  throw new Error(
    "Shuffle Engine erwartet ein Eingabewörterbuch."
  );
}

const config = input.config || {};
const tracks = input.tracks || [];

/*
 * Keine zusätzliche String-Normalisierung verwenden.
 * Der Einstellungs-SC schreibt bereits gültige Werte:
 * random, artist oder album.
 */
const mode = config.shuffle_mode || "random";


// ======================================================
// 3. VALIDIERUNG
// ======================================================

validation.validateTracks(tracks);

// ======================================================
// 4. ENGINE-AUSWAHL
// ======================================================

let shuffledTracks;
let engineDebug = null;

switch (mode) {
  case "random":
    shuffledTracks =
      common.fisherYates(tracks);
    break;

  case "artist":
    shuffledTracks =
      artist.shuffle(
        tracks,
        config,
        common
      );
    break;

  case "album":
    shuffledTracks =
      album.shuffle(
        tracks,
        config,
        common
      );
    break;

  case "balanced": {
    const balancedResult =
      balanced.shuffle(
        tracks,
        config,
        common,
        artist,
        album
      );

    shuffledTracks =
      balancedResult.tracks;

    engineDebug =
      balancedResult.debug;

    break;
  }

  default:
    throw new Error(
      `Unbekannter Shuffle-Modus: ${mode}`
    );
}

validation.validateShuffledTracks(
  tracks,
  shuffledTracks,
  mode
);


// ======================================================
// 9. AUSGABE UND CHUNKING
// ======================================================

const output =
  outputModule.buildOutput(
    shuffledTracks,
    mode,
    engineDebug,
    5
  );

validation.validateEngineOutput(
  output
);

Script.setShortcutOutput(
  JSON.stringify(output)
);

Script.complete();