import { Color, Scene } from 'three';

import { CollisionatorSingleton } from './collisionator';
import { ScoreHandler } from './score-handler';
import { Projectile } from './projectile';
/**
 * @class
 * Makes, Moves, and Scores the missiles and their resulting destruction.
 */
export class EnemyMissileGenerator {
    /**
     * Keeps track of level's current color
     */
    private currentColor: Color;
    /**
     * Current level player is on, effects max missiles and points per missile destroyed.
     */
    private currentLevel: number = 1;
    /**
     * Maximum number of missiles that can exist at one time.
     */
    private maxMissiles: number = 20;
    /**
     * Points multiplier per enemy missile destroyed.
     */
    private missilePoints: number = 30;
    /**
     * Keeps track of live missiles, to pass along endCycle signals, and destroy calls.
     */
    private missiles: Projectile[] = [];
    /**
     * Reference to the scene, used to remove projectile from rendering cycle once destroyed.
     */
    private scene: Scene;
    /**
     * Reference to the scorekeeper for adding points on enemy missile destruction.
     */
    private scoreboard: ScoreHandler;
    /**
     * Constructor for the EnemyMissileGenerator class
     * @param scene      graphic rendering scene object. Used each iteration to redraw things contained in scene.
     * @param scoreboard reference to the scorekeeper for adding points on enemy missile destruction.
     * @param color level color, grabbed from the LevelHandler.
     * @hidden
     */
    constructor(scene: Scene, scoreboard: ScoreHandler, color: Color) {
        this.scene = scene;
        this.scoreboard = scoreboard;
        this.currentColor = color;
    }
    /**
     * At the end of each loop iteration, iterate endCycle through all missiless.
     * @param isGameActive flag to let generator know if game is not lost. If it is, don't continue accruing points.
     * @param color level color, grabbed from the LevelHandler.
     * @param color level number, grabbed from the LevelHandler.
     */
    endCycle(isGameActive: boolean, color: Color, level: number): void {
        if (color !== this.currentColor) {
            this.currentColor = color;
        }
        if (level !== this.currentLevel) {
            this.currentLevel = level;
        }
        // Keep them missiles coming.
        for (let i = this.missiles.length; i < this.maxMissiles; i++) {
            this.makeMissile();
        }
        let tempMissiles = [];
        for (let i = 0; i < this.missiles.length; i++) {
            let missile = this.missiles[i];
            if (missile && !missile.endCycle()) {
                CollisionatorSingleton.remove(this.missiles[i]);
                this.missiles[i] = null;
                if (isGameActive) {
                    this.scoreboard.addPoints(this.currentLevel * this.missilePoints);
                }
            }
            missile = this.missiles[i];
            if (missile) {
                tempMissiles.push(missile);
            }
        }
        this.missiles = tempMissiles.slice();
        tempMissiles = null;
    }
    /**
     * Missiles generation in one place to avoid breaking DRY.
     */
    private makeMissile(): void {
        const altRand = Math.random();
        const isXNegative = Math.random() < 0.5 ? -1 : 1;
        const isZNegative = Math.random() < 0.5 ? -1 : 1;
        let x, z;
        if (altRand > 0.15) {
            x = isXNegative * ((Math.random() * 12) + 8);
            z = isZNegative * ((Math.random() * 12) + 8);
        } else if (altRand > 0.075) {
            x = 1 * isXNegative;
            z = isZNegative * ((Math.random() * 12) + 8);
        } else {
            x = isXNegative * ((Math.random() * 12) + 8);
            z = 1 * isZNegative;
        }
        // d = sqrt{ (x2-x1)^2 + (y2-y1)^2 }
        const distance = Math.sqrt((x * x) + (z * z));
        // Once created, missile will fly itself, detonate itself, and rease itself. colorArray[this.currentLevel-1]
        this.missiles.push(new Projectile(
            this.scene,
            x,
            z,
            0,
            0,
            distance,
            this.currentColor || new Color(0xFF0000),
            true,
            (0.008 * this.currentLevel)));
        CollisionatorSingleton.add(this.missiles[this.missiles.length - 1]);
    }
}