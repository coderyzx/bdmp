import React from 'react';
import * as codemirror from 'codemirror/lib/codemirror';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
import 'codemirror/addon/lint/lint.js';
import 'codemirror/addon/lint/json-lint.js';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/theme/monokai.css';

// import styles from './chart.less';

class Mirror extends React.Component {
  editConfig = {
    mode: 'application/json', // 编辑器语言
    theme: 'mdn-like', // 编辑器主题
    lineNumbers: true, // 显示行号
    // tabSize: 2,
    smartIndent: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    lint: true,
    matchBrackets: true,
    extraKeys: {
      'Ctrl-Z': editor => {
        editor.undo();
      },
    },
    // readOnly: true,
  }

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount () {
    this.createEdit();
  }

  createEdit = () => {
    const { mode } = this.props;
    if (mode) {
      this.editConfig.mode = mode;
    }
    this.CodeMirrorEditor = codemirror.fromTextArea(this.edit, this.editConfig);
    this.CodeMirrorEditor.setSize('100%', `${document.body.clientHeight}px`);
    this.CodeMirrorEditor.on('change', editor => {
      const value = editor.getValue();
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
      <div style={{ height: `${document.body.clientHeight}px` }}>
        <textarea
          // className={styles.edit}
          ref={ el => { this.edit = el }}
        />
      </div>
    )
  }
}

export default Mirror;
