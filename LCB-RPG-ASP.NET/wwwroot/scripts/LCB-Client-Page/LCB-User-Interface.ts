import { AlertDemo } from './LCB-Interface-Scenes/AlertDemo.js';
import { ColourPalette } from './LCB-Interface-Scenes/ColourPalette.js';
import { ExploreMenu } from './LCB-Interface-Scenes/ExploreMenu.js';
import { MapMenu } from './LCB-Interface-Scenes/MapMenu.js';

/*
//Render ColourPalette Page
const colourTestPage = new ColourPalette();
colourTestPage.RenderScene();
*/

/*
//Render AlertDemo Page
const alertDemoPage = new AlertDemo();
alertDemoPage.RenderScene();
*/

//Render ExploreMenu Page
const targetPage = new MapMenu();
targetPage.PreloadScene()
targetPage.RenderScene();
