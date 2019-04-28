import {
    CircleGeometry,
    Mesh,
    MeshBasicMaterial,
    Scene } from 'three';

import { Critter } from "../models/critter";
import { Collidable } from "../collidable";
import { CollisionatorSingleton } from '../collisionator';

let index: number = 0;

export class Ant implements Collidable, Critter {
    private aggressive: boolean;
    /**
     * Controls size and shape of the ant
     */
    private antGeometry: CircleGeometry;
    /**
     * Controls the color of the ant material
     */
	private antMaterial: MeshBasicMaterial;
    /**
     * Controls the overall rendering of the ant
     */
    private ant: Mesh;
    private armor: number;
    private armorType: string = 'low';
    /**
     * Keeps track of the x,z point the ant is at currently.
     */
    private currentPoint: number[];
    private damagePerTurn: number = 1;
    private health: number = 10;
    private isAlive: boolean = true;
    /**
     * Keeps track of the x,z point the ant was at previously.
     * Helps with direction.
     */
    private previousPoint: number[];
    /**
     * Reference to the scene, used to remove ant from rendering cycle once destroyed.
     */
    private scene: Scene;
    private speed: number = 0.003;
    private speedModifier: number = 1;

    constructor(scene: Scene, x1:number, z1: number) {
        index++;
        this.scene = scene;
        this.currentPoint = [x1, z1];
        const randDir = Math.random() < 0.5 ? -1 : 1;
        this.previousPoint = [x1, z1 * randDir];

        this.antGeometry = new CircleGeometry(0.03, 32);
        this.antMaterial = new MeshBasicMaterial({ color: 0xFF0000 });
        this.ant = new Mesh(this.antGeometry, this.antMaterial);
        this.ant.position.set(this.currentPoint[0], 0, this.currentPoint[1]);
        this.ant.rotation.set(-1.5708, 0, 0);
        this.ant.name = `Ant-${index}`;

        this.addToScene();
    }
    /**
     * Adds ant object to the three.js scene.
     */
    addToScene(): void {
        this.scene.add(this.ant);
    }
    /**
     * Calculates the next point in the ant's path.
     */
    private calculateNextPoint() {
        const rando = Math.floor(Math.random() * 100);
        // 10% chance ant will not move this cycle.
        if (rando < 10) {
            return;
        }
        
        const prevPoint = this.previousPoint.slice();
        const currPoint = this.currentPoint.slice();
        const newPoint = [];
        // newPoint[0] = (currPoint[0] - prevPoint[0] < currPoint[0]) ?
        //     currPoint[0] + (this.speed * this.speedModifier) :
        //     currPoint[0] - (this.speed * this.speedModifier);
        // newPoint[1] = (currPoint[1] - prevPoint[1] < currPoint[1]) ?
        //     currPoint[1] + (this.speed * this.speedModifier) :
        //     currPoint[1] - (this.speed * this.speedModifier);
        const distanceTraveled = 0.5;
        // (xt, yt) = ( ( (1 − t) * x0 + t * x1 ), ( (1 − t) * y0 + t * y1) )
        const t = distanceTraveled;
        newPoint[0] = (currPoint[0] - (1 * prevPoint[0])) / 1;
        newPoint[1] = (currPoint[1] - (1 * prevPoint[1])) / 1;

        // 40% chance ant will move in same direction along perfect line.
        if (rando < 50) {
            this.confirmMove(newPoint);
            return;
        }

        // 10% chance ant will go back the way it came.
        if (rando < 60) {
            this.confirmMove(prevPoint);
            return;
        }
        
        const center = this.currentPoint.slice();
        const orbitRadius = this.getDistanceToTarget(center.slice(), newPoint.slice());
        let currentTheta = Math.atan2(
            (newPoint[1] - center[1]),
            (newPoint[0] - center[0])) + (this.speed * this.speedModifier);

        // 20% chance ant will go left from same direction
        if (rando < 80) {
            if (currentTheta >= 2 * Math.PI) currentTheta = 0;
        // 20% chance ant will go right from same direction
        } else {
            if (currentTheta >= 2 * -Math.PI) currentTheta = 0;
        }

        this.confirmMove([
            orbitRadius * Math.cos(currentTheta) + center[0],
            orbitRadius * Math.sin(currentTheta) + center[1]
        ]);
    }

    confirmMove(newMove: number[]) {
        if (-5.5 > newMove[0] || newMove[0] > 5.5) {
            return;
        }
        if (-5.5 > newMove[1] || newMove[1] > 5.5) {
            return;
        }
        this.previousPoint = this.currentPoint.slice();
        this.currentPoint = newMove.slice();
    }

    /**
     * At the end of each loop iteration, move the ant a little.
     * @returns whether or not the ant is done, and its points calculated.
     */
    endCycle(): boolean {
        if (this.isAlive) {
            this.calculateNextPoint();
            this.ant.position.set(this.currentPoint[0], 0, this.currentPoint[1]);
        }
        return true;
    }

    getActive(): boolean {
        return this.isAlive;
    }

    getArmorValue(): number {
        return this.armor;
    }

    getArmorType(): string {
        return this.armorType;
    }
    /**
     * Gets the current radius of the bounding box (circle) of the collidable.
     * @returns number to represent pixel distance from object center to edge of bounding box.
     */
    getCollisionRadius(): number {
        return 0.04;
    }

    getCurrentPosition(): number[] {
        return [this.ant.position.x, this.ant.position.z];
    }

    getDamagePerTurn(): number {
        return this.damagePerTurn;
    }
    
    /**
     * Calculate distance 'as the crow flies' from drone to target.
     * @returns number of pixels from drone to target.
     */
    getDistanceToTarget(center: number[], pos: number[]): number {
        // d = sqrt{ (x2-x1)^2 + (y2-y1)^2 }
        const xStep = (center[0] - pos[0]) * (center[0] - pos[0]);
        const zStep = (center[1] - pos[1]) * (center[1] - pos[1]);
        return Math.sqrt(xStep + zStep);
    }

    getHealth(): number {
        return this.health;
    }

    getSpeed(): number {
        return this.speed * this.speedModifier;
    }
    /**
     * Gets the name of the ant.
     * @returns the name of the ant.
     */
    getName(): string {
        return this.ant.name;
    }
    /**
     * Called when something collides with ant, which destroys it.
     * @param self         the thing to remove from collidables...and scene.
     * @param otherThing   the name of the other thing in collision (mainly for shield).
     * @returns whether or not impact means calling removeFromScene by collisionator.
     */
    impact(self: Collidable, otherThing: string): boolean {
        if (this.isAlive) {
            this.isAlive = false;
            this.scene.remove(this.ant);
            CollisionatorSingleton.remove(self);
            return true;
        }
        return false;
    }

    isAggressive(): boolean {
        return this.aggressive;
    }

    isPassive(): boolean {
        return false;
    }
    
}