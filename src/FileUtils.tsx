import FileMoudle from "./FileMoudle";


export default class FileUtils {
    static arrToBuffer(arr: Array<number>): ArrayBuffer {
        let arrayBuffer = new Uint8Array(arr).buffer;
        return arrayBuffer
    }
    static filesFilter(file:FileMoudle, files: Array<FileMoudle>){
        const fs = files.map((f: FileMoudle) => {
            if (file.key != f.key && file.name != f.name) {
                return f
            }
        })
        return fs
    }
    // static async chromeStorage(storageEnum: StorageEnum, f: FileMoudle, fs: Array<FileMoudle>,callBack:any) {
    //     switch (storageEnum) {
    //         case StorageEnum.get:
    //             chrome.storage.local.get({"files": false}, callBack )
    //             break;
    //         case StorageEnum.set:
    //             chrome.storage.local.set({"files": fs}, callBack )
    //             break;
    //         case StorageEnum.del:
    //             this.chromeStorage(StorageEnum.get,f,fs,()=>{})
    //             break;
    //         case StorageEnum.clear:
    //             chrome.storage.local.clear()
    //             break
    //         default:
    //             break;
    //     }
    // }

}