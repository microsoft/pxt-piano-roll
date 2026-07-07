namespace pianoRoll {
    //% whenUsed
    export let _noteOnEventHandlers: ((frequency: number, octave: number, note: number, duration: number) => void)[] = [];

    //% whenUsed
    export let _noteOffEventHandlers: ((frequency: number, octave: number, note: number) => void)[] = [];

    //% whenUsed
    export let _restEventHandlers: ((duration: number) => void)[] = [];

    export class Playable extends music.StringArrayPlayable {
        constructor(notes: string, tempo: number) {
            super(notes, tempo);

            this.reader = new MelodyReader(notes, true);
        }
    }

    export class MelodyReader extends music.MelodyStringReader {
        protected lastNote: number = -1;
        protected lastOctave: number = -1;

        constructor(notes: string, resetOctave: boolean) {
            super(notes, resetOctave);
        }

        public readNote(): void {
            super.readNote();

            // this is assuming that readNote is only ever being called by
            // _startMelodyInternal, which is true today but if that ever
            // changes this will need to be refactored
            const beat = Math.idiv(60000, music.tempo()) >> 2;
            const duration = beat * this.currentDuration;
            fireEvents(
                this.lastNote,
                this.lastOctave,
                this.currentNote,
                this.currentOctave,
                duration
            );

            this.lastNote = this.currentNote;
            this.lastOctave = this.currentOctave;
        }
    }

    function fireEvents(
        lastNote: number,
        lastOctave: number,
        currentNote: number,
        currentOctave: number,
        duration: number
    ) {
        // fire events in background in case they pause
        control.runInParallel(() => {
            if (lastNote >= 0) {
                fireNoteOff(lastOctave, lastNote);
            }
        });

        control.runInParallel(() => {
            if (currentNote >= 0) {
                fireNoteOn(currentOctave, currentNote, duration);
            }
            else {
                fireRest(duration);
            }
        });
    }

    function fireNoteOn(octave: number, note: number, duration: number): void {
        for (const handler of _noteOnEventHandlers) {
            handler(music.getFrequencyForNote(octave, note), octave, note - 1, duration);
        }
    }

    function fireNoteOff(octave: number, note: number): void {
        for (const handler of _noteOffEventHandlers) {
            handler(music.getFrequencyForNote(octave, note), octave, note - 1);
        }
    }

    function fireRest(duration: number): void {
        for (const handler of _restEventHandlers) {
            handler(duration);
        }
    }
}