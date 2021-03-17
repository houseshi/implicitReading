import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button, Layout, List, Progress, Row, Col, Upload, message, Space } from 'antd';
import { UploadOutlined , MinusCircleOutlined} from '@ant-design/icons';
import 'antd/dist/antd.less'
import './less/popup.less'

const { Footer, Content } = Layout;
export default class Popup extends Component {
  state = { files: [] }

  componentDidMount() {
    let self = this
    chrome.storage.local.get({ "files": false }, function (i) {
      if(!i.files){
        console.log(i)
        console.log(i.files)
        self.setState({"files":i.files})
      }
    });
  }

  addBooks = (e: any) => {
    let file:{name:string ,key:number,bold:any}
    let f: File = e.file.originFileObj
    const reder = new FileReader()
    const { files } = this.state;
    let fileString = reder.readAsBinaryString(f)
    reder.onload =  (e:any) =>{
      console.log(e)
      file = {
        name:f.name,
        key:f.size,
        bold:fileString
      }

      const newBooks = [file, ...files]
      this.setState({ files: newBooks })
      chrome.storage.local.set({ "files": newBooks }, function () {
        console.log(newBooks)
        console.log("保存成功")
      });
    }
  }
  removeBooks = (id:number) => {
    const {files} = this.state 
    const newFiles=  files.filter( (file:File) =>{
      if(id !== file.size){
          return file
      }
    })
    this.setState({files:newFiles});
  }
  render() {
    const { files } = this.state;
    return (
      <Layout style={{ background: "rgb(255 255 255)", width: "300px" }}>
        <Content>
          <Row>
            <Col span={2} />
            <Col span={20} >
              <List itemLayout="horizontal">
                {
                  files.map( (file:any) => {
                    return (
                      <div key={file.key}>
                        <List.Item >
                          <List.Item.Meta
                            // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<a href="javascript:void(0)">{file.name}</a>} />
                            <MinusCircleOutlined onClick={()=>{this.removeBooks(file.key)}}/>
                        </List.Item>
                        <div style={{ width: 220 }}>
                          <Progress percent={0} size="small" />
                        </div>
                      </div>
                    )
                  })
                }
              </List>
            </Col>
            <Col span={2} />
          </Row>
        </Content>
        <Footer>
          {/* accept="application/epub+zip  , text/plain" */}
            <Upload  showUploadList={false}
             accept="application/epub+zip" onChange={(info) => {
              if (info.file.status === 'done') {
                // message.success(`${info.file.name} file uploaded successfully`);
                this.addBooks(info);
              }
            }}>
              <Button icon={<UploadOutlined />}>添加新书</Button>
            </Upload>
        </Footer>
      </Layout >
    )
  }
}
ReactDOM.render(
  <Popup />,
  document.getElementById("root")
);


