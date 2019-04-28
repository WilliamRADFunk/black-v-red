export interface Critter {
    getActive: () => boolean;
    getArmorValue: () => number;
    getArmorType: () => string;
    getDamagePerTurn: () => number;
    getHealth: () => number;
    getSpeed: () => number;
    isAggressive: () => boolean;
}