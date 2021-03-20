import Epub from 'epubjs';
import "./less/case.less"
class Case {
    title:HTMLElement
    content:HTMLElement

    constructor(){
        this.title = document.getElementById("displayTitel")!
        this.content = document.getElementById("content")!
        this.redingbook()
    }
    showH1 = (e: any) => {
        const h1 = this.title
        let isDisplay = h1?.style.display
        if (isDisplay == "") {
            h1!.style.display = "inline"
        } else {
            h1!.style.display = ""
        }
    }

    redingbook() {
        const book = Epub("http://www.jobwaitin.com/image/%E5%83%8F%E5%93%B2%E5%AD%A6%E5%AE%B6%E4%B8%80%E6%A0%B7%E7%94%9F%E6%B4%BB.epub");
        // const content = document.querySelector(".content");
        const rendition = book.renderTo("content", { width: "100%", height: "100%"})
        
        const ids = rendition.display()
    
        // ids.then(e => {
        //     console.log(e)
        // }, b => {
        //     console.log(b)
        // })
    }

}
new Case()

// ReactDOM.render(
//     <Case />,
//     document.getElementById("root")
// );