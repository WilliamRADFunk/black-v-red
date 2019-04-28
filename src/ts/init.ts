import {
    AmbientLight,
    Audio,
    AudioBuffer,
    AudioListener,
    AudioLoader,
    CanvasRenderer,
    DoubleSide,
    Font,
    FontLoader,
    Mesh,
    MeshBasicMaterial,
    OrthographicCamera,
    PlaneGeometry,
    Raycaster,
    Scene,
    TextureLoader,
    WebGLRenderer,
    Vector2, 
    Texture,
    Camera} from 'three';

import { CollisionatorSingleton } from './collisionator';
import { SoundinatorSingleton } from './soundinator';

/**
 * The thing that hears sound.
 */
const audioListener: AudioListener = new AudioListener();
/**
 * Loads the font from a json file.
 */
const fontLoader = new FontLoader();
/**
 * The loaded font, used for the scoreboard.
 */
let gameFont: Font;
/**
 * Sound file paths
 */
const soundPaths: string[] = [
    /**
     * Click On Sound
     * http://soundbible.com/1280-Click-On.html
     * license: Attribution 3.0
     * Recorded by: Mike Koenig 
     */
    'assets/audio/click.mp3',
    /**
    * Beam Me Up Scotty Sound
    * http://soundbible.com/256-Beam-Me-Up-Scotty.html
    * license: Personal Use Only
    * Recorded by: N/A
    */
    'assets/audio/game-over.mp3'
];
/**
 * Loads the audio files.
 */
const soundLoaders: AudioLoader[] = [
    new AudioLoader(),
    new AudioLoader()
];
/**
 * List of loaded audio files.
 */
const sounds: Audio[] = [];
/**
 * Passes the callback functions to font and texture loaders,
 * each fitted with their chance to check if all others are done.
 */
const loadAssets = () => {
    SoundinatorSingleton.addListener(audioListener);
    // Callback function to set the scoreboard font once it is finished loading.
    fontLoader.load( 'assets/fonts/Light Pixel-7_Regular.json', font => {
        gameFont = font;
        checkAssetsLoaded();
    });
    // Get the ball rolling on each of the sound file loads.
    soundLoaders.forEach((loader, index) => {
        soundLoaders[index].load(
            soundPaths[index],
            (soundBuffer: AudioBuffer) => {
                const sound = (new Audio(audioListener)).setBuffer(soundBuffer);
                sound.setLoop(false);
                sounds[index] = sound;
                checkAssetsLoaded();
            },
            (xhr: { loaded: number; total: number;}) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error: string) => console.log(`Failed to load (${soundPaths[index].split('/').pop()}) sound file`, error)
        );
    });
};
/**
 * Checks to see if all assets are finished loaded. If so, start rendering the game.
 */
const checkAssetsLoaded = () => {
    if (gameFont &&
        sounds.filter(s => s).length === soundLoaders.length) {
        SoundinatorSingleton.addSounds(sounds);
        loadGame();
    }
};
/**
 * All things game related. Only starts when all assets are finished loading.
 * @param difficulty player's choice in difficulty level.
 */
const loadGame = () => {
    // Establish initial window size.
    let WIDTH: number = window.innerWidth * 0.99;
    let HEIGHT: number = window.innerHeight * 0.99;
    // Create ThreeJS scene.
    const scene = new Scene();
    // Choose WebGL renderer if browser supports, otherwise fall back to canvas renderer.
    const renderer: WebGLRenderer|CanvasRenderer = ((window as any)['WebGLRenderingContext']) ?
        new WebGLRenderer() : new CanvasRenderer();
    // Make it black and size it to window.
    (renderer as any).setClearColor(0x000000, 0);
    renderer.setSize( WIDTH, HEIGHT );
    renderer.autoClear = false;
    // An all around brightish light that hits everything equally.
    scene.add(new AmbientLight(0xCCCCCC));
    // Render to the html container.
    const container = document.getElementById('mainview');
	container.appendChild( (renderer as any).domElement );
    // Set up player's ability to see the game, and focus center on colony (Queen).
    const camera =  new OrthographicCamera( -6, 6, -6, 6, 0, 100 );
	camera.position.set(0, -20, 0);
    camera.lookAt(scene.position);
    camera.add(audioListener);
    /**
     * Gracefully handles a change in window size, by recalculating shape and updating camera and renderer.
     */
    const onWindowResize = () => {
        WIDTH = window.innerWidth * 0.99;
        HEIGHT = window.innerHeight * 0.99;
        if(WIDTH < HEIGHT) HEIGHT = WIDTH;
        else WIDTH = HEIGHT;
        renderer.setSize( WIDTH, HEIGHT );
        document.getElementById('mainview').style.left = (((window.innerWidth * 0.99) - WIDTH) / 2) + 'px';
        document.getElementById('mainview').style.width = WIDTH + 'px';
        document.getElementById('mainview').style.height = HEIGHT + 'px';
    };
    onWindowResize();
    window.addEventListener( 'resize', onWindowResize, false);

    /**
     * The render loop. Everything that should be checked, called, or drawn in each animation frame.
     */
    const render = () => {
        console.log('Rendering');
        renderer.render( scene, camera );
	    requestAnimationFrame( render );
    };
    // Kick off the first render loop iteration.
    renderer.render( scene, camera );
	requestAnimationFrame( render );
};
/**
 * Called by DOM when page is finished loading. Now load assets, then the game.
 */
export default () => {
    loadAssets();
}