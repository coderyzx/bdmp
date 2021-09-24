import React from 'react';
import * as codemirror from 'codemirror/lib/codemirror';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/lint/lint.js';
import 'codemirror/addon/lint/json-lint.js';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/idea.css';
import 'codemirror/theme/monokai.css';

class Mirror extends React.Component {
  editConfig = {
    mode: 'application/json', // 编辑器语言
    theme: 'idea', // 编辑器主题
    lineNumbers: true, // 显示行号
    tabSize: 2,
    smartIndent: true,
    lineWrapping: true,
    foldGutter: true,
    lineWiseCopyCut: true, // 将复制或剪切的行带有光标
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
      // value: this.props.value,
    }
  }

  componentDidMount () {
    this.createEdit();
  }

  createEdit = () => {
    const { mode, onChange } = this.props;
    // const { value } = this.state;
    if (mode) {
      this.editConfig.mode = mode;
    }
    // this.editConfig.value = value;
    this.CodeMirrorEditor = codemirror.fromTextArea(this.edit, this.editConfig);
    this.CodeMirrorEditor.setSize('100%', 'calc(100vh - 150px)');
    // if (value) {
    //   this.CodeMirrorEditor.setValue(value);
    //   setTimeout(() => {
    //     this.CodeMirrorEditor.refresh();
    //  }, 1);
    // }
    this.CodeMirrorEditor.on('change', editor => {
      const val = editor.getValue();
      try {
        onChange(JSON.parse(val));
      } catch (e) {
        onChange({});
      }
    })
  }

  render () {
    const { value } = this.props;
    return (
      <div >
        <textarea
          ref={ el => { this.edit = el }}
          value = {value}
          // value = {JSON.parse(value)}
        />
      </div>
    )
  }
}

export default Mirror;
