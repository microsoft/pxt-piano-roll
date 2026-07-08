# on note end

Runs some code whenever a note from a piano roll editor stops playing. The parameters passed to this function are the frequency of the note, the octave, and the index of the note in the octave (0-12). Note that this even will not fire if the melody is stopped before the note finishes playing, e.g. by playing a different melody or stopping all sounds.

```sig
pianoRoll.onNoteEnd(function(frequency: number, octave: number, noteIndex: number) {

})
```

## Parameters

* **frequency**: The frequency of the note that just ended
* **octave**: The octave of the note that just ended
* **noteIndex**: The index of the note in the octave (0-12)

```package
pxt-piano-roll=github:microsoft/pxt-piano-roll
```
