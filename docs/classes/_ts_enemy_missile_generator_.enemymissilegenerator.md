[planet-funk](../README.md) > ["ts/enemy-missile-generator"](../modules/_ts_enemy_missile_generator_.md) > [EnemyMissileGenerator](../classes/_ts_enemy_missile_generator_.enemymissilegenerator.md)

# Class: EnemyMissileGenerator

*__class__*: Makes, Moves, and Scores the missiles and their resulting destruction.

## Hierarchy

**EnemyMissileGenerator**

## Index

### Properties

* [currentColor](_ts_enemy_missile_generator_.enemymissilegenerator.md#currentcolor)
* [currentLevel](_ts_enemy_missile_generator_.enemymissilegenerator.md#currentlevel)
* [maxMissiles](_ts_enemy_missile_generator_.enemymissilegenerator.md#maxmissiles)
* [missilePoints](_ts_enemy_missile_generator_.enemymissilegenerator.md#missilepoints)
* [missiles](_ts_enemy_missile_generator_.enemymissilegenerator.md#missiles)
* [scene](_ts_enemy_missile_generator_.enemymissilegenerator.md#scene)
* [scoreboard](_ts_enemy_missile_generator_.enemymissilegenerator.md#scoreboard)

### Methods

* [endCycle](_ts_enemy_missile_generator_.enemymissilegenerator.md#endcycle)
* [makeMissile](_ts_enemy_missile_generator_.enemymissilegenerator.md#makemissile)

---

## Properties

<a id="currentcolor"></a>

### `<Private>` currentColor

**● currentColor**: *`Color`*

*Defined in [ts/enemy-missile-generator.ts:14](https://github.com/WilliamRADFunk/planet-funk/blob/c76261c/src/ts/enemy-missile-generator.ts#L14)*

Keeps track of level's current color

___
<a id="currentlevel"></a>

### `<Private>` currentLevel

**● currentLevel**: *`number`* = 1

*Defined in [ts/enemy-missile-generator.ts:18](https://github.com/WilliamRADFunk/planet-funk/blob/c76261c/src/ts/enemy-missile-generator.ts#L18)*

Current level player is on, effects max missiles and points per missile destroyed.

___
<a id="maxmissiles"></a>

### `<Private>` maxMissiles

**● maxMissiles**: *`number`* = 20

*Defined in [ts/enemy-missile-generator.ts:22](https://github.com/WilliamRADFunk/planet-funk/blob/c76261c/src/ts/enemy-missile-generator.ts#L22)*

Maximum number of missiles that can exist at one time.

___
<a id="missilepoints"></a>

### `<Private>` missilePoints

**● missilePoints**: *`number`* = 30

*Defined in [ts/enemy-missile-generator.ts:26](https://github.com/WilliamRADFunk/planet-funk/blob/c76261c/src/ts/enemy-missile-generator.ts#L26)*

Points multiplier per enemy missile destroyed.

___
<a id="missiles"></a>

### `<Private>` missiles

**● missiles**: *[Projectile](_ts_projectile_.projectile.md)[]* =  []

*Defined in [ts/enemy-missile-generator.ts:30](https://github.com/WilliamRADFunk/planet-funk/blob/c76261c/src/ts/enemy-missile-generator.ts#L30)*

Keeps track of live missiles, to pass along endCycle signals, and destroy calls.

___
<a id="scene"></a>

### `<Private>` scene

**● scene**: *`Scene`*

*Defined in [ts/enemy-missile-generator.ts:34](https://github.com/WilliamRADFunk/planet-funk/blob/c76261c/src/ts/enemy-missile-generator.ts#L34)*

Reference to the scene, used to remove projectile from rendering cycle once destroyed.

___
<a id="scoreboard"></a>

### `<Private>` scoreboard

**● scoreboard**: *[ScoreHandler](_ts_score_handler_.scorehandler.md)*

*Defined in [ts/enemy-missile-generator.ts:38](https://github.com/WilliamRADFunk/planet-funk/blob/c76261c/src/ts/enemy-missile-generator.ts#L38)*

Reference to the scorekeeper for adding points on enemy missile destruction.

___

## Methods

<a id="endcycle"></a>

###  endCycle

▸ **endCycle**(isGameActive: *`boolean`*, color: *`Color`*, level: *`number`*): `void`

*Defined in [ts/enemy-missile-generator.ts:57](https://github.com/WilliamRADFunk/planet-funk/blob/c76261c/src/ts/enemy-missile-generator.ts#L57)*

At the end of each loop iteration, iterate endCycle through all missiless.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| isGameActive | `boolean` |  flag to let generator know if game is not lost. If it is, don't continue accruing points. |
| color | `Color` |  level number, grabbed from the LevelHandler. |
| level | `number` |

**Returns:** `void`

___
<a id="makemissile"></a>

### `<Private>` makeMissile

▸ **makeMissile**(): `void`

*Defined in [ts/enemy-missile-generator.ts:89](https://github.com/WilliamRADFunk/planet-funk/blob/c76261c/src/ts/enemy-missile-generator.ts#L89)*

Missiles generation in one place to avoid breaking DRY.

**Returns:** `void`

___
