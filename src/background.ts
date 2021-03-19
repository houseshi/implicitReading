
class BG {
  constructor() {
    this.linstennerMessage()
  }
  linstennerMessage() {
    chrome.runtime.onMessage.addListener(function (request, sender, callback) {
      chrome.tabs.query({active: true,currentWindow: true}, tabs => {
        try{
          chrome.tabs.sendMessage(Number(tabs[0].id), request)
        }catch(err){
          console.log(err)
        }
      })
    })
  }

}
new BG()
//   const files:Array<FileMoudle> =  i.files;
//  if(files.length >0 ){
//   const book =  Epub("../public/非对称风险.epub",{})
//   console.log(book)
//  }
// files.find( f => f.key == request ) 
// let buf:ArrayBuffer = FileUtils.arrToBuffer(file.bold)


