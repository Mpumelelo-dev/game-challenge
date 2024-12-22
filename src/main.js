import { Boot } from './scenes/Boot';
import { Preloader } from './scenes/Preloader';
import { MainMenu } from './scenes/MainMenu';
import { Game } from './scenes/Game';
import { Variables } from './scenes/Variables';
import { Arrays } from './scenes/Arrays';
import { Loops } from './scenes/Loops';
import { Functions } from './scenes/Functions';
import { EndGame } from './scenes/EndGame';

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    dom: {
        createContainer: true
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        Variables,
        Arrays,
        Loops,
        Functions,
        EndGame 
    ]
};

export default new Phaser.Game(config);