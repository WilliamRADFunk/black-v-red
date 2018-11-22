[planet-funk](../README.md) > ["ts/player/base"](../modules/_ts_player_base_.md) > [Base](../classes/_ts_player_base_.base.md)

# Class: Base

*__class__*: Planetary base that player must defend.

## Hierarchy

**Base**

## Implements

* [Collidable](../interfaces/_ts_collidable_.collidable.md)

## Index

### Properties

* [building](_ts_player_base_.base.md#building)
* [buildingDead](_ts_player_base_.base.md#buildingdead)
* [buildingDeadGeometry](_ts_player_base_.base.md#buildingdeadgeometry)
* [buildingDeadMaterial](_ts_player_base_.base.md#buildingdeadmaterial)
* [buildingGeometry](_ts_player_base_.base.md#buildinggeometry)
* [buildingMaterial](_ts_player_base_.base.md#buildingmaterial)
* [currentRotation](_ts_player_base_.base.md#currentrotation)
* [index](_ts_player_base_.base.md#index)
* [isActive](_ts_player_base_.base.md#isactive)

### Methods

* [addToScene](_ts_player_base_.base.md#addtoscene)
* [endCycle](_ts_player_base_.base.md#endcycle)
* [getActive](_ts_player_base_.base.md#getactive)
* [getCollisionRadius](_ts_player_base_.base.md#getcollisionradius)
* [getCurrentPosition](_ts_player_base_.base.md#getcurrentposition)
* [getMeshes](_ts_player_base_.base.md#getmeshes)
* [getName](_ts_player_base_.base.md#getname)
* [impact](_ts_player_base_.base.md#impact)
* [isPassive](_ts_player_base_.base.md#ispassive)

---

## Properties

<a id="building"></a>

### `<Private>` building

**● building**: *`Mesh`*

*Defined in [ts/player/base.ts:46](https://github.com/WilliamRADFunk/planet-funk/blob/7d8bccd/src/ts/player/base.ts#L46)*

Controls the overall rendering of the base

___
<a id="buildingdead"></a>

### `<Private>` buildingDead

**● buildingDead**: *`Mesh`*

*Defined in [ts/player/base.ts:50](https://github.com/WilliamRADFunk/planet-funk/blob/7d8bccd/src/ts/player/base.ts#L50)*

Controls the overall rendering of the destroyed base

___
<a id="buildingdeadgeometry"></a>

### `<Private>` buildingDeadGeometry

**● buildingDeadGeometry**: *`BoxGeometry`*

*Defined in [ts/player/base.ts:34](https://github.com/WilliamRADFunk/planet-funk/blob/7d8bccd/src/ts/player/base.ts#L34)*

Controls size and shape of the destroyed base

___
<a id="buildingdeadmaterial"></a>

### `<Private>` buildingDeadMaterial

**● buildingDeadMaterial**: *`MeshPhongMaterial`*

*Defined in [ts/player/base.ts:42](https://github.com/WilliamRADFunk/planet-funk/blob/7d8bccd/src/ts/player/base.ts#L42)*

Controls the color of the destroyed base material

___
<a id="buildinggeometry"></a>

### `<Private>` buildingGeometry

**● buildingGeometry**: *`BoxGeometry`*

*Defined in [ts/player/base.ts:30](https://github.com/WilliamRADFunk/planet-funk/blob/7d8bccd/src/ts/player/base.ts#L30)*

Controls size and shape of the base

___
<a id="buildingmaterial"></a>

### `<Private>` buildingMaterial

**● buildingMaterial**: *`MeshPhongMaterial`*

*Defined in [ts/player/base.ts:38](https://github.com/WilliamRADFunk/planet-funk/blob/7d8bccd/src/ts/player/base.ts#L38)*

Controls the color of the base material

___
<a id="currentrotation"></a>

### `<Private>` currentRotation

**● currentRotation**: *`number`*

*Defined in [ts/player/base.ts:54](https://github.com/WilliamRADFunk/planet-funk/blob/7d8bccd/src/ts/player/base.ts#L54)*

Keeps track of planet's rotation to help calc satellite's position.

___
<a id="index"></a>

### `<Private>` index

**● index**: *`number`*

*Defined in [ts/player/base.ts:58](https://github.com/WilliamRADFunk/planet-funk/blob/7d8bccd/src/ts/player/base.ts#L58)*

Number in the creation order. Needed later to scale energy bar.

___
<a id="isactive"></a>

### `<Private>` isActive

**● isActive**: *`boolean`* = true

*Defined in [ts/player/base.ts:62](https://github.com/WilliamRADFunk/planet-funk/blob/7d8bccd/src/ts/player/base.ts#L62)*

Flag to signal if base has been destroyed or not. True = not destroyed. False = destroyed.

___

## Methods

<a id="addtoscene"></a>

###  addToScene

▸ **addToScene**(scene: *`Scene`*): `void`

*Defined in [ts/player/base.ts:103](https://github.com/WilliamRADFunk/planet-funk/blob/7d8bccd/src/ts/player/base.ts#L103)*

Adds base object to the three.js scene

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| scene | `Scene` |  graphic rendering scene object. Used each iteration to redraw things contained in scene. |

**Returns:** `void`

___
<a id="endcycle"></a>

###  endCycle

▸ **endCycle**(rotation: *`number`*): `void`

*Defined in [ts/player/base.ts:111](https://github.com/WilliamRADFunk/planet-funk/blob/7d8bccd/src/ts/player/base.ts#L111)*

At the end of each loop iteration, base updates planet's known rotation.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| rotation | `number` |  of planet to base current position off of. |

**Returns:** `void`

___
<a id="getactive"></a>

###  getActive

▸ **getActive**(): `boolean`

*Defined in [ts/player/base.ts:118](https://github.com/WilliamRADFunk/planet-funk/blob/7d8bccd/src/ts/player/base.ts#L118)*

Gets the viability of the base.

**Returns:** `boolean`
flag to signal non-destruction. True = not destroyed. False = destroyed.

___
<a id="getcollisionradius"></a>

###  getCollisionRadius

▸ **getCollisionRadius**(): `number`

*Defined in [ts/player/base.ts:125](https://github.com/WilliamRADFunk/planet-funk/blob/7d8bccd/src/ts/player/base.ts#L125)*

Gets the current radius of the bounding box (circle) of the collidable.

**Returns:** `number`
number to represent pixel distance from object center to edge of bounding box.

___
<a id="getcurrentposition"></a>

###  getCurrentPosition

▸ **getCurrentPosition**(): `number`[]

*Defined in [ts/player/base.ts:132](https://github.com/WilliamRADFunk/planet-funk/blob/7d8bccd/src/ts/player/base.ts#L132)*

Gets the current position of the base.

**Returns:** `number`[]
the array is of length 2 with x coordinate being first, and then z coordinate.

___
<a id="getmeshes"></a>

###  getMeshes

▸ **getMeshes**(): `Mesh`[]

*Defined in [ts/player/base.ts:141](https://github.com/WilliamRADFunk/planet-funk/blob/7d8bccd/src/ts/player/base.ts#L141)*

Provides the created mesh so it can be added to the mesh of a parent object like the planet.

**Returns:** `Mesh`[]
the base's alive and dead meshes

___
<a id="getname"></a>

###  getName

▸ **getName**(): `string`

*Defined in [ts/player/base.ts:148](https://github.com/WilliamRADFunk/planet-funk/blob/7d8bccd/src/ts/player/base.ts#L148)*

Gets the name of the base.

**Returns:** `string`
the name of the base.

___
<a id="impact"></a>

###  impact

▸ **impact**(self: *[Collidable](../interfaces/_ts_collidable_.collidable.md)*): `boolean`

*Defined in [ts/player/base.ts:156](https://github.com/WilliamRADFunk/planet-funk/blob/7d8bccd/src/ts/player/base.ts#L156)*

Called when something collides with base, which destroys it.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| self | [Collidable](../interfaces/_ts_collidable_.collidable.md) |  the thing to remove from collidables...and scene. |

**Returns:** `boolean`
whether or not impact means removing item from the scene.

___
<a id="ispassive"></a>

###  isPassive

▸ **isPassive**(): `boolean`

*Defined in [ts/player/base.ts:169](https://github.com/WilliamRADFunk/planet-funk/blob/7d8bccd/src/ts/player/base.ts#L169)*

States it is a passive type or not. Two passive types cannot colllide with each other.

**Returns:** `boolean`
True is passive | False is not passive

___
