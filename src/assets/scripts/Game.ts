import * as BABYLON from "babylonjs";
import { Player } from "./Player";
import '../textures/wood.jpg';

export class Game {
    private _canvas:HTMLCanvasElement;
    private _engine:BABYLON.Engine;
    private _scene:BABYLON.Scene;
    private _light:BABYLON.Light;
    private _player:Player;

    constructor(canvasElement:string) {
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(this._canvas, true);
    }

    public createScene():Promise<void> {
        return new Promise((resolve) => {
            this._scene = new BABYLON.Scene(this._engine);
            this._scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);
    
            let materialGround = new BABYLON.StandardMaterial("groundTexture", this._scene);
            materialGround.diffuseTexture = new BABYLON.Texture("assets/textures/wood.jpg", this._scene);
            materialGround.diffuseTexture.scale(4);        
            
            this._player = new Player(this._canvas, this._scene);
            this._player.initPlayer();
    
            this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this._scene);
    
            let cube = BABYLON.Mesh.CreateBox("cube1", 1, this._scene, false);
            cube.position.x = 1.7;
            cube.position.y = 1;
            cube.rotation.y = 10
    
            let cylindre = BABYLON.Mesh.CreateCylinder("cylindre", 4, 2, 2, 25, 5, this._scene, false);
            cylindre.position.y = 2;
    
            let ground = BABYLON.MeshBuilder.CreateGround('ground',{width: 6, height: 6, subdivisions: 2}, this._scene);
            ground.position.y = 0;    
            ground.material = materialGround;
            
            resolve();
        });            
    }

    public doRender():void {
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });
        
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }
}