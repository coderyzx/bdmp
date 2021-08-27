import React from 'react';
import * as codemirror from 'codemirror/lib/codemirror';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/lint/lint.js';
import 'codemirror/addon/lint/json-lint.js';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/theme/idea.css';

class Mirror extends React.Component {
  editConfig = {
    mode: 'application/json', // 编辑器语言
    theme: 'idea', // 编辑器主题
    lineNumbers: true, // 显示行号
    tabSize: 2,
    smartIndent: true,
    lineWrapping: true,
    foldGutter: true,
    lineWiseCopyCut: true,//将复制或剪切的行带有光标
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    lint: true,
    matchBrackets: true,
    extraKeys: {
      'Ctrl-Z': editor => {
        editor.undo();
      },
    },
   
  }

  constructor(props) {
    super(props);
    this.state = {
      option1: {
        id: '1',
        title: '基础折线图',
        option: {
          xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: {
              type: 'value',
          },
          series: [{
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'line',
          }],
        },
      },
    }
  }

  componentDidMount () {
    this.createEdit();
  }

  createEdit = () => {
    const { mode, } = this.props;
    // const {option } = this.props;
  // option = {JSON.parse(item.optionjson.replace(/\n/g,""))}
// option = {eval("("+item.optionjson+")")}
// dangerouslySetInnerHTML = {{__html:item}}
    if (mode) {
      this.editConfig.mode = mode;
      this.editConfig.value=this.state.option1.option;
    }
    this.CodeMirrorEditor = codemirror.fromTextArea(this.edit, this.editConfig);
    this.CodeMirrorEditor.setSize('100%', 'calc(100vh - 153px)');
    // this.CodeMirrorEditor.setValue( this.state.option1.option);//设置初始值
    this.CodeMirrorEditor.on('change', editor => {
      const value = editor.getValue();
      const { handleSaveValue } = this.props;
      handleSaveValue(value);
      try {
        console.log(JSON.parse(value));
        
      } catch (e) {
        console.log(e);
      }
    })
  }

  render () {
    return (
      // <div className={styles.editWrap} style={{ height: `${document.body.clientHeight}px` }}>
      //   <textarea
      //     className={styles.edit}
      //     ref={ el => { this.edit = el }}
      //   />
      // </div>
      <div >
        <textarea
          ref={ el => { this.edit = el }}
        />
      </div>
    )
  }
}

export default Mirror;
