import * as bjs from 'babylonjs';
import GLSGAssetManager from '../../glsg/AssetManager';
import { Scene } from './Scene';

type LoadAssetHandler = (arg1: bjs.AbstractAssetTask[]) => void;

type MeshTaskSuccessHandler = (arg1: bjs.MeshAssetTask) => void;
type MeshTaskErrorHandler = (arg1: bjs.MeshAssetTask, arg2: string, arg3: any) => void;

export class MeshAssetsManager 
{
    private static _instance: MeshAssetsManager;
    
    private assetsManager: bjs.AssetsManager;
    
    private constructor()
    {

    }

    public async init(scene : Scene)
    {
        this.assetsManager = new bjs.AssetsManager(null);
    }

    public async load(finishHandler: LoadAssetHandler)
    {
        this.assetsManager.load();
        
        this.assetsManager.onFinish = function (tasks) {
            finishHandler(tasks);
        };
    }

    public addMeshTask(taskName: string, meshesNames: any, rootUrl: string, sceneFileName: string, success: MeshTaskSuccessHandler, error: MeshTaskErrorHandler) 
    {
        var meshTask = this.assetsManager.addMeshTask(taskName, meshesNames, rootUrl, sceneFileName);

        meshTask.onSuccess = function (task) {
            // task.loadedMeshes[0].position = bjs.Vector3.Zero();
            success(task);
        }
        meshTask.onError = function (task, message, exception) {
            // console.log(message, exception);
            error(task, message, exception);
        }
    }

    public static get Instance()
    {
        // Do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }
}