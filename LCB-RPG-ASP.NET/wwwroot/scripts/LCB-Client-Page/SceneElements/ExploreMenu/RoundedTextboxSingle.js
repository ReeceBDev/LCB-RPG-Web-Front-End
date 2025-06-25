import * as THREE from 'three';
import { Text } from 'troika-three-text';
//RoundedBox Modules
import { RoundedRect } from '../../ScriptResources/Imports/RoundedRectangle.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { Wireframe } from 'three/addons/lines/Wireframe.js';
export function RoundedBorderBox(height, width, colour, linewidth) {
    const roundedBox = new THREE.Group();
    const borderGeometry = new THREE.ShapeGeometry(RoundedRect(new THREE.Shape(), 0, 0, width, height, 0.7));
    roundedBox.add(new Wireframe(new LineSegmentsGeometry().fromEdgesGeometry(new THREE.EdgesGeometry(borderGeometry)), new LineMaterial({ color: colour, linewidth: linewidth })));
    return roundedBox;
}
export function RoundedTextboxSingle(height, width, colour, linewidth, text, textSize) {
    const roundedTextbox = new THREE.Group();
    const border = RoundedBorderBox(height, width, colour, linewidth);
    const triokaText = new Text();
    roundedTextbox.add(border);
    roundedTextbox.add(triokaText);
    triokaText.text = text;
    triokaText.colour = colour;
    triokaText.textSize = textSize;
    triokaText.position.x = height * 0.5;
    triokaText.position.y = width * 0.5;
    triokaText.anchorX = 'center';
    triokaText.anchorY = 'center';
    triokaText.scale.y = -triokaText.scale.y; //Flip the right-way up.
    triokaText.font = '/resources/Chathura-ExtraBold.ttf';
    return roundedTextbox;
}
//# sourceMappingURL=RoundedTextboxSingle.js.map