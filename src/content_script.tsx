import Epub, { Rendition } from "epubjs"
class Content {
  caseDiv:any 

  linstenerMessage() {
    const self = this
    chrome.runtime.onMessage.addListener(function (msg, sender, callback) {
      self.readBook(msg)
    });
  }
  readBook(id: number) {
    // const book = Epub("http://www.jobwaitin.com/image/%E5%83%8F%E5%93%B2%E5%AD%A6%E5%AE%B6%E4%B8%80%E6%A0%B7%E7%94%9F%E6%B4%BB.epub");
    // let e = document.createElement("div")
    // const rendition: Rendition = book.renderTo(e)
    // console.log(rendition)
    
  }
  initCase(){
    this.caseDiv  = document.createElement('div');
    const caseFrame = document.createElement('iframe');
    caseFrame.src = chrome.runtime.getURL('page/case.html');
    caseFrame.id = 'case';
    caseFrame.className = 'caseName';
    this.caseDiv.appendChild(caseFrame)
  }
  showCase(){
    window.top.document.body.appendChild(this.caseDiv)
  }
  removeCase(){
    this.caseDiv.remove()
  }

  constructor() {
    this.linstenerMessage()
    this.initCase()
  }
}

new Content()