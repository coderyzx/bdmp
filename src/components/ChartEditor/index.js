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
import 'codemirror/theme/idea.css';

import styles from './index.less';

class ChartEditor extends React.Component {
  editConfig = {
    mode: 'application/json', // 编辑器语言
    theme: 'idea', // 编辑器主题
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
      val: this.props.val,
    }
  }

  componentDidMount () {
    this.createEdit();
  }

  createEdit = () => {
    const { mode, onChange } = this.props;
    const { val } = this.state;
    if (mode) {
      this.editConfig.mode = mode;
    }
    this.CodeMirrorEditor = codemirror.fromTextArea(this.edit, this.editConfig);
    this.CodeMirrorEditor.setSize('100%', '100%');
    if (val) {
      this.CodeMirrorEditor.setValue(val);
      setTimeout(() => {
        this.CodeMirrorEditor.refresh();
     }, 1);
    }
    this.CodeMirrorEditor.on('change', editor => {
      const value = editor.getValue();
      try {
        onChange(JSON.parse(value));
      } catch (e) {
        onChange({});
        // console.log(e);
      }
    })
  }

  render () {
    return (
      <div className={styles.editWrap} style={{ height: `${document.body.clientHeight - 80}px` }}>
        <textarea
          className={styles.edit}
          ref={ el => { this.edit = el }}
        />
      </div>
    )
  }
}

export default ChartEditor;
