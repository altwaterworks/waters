import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as BABYLON from 'babylonjs';
@IonicPage()
@Component({
  selector: 'page-terrain',
  templateUrl: 'terrain.html',
})
export class Terrain {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    var canvas = document.getElementById('renderCanvas');
    var engine = new BABYLON.Engine(canvas, true);
    var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    // Create a rotating camera
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, Math.PI / 3, 20, BABYLON.Vector3.Zero(), scene);

    // Attach it to handle user inputs (keyboard, mouse, touch)
    camera.attachControl(canvas, false);

    // Add a light
    var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Tiled Ground Tutorial
    
    // Part 1 : Creation of Tiled Ground
    // Parameters
    var xmin = -10;
    var zmin = -10;
    var xmax =  10;
    var zmax =  10;
    var precision = {
        "w" : 2,
        "h" : 2
    };
    var subdivisions = {
        'h' : 8,
        'w' : 8
    };
    // Create the Tiled Ground
    var tiledGround = BABYLON.Mesh.CreateTiledGround("Tiled Ground", xmin, zmin, xmax, zmax, subdivisions, precision, scene);


    // Part 2 : Create the multi material
    // Create differents materials
    var whiteMaterial = new BABYLON.StandardMaterial("White", scene);
    whiteMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);

    var blackMaterial = new BABYLON.StandardMaterial("Black", scene);
    blackMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

    // Create Multi Material
    var multimat = new BABYLON.MultiMaterial("multi", scene);
    var zoom = 12;
    var xTileBase = 2120;
    var yTileBase = 1498;
    for (var row = 0; row < subdivisions.h; row++) {
        for (var col = 0; col < subdivisions.w; col++) {
            var material = new BABYLON.StandardMaterial(
                "material" + row + "-" + col,
                scene
            );
            material.diffuseTexture = new BABYLON.Texture(
                "http://b.tile.openstreetmap.org/" + zoom + "/" + (xTileBase + col) + "/" + (yTileBase - row) + ".png",
                scene
            );
            material.diffuseTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
            material.diffuseTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;
            material.specularColor = new BABYLON.Color3(0, 0, 0);
            material.backFaceCulling = false;
            multimat.subMaterials.push(material);
        }
    }
    

    // Part 3 : Apply the multi material
    // Define multimat as material of the tiled ground
    tiledGround.material = multimat;
   
    // Needed variables to set subMeshes
    var verticesCount = tiledGround.getTotalVertices();
    var tileIndicesLength = tiledGround.getIndices().length / (subdivisions.w * subdivisions.h);
    
    // Set subMeshes of the tiled ground
    tiledGround.subMeshes = [];
    var index = 0;
    var base = 0;
    for (var row = 0; row < subdivisions.h; row++) {
        for (var col = 0; col < subdivisions.w; col++) {
            var submesh = new BABYLON.SubMesh(
                index++, 0, verticesCount, base , tileIndicesLength, tiledGround
            );
            tiledGround.subMeshes.push(submesh);
            base += tileIndicesLength;
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return scene;
}
    var scene = createScene();

    engine.runRenderLoop(function() {
    scene.render();
});

  }

}
