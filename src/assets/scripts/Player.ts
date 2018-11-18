import * as BABYLON from "babylonjs";

export class Player {
    private _camera:BABYLON.FreeCamera;
    private _canvas:HTMLCanvasElement;
    private _scene:BABYLON.Scene;

    constructor(canvas:HTMLCanvasElement, scene:BABYLON.Scene) {
        this._canvas = canvas;
        this._scene = scene;
    }

    public initPlayer():void {
        this._camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), this._scene);
        this._camera.setTarget(BABYLON.Vector3.Zero());
        this._camera.attachControl(this._canvas, false);
    }
}