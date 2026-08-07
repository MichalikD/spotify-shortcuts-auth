// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: gray; icon-glyph: magic;
function buildOutput(
  shuffledTrackList,
  selectedMode,
  debugData,
  engineVersion
) {
  const uris =
    shuffledTrackList.map(
      function (track) {
        return track.uri;
      }
    );

  const output = {
    engine_version: engineVersion,
    mode: selectedMode,
    count: shuffledTrackList.length,
    chunk_count: Math.ceil(
      uris.length / 100
    ),
    tracks: shuffledTrackList,
    debug: debugData || null
  };

  let chunkNumber = 1;

  for (
    let start = 0;
    start < uris.length;
    start += 100
  ) {
    output[
      `chunk_${chunkNumber}`
    ] = uris.slice(
      start,
      start + 100
    );

    chunkNumber++;
  }

  return output;
}


module.exports = {
  buildOutput
};