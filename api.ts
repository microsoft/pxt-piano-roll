//% color="#E63022"
//% block="Piano Roll"
//% icon="\uf001"
namespace pianoRoll {
    //% whenUsed
    const notes = "C_D_EF_G_A_B";

    /**
     * Creates a melody using the piano roll editor.
     *
     *
     * @param song The melody to play
     * @param tempo The tempo of the melody in beats per minute
     */
    //% blockId=piano_roll_melody
    //% block="piano roll melody $song at tempo $tempo (bpm)"
    //% song.fieldEditor=pianoroll
    //% song.fieldOptions.decompileLiterals=true
    //% song.fieldOptions.taggedTemplate="hex;assets.song"
    //% song.fieldOptions.decompileIndirectFixedInstances="true"
    //% song.fieldOptions.decompileArgumentAsString="true"
    //% song.fieldOptions.showInWidgetDiv="true"
    //% song.fieldOptions.encodeAsMelody="true"
    //% song.fieldOptions.hideHeader="true"
    //% song.fieldOptions.borderColor="#E63022"
    //% song.fieldOptions.minOctave=3
    //% song.fieldOptions.maxOctave=4
    //% tempo.defl=120
    //% toolboxParent=music_playable_play
    //% toolboxParentArgument=toPlay
    //% duplicateShadowOnDrag
    export function melody(song: string, tempo: number): music.Playable {
        return new Playable(song, tempo);
    }

    /**
     * Runs some code whenever a note from a piano roll editor starts playing. The parameters passed
     * to this function are the frequency of the note, the octave, the index of the note in the octave (0-12),
     * and the duration of the note in milliseconds.
     */
    //% blockId=piano_roll_on_note_start
    //% block="on note start $frequency $octave $noteIndex $duration"
    //% draggableParameters="reporter"
    //% weight=100
    //% group="Events"
    export function onNoteStart(handler: (frequency: number, octave: number, noteIndex: number, duration: number) => void): void {
        pianoRoll._noteOnEventHandlers.push(handler);
    }

    /**
     * Runs some code whenever a note from a piano roll editor stops playing. The parameters passed
     * to this function are the frequency of the note, the octave, and the index of the note in the octave (0-12). Note
     * that this even will not fire if the melody is stopped before the note finishes playing, e.g. by playing
     * a different melody or stopping all sounds.
     */
    //% blockId=piano_roll_on_note_end
    //% block="on note end $frequency $octave $noteIndex"
    //% draggableParameters="reporter"
    //% weight=90
    //% group="Events"
    export function onNoteEnd(handler: (frequency: number, octave: number, noteIndex: number) => void): void {
        pianoRoll._noteOffEventHandlers.push(handler);
    }

    /**
     * Runs some code whenever a rest from a piano roll editor is played. The parameter passed
     * to this function is the duration of the rest in milliseconds.
     */
    //% blockId=piano_roll_on_rest
    //% block="on rest $duration"
    //% draggableParameters="reporter"
    //% weight=80
    //% group="Events"
    export function onRest(handler: (duration: number) => void): void {
        pianoRoll._restEventHandlers.push(handler);
    }

    /**
     * Returns the note name for the given note index (0-12). For example, 0 returns "C",
     * 1 returns "C#", 2 returns "D", etc.
     *
     *
     * @param noteIndex The index of the note (0-12)
     */
    //% blockId=piano_roll_note_name
    //% block="note index $noteIndex name"
    //% weight=100
    //% group="Utilities"
    export function noteName(noteIndex: number): string {
        const index = noteIndex % 12;
        let char = notes.charAt(index);
        if (char == "_") {
            return notes.charAt(index - 1) + "#";
        }
        return char;
    }

    /**
     * Returns true if the note for the given note index (0-12) is a sharp or flat note. In other words
     * return trues if the note would be a black key on a piano.
     *
     * @param noteIndex The index of the note (0-12)
     */
    //% blockId=piano_roll_is_sharp
    //% block="note index $noteIndex is sharp"
    //% weight=90
    //% group="Utilities"
    export function isSharp(noteIndex: number): boolean {
        return notes.charAt(noteIndex % 12) == "_";
    }
}