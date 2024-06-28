import { useState, useRef, FunctionComponent, useEffect } from 'react';
import pretty from 'pretty';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { xcode } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// IframeView组件，负责显示iframe和处理元素选择
const IframeView: FunctionComponent<{ src: string, onElementSelected: (element: HTMLElement) => void }> = ({ src, onElementSelected }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleIframeLoad = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDocument) {
        iframeDocument.body.addEventListener('click', handleElementClick);
      } else {
        console.error('Iframe document not found');
      }
    } else {
      console.error('Iframe not found');
    }
  };

  /**
   * 点击iframe内的元素时触发
   * 阻止默认事件，获取元素的xpath
   *
   * @param e - 点击事件
   */
  const handleElementClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    e.preventDefault();  // 阻止默认事件
    e.stopPropagation(); // 阻止事件传播
    onElementSelected(target);  // 传递选择的元素
  };

  useEffect(() => {
    handleIframeLoad();
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      width="80%"
      height="400px"
      style={{
        border: '2px solid #000',
        borderRadius: '30px'
      }}
    ></iframe>
  );
};

// HtmlDisplay组件，负责显示选中的元素信息
const HtmlDisplay: FunctionComponent<{ element: HTMLElement | null }> = ({ element }) => {

  /**
   * 获取元素的DOM路径
   *
   * @param element - 要获取DOM路径的元素
   * @returns - 元素的DOM路径
   */
  const parseDOM = (element: HTMLElement): string => {
    let path: string[] = [];
    while (element.parentNode) {
      let index = 0;
      let children = element.parentNode.children;
      for (let i = 0; i < children.length; i++) {
        if (children[i] === element) {
          index = i;
          break;
        }
      }
      let tagName = element.tagName.toLowerCase();
      let indexStr = index > 0 ? `[${index}]` : '';
      path.unshift(`${tagName}${indexStr}`);
      element = element.parentNode as HTMLElement;
    }
    return path.join('/');
  };

  return element ? (
    <div>
      Selected element: {element.tagName}
      <br />
      HTML:
      <SyntaxHighlighter language="htmlbars" style={xcode}>
        {pretty(element.outerHTML)}
      </SyntaxHighlighter>
      <br />
      Content:
      <div style={{ border: '1px solid #000' }}>
        <pre>
          <code dangerouslySetInnerHTML={{ __html: element.outerHTML }} />
        </pre>
      </div>
      <br />
      DOM path: {parseDOM(element)}
    </div>
  ) : (
    <div>No element selected</div>
  );
};

// ElementSelector组件，负责管理状态和渲染子组件
const ElementSelector: FunctionComponent = () => {
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const url = 'http://localhost:3000/test/media'; // 这里可以替换为你的URL

  return (
    <div>
      <h1>Select An ELEMENT</h1>
      <IframeView src={url} onElementSelected={setSelectedElement} />
      <HtmlDisplay element={selectedElement} />
    </div>
  );
};

export default ElementSelector;
