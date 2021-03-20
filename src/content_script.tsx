import Epub, { Book, Rendition } from "epubjs"
import FileMoudle from "./FileMoudle"
import FileUtils from "./FileUtils"
class Content {
  caseDiv: HTMLElement
  caseTitle: HTMLElement
  caseContent: HTMLElement
  rendition:Rendition

  set rendition( r:Rendition){
    this.rendition = r
  }

  linstenerMessage() {
    const self = this
    chrome.runtime.onMessage.addListener(function (msg, sender, callback) {
      console.log(msg)
      self.showCase()
    });
  }
  initCase() {
    this.caseDiv.style.position = "absolute"
    this.caseDiv.style.paddingTop = "10px"
    this.caseDiv.style.width = "720px"
    this.caseDiv.style.height = "720px"
    this.caseDiv.style.backgroundColor = "transparent"
    this.caseDiv.className = "drag"
    this.caseDiv.style.zIndex = "10000000"
    this.caseDiv.style.overflowY = "hidden"
    this.caseDiv.style.cursor = "move"
    this.caseDiv.style.top ="10px"
    this.caseDiv.style.left ="10px"
    this.caseDiv.draggable = true
    this.caseDiv.onmousedown = (down) => {
      let disX = down.clientX - this.caseDiv.offsetLeft;
      let disY = down.clientY - this.caseDiv.offsetTop;
      this.caseDiv.style.border="1px solid black"
      document.onmousemove = (move) => {
        let iL = move.clientX - disX;
        let iT = move.clientY - disY;
        // let maxL = document.documentElement.clientWidth - this.caseDiv.offsetWidth;
        // let maxT = document.documentElement.clientHeight - this.caseDiv.offsetHeight;
        // iL <= 0 && (iL = 0);
        // iT <= 0 && (iT = 0);
        // iL >= maxL && (iL = maxL);
        // iT >= maxT && (iT = maxT);
        this.caseDiv.style.left = iL + "px";
        this.caseDiv.style.top = iT + "px";
        return false
      }
      document.onmouseup = (up) => {
        document.onmouseup = null
        document.onmousemove = null
        this.caseDiv.style.border="0px solid transparent"
      }
      return false
    }

  }
  showCase() {
    window.top.document.body.appendChild(this.caseDiv)
    console.log(this.caseDiv.clientWidth,this.caseDiv.clientHeight)
  }
  redingbook() {

    chrome.storage.local.get({files:false}, item =>{
      if(item.files!= false){
        const {files} = item
        const f =  files.find( (f:FileMoudle) => f.active == true)
        const arr:ArrayBuffer = FileUtils.arrToBuffer(f.bold)
        // const book = Epub("http://www.jobwaitin.com/image/%E5%83%8F%E5%93%B2%E5%AD%A6%E5%AE%B6%E4%B8%80%E6%A0%B7%E7%94%9F%E6%B4%BB.epub");
        const book = new Book({ replacements: "blobUrl" });
        this.rendition = book.renderTo(this.caseDiv,{
          flow: "scrolled-doc",
          width:"720px",
          height:"720px",
          })
          this.rendition.display()
      }
    })
  }
  removeCase() {
    this.caseDiv.remove()
  }
  keydonw = (ex: KeyboardEvent) => {
    const{clientWidth ,clientHeight } = this.caseDiv
    let newW = clientWidth-10
    let newH = clientHeight-10
    let newWW = clientWidth+10
    let newHH = clientHeight+10
    if (ex.shiftKey == true) {
      switch (ex.key) {
        case "ArrowLeft":
          this.rendition.prev()
          console.log(this.rendition.book.locations)
          break;
        case "ArrowRight":
          this.rendition.next()
          console.log(this.rendition.book.locations)
          break;
          // case "ArrowUp":
          //   this.caseDiv.style.width = newWW +"px"
          //   this.rendition.resize(newW,clientHeight)
          // break
          // case "ArrowDown":
          //   this.caseDiv.style.height = newHH +"px"
          //   this.rendition.resize(clientWidth,newHH)
          // break
        default:
          break;
      }
    }
  }
  constructor() {
    this.caseDiv = document.createElement('div');
    this.caseTitle = document.createElement('h3');
    this.caseContent = document.createElement('div');
    this.linstenerMessage()
    this.initCase()
    document.addEventListener("keyup", this.keydonw)
  }
}

new Content()