# on note start

Runs some code whenever a note from a piano roll editor starts playing. The parameters passed to this function are the frequency of the note, the octave, the index of the note in the octave (0-12), and the duration of the note in milliseconds.

```sig
pianoRoll.onNoteStart(function(frequency: number, octave: number, noteIndex: number, duration: number) {

})
```

## Parameters

* **frequency**: The frequency of the note that just started
* **octave**: The octave of the note that just started
* **noteIndex**: The index of the note in the octave (0-12)
* **duration**: The duration of the note in milliseconds

```package
pxt-piano-roll=github:microsoft/pxt-piano-roll
```
