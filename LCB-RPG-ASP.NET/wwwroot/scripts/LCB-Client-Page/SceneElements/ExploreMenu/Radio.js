import { SceneElement } from '../../SceneElements/SceneElement.js';
import * as THREE from 'three';
import { Text } from 'troika-three-text';
import { Colour } from '../../Types/Colour.js';
export class Radio extends SceneElement {
    InitiatePreload() {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load('/resources/radiotransparent.png', (texture) => {
            this.radioMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, transparent: true, color: 0x454540 });
            this.radioAspectRatio = texture.image.width / texture.image.height;
            this.FirePreloadedAssetsEvent(); //This indicates all assets have been loaded. Since there is only one, it can go here without calling something else or tallying, first.
        });
    }
    GenerateElement() {
        const radio = new THREE.Group;
        let radioProp;
        let yellowRadioBackground;
        let greyblueRadioBackground;
        let topRadioText;
        let bottomRadioTextpt1;
        let bottomRadioTextpt2;
        //Generate radio prop
        radioProp = new THREE.Mesh(new THREE.PlaneGeometry(70 * this.radioAspectRatio, 70), this.radioMaterial);
        radioProp.scale.y = -radioProp.scale.y; //Flip the right-way up.
        radioProp.position.z = 2;
        radio.add(radioProp);
        //Generate radio top-background
        yellowRadioBackground = new THREE.Mesh(new THREE.PlaneGeometry(25 * this.radioAspectRatio, 8), new THREE.MeshBasicMaterial({ color: Colour.AlertYellow, side: THREE.DoubleSide }));
        yellowRadioBackground.position.x = -6;
        yellowRadioBackground.position.y = -6;
        yellowRadioBackground.position.z = 0;
        radio.add(yellowRadioBackground);
        //Generate radio bottom-background
        greyblueRadioBackground = new THREE.Mesh(new THREE.PlaneGeometry(36 * this.radioAspectRatio, 30), new THREE.MeshBasicMaterial({ color: 0x637570, side: THREE.DoubleSide }));
        greyblueRadioBackground.position.x = -4.3;
        greyblueRadioBackground.position.y = 13;
        greyblueRadioBackground.position.z = 0;
        radio.add(greyblueRadioBackground);
        //Generate radio top-text
        topRadioText = new Text();
        topRadioText.font = '/resources/Chathura-ExtraBold.ttf';
        topRadioText.maxWidth = 14;
        topRadioText.text = 'CHANNEL: 441-GLOBALCOMMS' + '\n' + 'FREQUENCY: 149.24842 MHz' + '\n' + 'ENCRYPTION: UNENCRYPTED' + '\n' + 'ACCESS: PUBLIC';
        topRadioText.color = 0x85775d;
        topRadioText.fontSize = 1.8;
        topRadioText.lineHeight = 0.5;
        topRadioText.outlineColour = Colour.RetroWhite;
        topRadioText.outlineWidth = '2%';
        topRadioText.scale.y = -topRadioText.scale.y; //Flip text the right-way up.
        topRadioText.position.x = -12.5;
        topRadioText.position.y = -8;
        topRadioText.position.z = 1;
        topRadioText.rotation.y = (Math.PI / 180 * -2);
        topRadioText.rotation.z = (Math.PI / 180 * 0.7);
        radio.add(topRadioText);
        //Generate radio bottom-text pt1
        bottomRadioTextpt1 = new Text();
        bottomRadioTextpt1.font = '/resources/Chathura-Bold.ttf';
        bottomRadioTextpt1.maxWidth = 14;
        bottomRadioTextpt1.text = 'Player 1: Hello Everyone! has anyone seen the most recent episode of jojos bizzare adventure?' + '\n\nPlayer 2: Oh is that the one which did the thing with the tommy gun?!' + '\n\n[TRADE] Player 3: WTS 400x [Zalolint 12" Stan.], 400coins, dm me. in zartimor north.';
        bottomRadioTextpt1.color = 0x23332c;
        bottomRadioTextpt1.fontSize = 2;
        bottomRadioTextpt1.lineHeight = 0.5;
        bottomRadioTextpt1.outlineColour = Colour.RetroWhite;
        bottomRadioTextpt1.outlineWidth = '2%';
        bottomRadioTextpt1.scale.y = topRadioText.scale.y; //Flip text the right-way up.
        bottomRadioTextpt1.position.x = -13.6;
        bottomRadioTextpt1.position.y = 1;
        bottomRadioTextpt1.position.z = 0;
        bottomRadioTextpt1.rotation.y = (Math.PI / 180 * -2);
        bottomRadioTextpt1.rotation.z = (Math.PI / 180 * 1.1);
        radio.add(bottomRadioTextpt1);
        //Generate radio bottom-text pt2
        bottomRadioTextpt2 = new Text();
        bottomRadioTextpt2.font = '/resources/Chathura-Bold.ttf';
        bottomRadioTextpt2.maxWidth = 21;
        bottomRadioTextpt2.text = '\n\nPlayer 1: No, that was in season 2! You\'re about one decade behind hahaha.' + '\n\nPlayer 2: Next you\'re going to say, "Oh wait, didn\'t they say there will be a tommy gun in next week\'s episode?" ...' + '\n\nPlayer 1: Wait, didn\'t they say there will be a tommy gun in next week\'s episode??? Wait, what!!!';
        bottomRadioTextpt2.color = 0x23332c;
        bottomRadioTextpt2.fontSize = 2;
        bottomRadioTextpt2.lineHeight = 0.5;
        bottomRadioTextpt2.outlineColour = Colour.RetroWhite;
        bottomRadioTextpt2.outlineWidth = '2%';
        bottomRadioTextpt2.scale.y = -bottomRadioTextpt2.scale.y; //Flip text the right-way up.
        bottomRadioTextpt2.position.x = -13.6;
        bottomRadioTextpt2.position.y = 12;
        bottomRadioTextpt2.position.z = 0;
        bottomRadioTextpt2.rotation.y = (Math.PI / 180 * -2);
        bottomRadioTextpt2.rotation.z = (Math.PI / 180 * 1.1);
        radio.add(bottomRadioTextpt2);
        return radio;
    }
}
//# sourceMappingURL=Radio.js.map