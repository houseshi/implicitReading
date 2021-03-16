import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./less/popup.less"



export default class Popup extends Component {

  state = []
  componentDidMount(){
    let file:any =[];
    chrome.storage.local.get({"books":false},function(item){
      if(item.books){
        file = item.books
      }
    });
    this.setState([...file])
  }

  onChange = (e:any) =>{
    const files = e.target.files;
    chrome.storage.local.set({"books":files},function(){
      console.log("保存成功")
    });
    this.setState([...files])
    
  }
  render() {
    return (
      <div> 
        <input onChange={this.onChange} type="file" name="file" id="file" multiple />
        <button className="btn">upload</button>
      </div>
    )
  }
}
ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
// const Popup = () => {


//   // const [count, setCount] = useState(0);
//   // const [currentURL, setCurrentURL] = useState<string>();

//   // useEffect(() => {
//   //   chrome.browserAction.setBadgeText({ text: count.toString() });
//   // }, [count]);

//   // useEffect(() => {
//   //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//   //     setCurrentURL(tabs[0].url);
//   //   });
//   // }, []);

//   // const changeBackground = () => {
//   //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//   //     const tab = tabs[0];
//   //     if (tab.id) {
//   //       chrome.tabs.sendMessage(
//   //         tab.id,
//   //         {
//   //           color: "#555555",
//   //         },
//   //         (msg) => {
//   //           console.log("result message:", msg);
//   //         }
//   //       );
//   //     }
//   //   });
//   // };

//   return (
//       <div>
//         <input onChange={this.onChange} type="file" name="file" id="file"/>
//       </div>
//   );
// };


