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
targetPage.PreloadScene();
targetPage.RenderScene();
//# sourceMappingURL=LCB-User-Interface.js.map