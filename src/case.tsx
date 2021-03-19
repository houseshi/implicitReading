import React, { Component } from 'react'
import ReactDOM from "react-dom";
import FileMoudle from './FileMoudle';

export default class Case extends Component {
    state = {file:{name:"xiangfengyiyangziyou",key:123,bold:test,rate:0}}

    componentDidMount(){
        const self = this
        chrome.storage.local.get({files:false}, item=>{
            if(item.files != false){
                let file = item.files.find( (f:FileMoudle) => f.active == true)
                self.setState(file)                
            }
        })
    }

    render() {
        const {file} = this.state
        return (
            <div>
                <h1>{file.name}</h1>
            </div>
        )
    }
}

ReactDOM.render(
    <Case />,
    document.getElementById("root")
);