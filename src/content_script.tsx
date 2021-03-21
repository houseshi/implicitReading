// import Epub, { Book, Rendition } from "epubjs"
import ePub from "epubjs"
import FileMoudle from "./FileMoudle"
import FileUtils from "./FileUtils"
class Content {
  caseDiv: HTMLElement
  caseTitle: HTMLElement
  caseContent: HTMLElement
  book:any
  currentFile:FileMoudle 

  linstenerMessage() {
    const self = this
    chrome.runtime.onMessage.addListener(function (file, sender, callback) {
      // console.log(file)
      self.showCase(file)
    });
  }
  initCase() {
    this.caseDiv.style.position = "absolute"
    this.caseDiv.style.paddingTop = "10px"
    this.caseDiv.style.width = "720px"
    this.caseDiv.style.height = "100%"
    this.caseDiv.style.backgroundColor = "#fcf8e38c"
    this.caseDiv.className = "drag"
    this.caseDiv.style.zIndex = "10000000"
    this.caseDiv.style.overflowY = "hidden"
    this.caseDiv.style.cursor = "move"
    this.caseDiv.style.top = "10px"
    this.caseDiv.style.left = "10px"
    this.caseDiv.draggable = true
    this.caseDiv.onmousedown = (down) => {
      let disX = down.clientX - this.caseDiv.offsetLeft;
      let disY = down.clientY - this.caseDiv.offsetTop;
      this.caseDiv.style.border = "1px solid black"
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
        this.caseDiv.style.border = "0px solid transparent"
      }
      return false
    }

  }
  showCase = (file: FileMoudle) => {
    window.top.document.body.appendChild(this.caseDiv)
    // console.log(this.caseDiv.clientWidth,this.caseDiv.clientHeight)
    this.redingbook(file)
  }
  redingbook = (file: FileMoudle) => {
    // const book = Epub("http://www.jobwaitin.com/image/%E5%83%8F%E5%93%B2%E5%AD%A6%E5%AE%B6%E4%B8%80%E6%A0%B7%E7%94%9F%E6%B4%BB.epub");
    // let file: FileMoudle = files.find(f => f.active == true)!
    let arr = FileUtils.arrToBuffer(file.bold)
    this.book = ePub()
    this.book.open(arr)
    this.currentFile = file
    const rendition = this.book.renderTo(this.caseDiv, {
      flow: "scrolled-doc",
      width: "720px",
      height: "720px",
    })
    rendition.display(file.rate)
    rendition.on("relocated", (location:any)=>{
      this.currentFile.rate = location.end.cfi
      // this.currentFile.percentage = this.book.locations.percentageFromCfi(location.end.cfi)
    });
    document.addEventListener("keyup", this.keydonw)

    // 监听页面 出现变动储存进度
    window.onbeforeunload = this.setFileReta
    window.onblur = this.setFileReta
    document.addEventListener('visibilitychange',this.setFileReta)
  }
  removeCase() {
    this.setFileReta()
    this.caseDiv.remove()
    // 移除界面的监听
    document.removeEventListener("keyup", this.keydonw)
    window.onbeforeunload = null
    window.onblur = null
    document.removeEventListener('visibilitychange',this.setFileReta)
    this.book.destroy()
  }
  keydonw = (ex: KeyboardEvent) => {
    const { clientWidth, clientHeight } = this.caseDiv
    let newW = clientWidth - 10
    let newH = clientHeight - 10
    let newWW = clientWidth + 10
    let newHH = clientHeight + 10
    if (ex.shiftKey == true) {
      switch (ex.key) {
        case "ArrowLeft":
          this.book.rendition.prev()
          
          break;
        case "ArrowRight":
          this.book.rendition.next()
          break;
        // case "ArrowUp":
        //   this.caseDiv.style.width = newWW +"px"
        //   this.rendition.resize(newW,clientHeight)
        // break
        // case "ArrowDown":
        //   this.caseDiv.style.height = newHH +"px"
        //   this.rendition.resize(clientWidth,newHH)
        // break
        case " ":
          this.removeCase()
        default:
          break;
      }
    }
  }
  /**
   * 设置书籍进度
   */
  setFileReta = ()=>{
    chrome.storage.local.get({files:false}, item=>{
      if(item.files !== false){
        const {files} = item
        const newFiles:Array<FileMoudle> = files.map( (f:FileMoudle)=>{
            if(f.key == this.currentFile.key){
              f = this.currentFile
            }
          return f
        })
        // console.log(newFiles)
        chrome.storage.local.set({files:newFiles})
      }  
    })
  }
  constructor() {
    this.caseDiv = document.createElement('div');
    this.caseTitle = document.createElement('h3');
    this.caseContent = document.createElement('div');
    this.linstenerMessage()
    this.initCase()
    this.currentFile = {key:1,
      name:"string",
      bold:[],
      rate:"",
      active:true,
      percentage:0}
      
  } 
}
new Content()


