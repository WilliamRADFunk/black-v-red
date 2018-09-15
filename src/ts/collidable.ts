import { Scene } from "three";

export interface Collidable {
    /**
     * Gets the viability of the object.
     * @returns flag to signal non-destruction. True = not destroyed. False = destroyed.
     */
    getActive: () => boolean;
    /**
     * Gets the current radius of the bounding box (circle) of the collidable.
     * @returns number to represent pixel distance from object center to edge of bounding box.
     */
    getCollisionRadius: () => number;
    /**
     * Gets the current position of the collidable object.
     * @returns the array is of length 2 with x coordinate being first, and then z coordinate.
     */
    getCurrentPosition: () => number[];
    /**
     * Call to collidable object that it has been struck.
     * @param self the thing to remove from collidables...and scene.
     * @returns whether or not impact means removing item from the scene.
     */
    impact: (self: Collidable) => boolean;
    /**
     * States it is a passive type or not. Two passive types cannot colllide with each other.
     * @returns True is passive | False is not passive
     */
    isPassive: () => boolean;
    /**
     * Removes asteroid object from the three.js scene.
     * @param scene graphic rendering scene object. Used each iteration to redraw things contained in scene.
     */
    removeFromScene?: (scene: Scene) => void;
}