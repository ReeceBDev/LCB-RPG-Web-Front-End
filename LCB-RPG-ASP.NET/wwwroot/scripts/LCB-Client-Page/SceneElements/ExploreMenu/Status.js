import { SceneElement } from '../../SceneElements/SceneElement.js';
import * as THREE from 'three';
import { Text } from 'troika-three-text';
import { Colour } from '../../Types/Colour.js';
import { RoundedRect } from '../../ScriptResources/Imports/RoundedRectangle.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { Wireframe } from 'three/addons/lines/Wireframe.js';
export class Status extends SceneElement {
    GenerateElement() {
        const status = new THREE.Group;
        const relativeTimeStatus = new THREE.Group();
        let relativeTimeBackgroundPlane;
        let relativeTimeBackgroundBox;
        let relativeTimeBackgroundEdge;
        status.add(this.GenerateUserNameStatus());
        //Relative Time
        relativeTimeBackgroundPlane = new THREE.PlaneGeometry(20, 4);
        relativeTimeBackgroundEdge = new THREE.LineSegments(new THREE.EdgesGeometry(relativeTimeBackgroundPlane), new THREE.LineBasicMaterial({ color: Colour.MagiOrange, linewidth: 5 }));
        relativeTimeBackgroundBox = new THREE.Mesh(relativeTimeBackgroundPlane, new THREE.MeshBasicMaterial({ color: Colour.MatrixGreen, side: THREE.DoubleSide }));
        relativeTimeBackgroundBox.position.y = -6;
        relativeTimeBackgroundEdge.position.y = -6;
        status.add(relativeTimeStatus);
        return status;
    }
    GenerateUserNameStatus() {
        const userNameStatus = new THREE.Group;
        //userNameStatus.add(this.GenerateNameHarshBorder());
        userNameStatus.add(this.GenerateNameSoftBorder());
        userNameStatus.add(this.GenerateUserNameText());
        userNameStatus.add(this.GenerateIdentityBackground());
        userNameStatus.add(this.GenerateIdentityText());
        return userNameStatus;
    }
    GenerateNameHarshBorder() {
        const statusBackgroundBox = new THREE.Group;
        const lowerLeftEdgeCorner = new THREE.Group;
        const upperRightEdgeCorner = new THREE.Group;
        //Background Panel
        statusBackgroundBox.add(new THREE.Mesh(new THREE.PlaneGeometry(26, 13), new THREE.MeshBasicMaterial({ color: Colour.DeathBlack, side: THREE.DoubleSide, opacity: 0.1, transparent: true })));
        //Right Edge Corner
        upperRightEdgeCorner.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(10, -4.6),
            new THREE.Vector3(12, -4.6),
            new THREE.Vector3(12, -3.6)
        ]), new THREE.LineBasicMaterial({ color: Colour.RetroWhite })));
        upperRightEdgeCorner.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(12, -0.9),
            new THREE.Vector3(12, -2.7),
        ]), new THREE.LineBasicMaterial({ color: Colour.ConditionBlue })));
        upperRightEdgeCorner.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(12, 1.8),
            new THREE.Vector3(12, 2.2),
        ]), new THREE.LineBasicMaterial({ color: Colour.RetroWhite })));
        //Left Edge Corner
        lowerLeftEdgeCorner.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-12, 2.5),
            new THREE.Vector3(-12, 5.5),
            new THREE.Vector3(-10, 5.5)
        ]), new THREE.LineBasicMaterial({ color: Colour.RetroWhite })));
        lowerLeftEdgeCorner.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-12, -0.9),
            new THREE.Vector3(-12, -2.7),
        ]), new THREE.LineBasicMaterial({ color: Colour.ConditionBlue })));
        lowerLeftEdgeCorner.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-12, 0.8),
            new THREE.Vector3(-12, 1.2),
        ]), new THREE.LineBasicMaterial({ color: Colour.RetroWhite })));
        //StatusBackgroundBox collection
        lowerLeftEdgeCorner.position.y = 0.2;
        statusBackgroundBox.add(lowerLeftEdgeCorner);
        statusBackgroundBox.add(upperRightEdgeCorner);
        return statusBackgroundBox;
    }
    GenerateUserNameText() {
        const userNameSection = new THREE.Group;
        const title = new Text;
        const userName = new Text;
        //Title
        title.text = "IDENTITY ACTIVE";
        title.color = Colour.RetroWhite;
        title.fontSize = 2.2;
        title.position.x = -2.5;
        title.position.y = -0.2;
        title.anchorX = 'left';
        title.scale.y = -title.scale.y; //Flip the right way up.
        title.font = '/resources/Chathura-ExtraBold.ttf';
        //UserName
        userName.text = "A MYSTERIOUS MAN";
        userName.color = Colour.ConditionBlue;
        userName.fontSize = 4;
        userName.position.x = 8;
        userName.position.y = 0.1;
        userName.anchorX = 'center';
        userName.scale.y = -userName.scale.y; //Flip the right way up
        userName.font = '/resources/Chathura-ExtraBold.ttf';
        //Tag group
        userNameSection.add(title);
        userNameSection.add(userName);
        userNameSection.position.x = -9;
        userNameSection.position.y = -5;
        return userNameSection;
    }
    GenerateIdentityBackground() {
        const identityBackground = new THREE.Group;
        identityBackground.add(new THREE.Mesh(new THREE.PlaneGeometry(17, 2.7), new THREE.MeshBasicMaterial({ color: Colour.RetroWhite, side: THREE.DoubleSide, opacity: 0.1, transparent: true })));
        identityBackground.position.y = 1.08;
        identityBackground.position.x = -1;
        return identityBackground;
    }
    GenerateIdentityText() {
        const identityText = new THREE.Group;
        const playerIdentityNumber = new Text;
        const playerSpecies = new Text;
        const playerSentience = new Text;
        //Player Identity Number
        playerIdentityNumber.text = '12D3-4X9H-96A2';
        playerIdentityNumber.font = '/resources/Chathura-ExtraBold.ttf';
        playerIdentityNumber.fontSize = 3.5;
        playerIdentityNumber.position.y = -1.8;
        playerIdentityNumber.position.x = -1;
        playerIdentityNumber.anchorX = 'center'; //inverse.
        playerIdentityNumber.scale.y = -playerIdentityNumber.scale.y; //Flip the right way up
        identityText.add(playerIdentityNumber);
        //Player Species Flavour
        playerSpecies.text = 'HOMO-SAPIENS';
        playerSpecies.fontSize = 1.5;
        playerSpecies.font = '/resources/Chathura-Regular.ttf';
        playerSpecies.position.y = 2.3;
        playerSpecies.position.x = -11;
        playerSpecies.anchorX = 'left';
        playerSpecies.scale.y = -playerSpecies.scale.y; //Flip the right way up
        identityText.add(playerSpecies);
        //Player Sentience Flavour
        playerSentience.text = "SENTIENT BIOLOGICAL";
        playerSentience.fontSize = 1.5;
        playerSentience.font = '/resources/Chathura-Regular.ttf';
        playerSentience.position.y = 3.1;
        playerSentience.position.x = -11;
        playerSentience.anchorX = 'left';
        playerSentience.scale.y = -playerSentience.scale.y; //Flip the right way up
        identityText.add(playerSentience);
        return identityText;
    }
    GenerateNameSoftBorder() {
        const softBorder = new THREE.Group;
        const roundedRectangleGeometry = new THREE.ShapeGeometry(RoundedRect(new THREE.Shape(), 0, 0, 23, 10.5, 1.5));
        softBorder.add(new Wireframe(new LineSegmentsGeometry().fromEdgesGeometry(new THREE.EdgesGeometry(roundedRectangleGeometry)), new LineMaterial({ color: Colour.RetroWhite, linewidth: 3 })));
        softBorder.position.y = -4.75;
        softBorder.position.x = -12.5;
        return softBorder;
    }
}
//# sourceMappingURL=Status.js.map