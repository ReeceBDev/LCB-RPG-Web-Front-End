import { UserInterfaceScene } from '../../ScriptResources/UserInterfaceScene.js';
import { SceneUtilities } from '../../ScriptResources/SceneUtilities.js';
import { SceneElement } from '../../SceneElements/SceneElement.js';

import * as THREE from 'three';
import { Text } from 'troika-three-text';
import { Colour } from '../../Types/Colour.js';

import { preloadFont } from 'troika-three-text';
import { OverrideMaterialManager } from 'postprocessing';
import { Line2 } from 'three/addons/lines/Line2.js';

export class ExplorationTextfield extends SceneElement  {

    private textfieldOutlineInner: THREE.LineSegments;
    private textfieldOutlineOuter: THREE.LineSegments;
    private currentInterfaceScene: UserInterfaceScene;
    constructor(sourceInterfaceScene: UserInterfaceScene) {
        super(sourceInterfaceScene);

        this.currentInterfaceScene = sourceInterfaceScene;
    }

    protected GenerateElement(): THREE.Group {
        const textfield = new THREE.Group;

        //Geometries
        const textfieldText = new Text({
            color: Colour.EmergencyOrange,
            //font: '../../../../resources/Exo-Light.ttf',
            //font: '/resources/Chathura-Regular.ttf',
            
        });
        this.textfieldOutlineInner = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(10, 10, 10)), new THREE.LineBasicMaterial({ color: Colour.WarningRed }));
        this.textfieldOutlineOuter = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(11, 11, 11)), new THREE.LineBasicMaterial({ color: Colour.WarningRed, linewidth: 5}));

        //Textfield Text
        textfieldText.text = '10/04/2666 03:14:10\n\n A tsunami of a thousand glass-like reflections tear open reality with a roar. When they close, you are left standing in their place.\n Room Description\n Caramel and burgundy leaves rustle in the shallow breeze across the arid plains, the wind gently whipping around your ankles. Gently falling from their branches, the occasional leaf drifts as a feather to rest upon a chair that sits beside the tree, carved from the same oakwood as the trunk it rests against.\n \nHistorical Log\n <>-<>-< 10/04/2666 03:13:42 >-<><>\n With a scraping squeak you negotiate twisting out each side of the sharp shattered glass from its linear socket. Placing your functional lightstrip into the quickrelease, a switch faintly clicks and you forcefully scrape in the opposite side. Upon both sides touching their contacts, the lightstrip naps and crackles to life immediately, a gentle 48 watts of power rippling dramatically through the filament, igniting the recombustible zalolintene.\n \n<><>-< 10/04/2666 03:13:55 >-<><>\n Relentlessly smashing the centre of the zalolint\'s tubular trunk, a loud crack splits glass into energetic shards which skate the air with viciousness, whispering off the floor.\n \n<> <>-<10/04/2666 03: 14:02 > -<>-<>\n With a scraping squeak you negotiate twisting out each side of the sharp shattered glass from its linear socket.Placing your functional lightstrip into the quickrelease, a switch faintly clicks and you forcefully scrape in the opposite side.Upon both sides touching their contacts, the lightstrip naps and crackles to life immediately, a gentle 48 watts of power rippling dramatically through the filament, igniting the recombustible zalolintene.\n \n1 » Break Shatter along the side of the zalolint lightstrip until it leaks or the filament bends.\n 2 » Go back to main menu.\nHang on: \n Please enter the number of your choice.Pressing enter will do nothing on its own!\n\nChoose an option: >\n';
        textfieldText.fontSize = 1.5;
        textfieldText.scale.y = -textfieldText.scale.y; //Flip text the right-way up.
        textfieldText.color = Colour.RetroWhite;
        //textfieldText.outlineBlur = '8%';
        textfieldText.outlineColor = Colour.WarningRed;
        textfieldText.font = '/resources/Exo-Light.ttf';
        textfieldText.maxWidth = 120;

        textfield.add(textfieldText);
        textfieldText.sync();

        let textfieldSkull = new Text();
        textfieldSkull.position.x = 30;
        textfieldSkull.position.y = 80;
        textfieldSkull.fontSize = 0.1;
        textfieldSkull.scale.y = -textfieldText.scale.y; //Flip the right way up
        textfieldSkull.colour = Colour.RetroWhite;
        textfieldSkull.text = 

        //Textfield Background
        SceneUtilities.SetHeightAsPercent(this.currentInterfaceScene, this.textfieldOutlineInner, 0);
        SceneUtilities.SetLateralAsPercent(this.currentInterfaceScene, this.textfieldOutlineInner, 0);
        textfield.add(this.textfieldOutlineInner);

        SceneUtilities.SetHeightAsPercent(this.currentInterfaceScene, this.textfieldOutlineOuter, 0);
        SceneUtilities.SetLateralAsPercent(this.currentInterfaceScene, this.textfieldOutlineOuter, 0);
        textfield.add(this.textfieldOutlineOuter);

        return textfield;
    }

    public override Animate() {

    }
}