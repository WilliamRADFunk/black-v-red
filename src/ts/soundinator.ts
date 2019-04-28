import { Audio, AudioListener } from 'three';

import { Sound } from "./sound";

/**
 * @class
 * The sound effects and music system.
 */
class Soundinator {
    /**
     * Local reference to the audiolistener made during initialization.
     */
    private audioListener: AudioListener;
    /**
     * Contains the boom sound.
     */
    private click: Sound;
    /**
     * Contains the game over sound.
     */
    private gameOver: Sound;
    /**
     * Tracks whether game is in silent mode or not.
     */
    private isMute: boolean = true;
    /**
     * Constructor for the Soundinator class
     * @hidden
     */
    constructor() {}
    /**
     * Attached the audiolistner when it's ready.
     * @param listener the singular audiolistener created during initialization of the game.
     */
    addListener(listener: AudioListener): void {
        this.audioListener = listener;
    }
    /**
     * Creates game sounds from the preloaded Audio objects.
     * @param sounds list of preloaded Audio objects.
     */
    addSounds(sounds: Audio[]): void {
        this.click = new Sound(sounds[1], 0, 0.8);
        this.gameOver = new Sound(sounds[9], 0, 0.7);
    }
    /**
     * Getter for the isMute variable (mainly for preselecting the appropriate button in menu).
     * @returns the current isMute state. TRUE --> no sound | FALSE --> there is sound
     */
    getMute(): boolean {
        return this.isMute;
    }
    /**
     * Plays the mouse click sound.
     */
    playClick(): void {
        if (this.isMute) { return; }
        this.click.play();
    }
    /**
     * Plays the weapon firing sound.
     */
    playGameOver(): void {
        if (this.isMute) { return; }
        this.gameOver.play();
    }
    /**
     * Pauses all the sound clips where they are.
     */
    pauseSound(): void {
        if (!this.isMute) {
            this.click.pause();
            this.gameOver.pause();
        }
    }
    /**
     * Resumes all the sound clips that were paused.
     */
    resumeSound(): void {
        if (!this.isMute) {
            this.click.resume();
            this.gameOver.resume();
        }
    }
    /**
     * Toggles sound for the entire game.
     * @param mute TRUE --> mute the game | FALSE --> turn sound on
     */
    toggleMute(mute: boolean): void {
        this.isMute = mute;
        if (this.isMute) {
            this.click.stop();
            this.gameOver.stop();
        }
    }
}
export const SoundinatorSingleton = new Soundinator();