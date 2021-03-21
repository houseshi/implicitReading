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
}