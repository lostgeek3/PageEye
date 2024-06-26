import {useState, useRef, FunctionComponent, useEffect} from 'react';
import pretty from 'pretty';
import SyntaxHighlighter from 'react-syntax-highlighter'
import { xcode } from 'react-syntax-highlighter/dist/esm/styles/hljs';


const ElementSelector: FunctionComponent = () => {
  const [url, setUrl] = useState<string>('');
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  // 随机数，用于刷新iframe
  const [random_id, setRandom_id] = useState<string>('');
  useEffect(() => {
    setRandom_id(`?${Math.random()}`);
  }, []);


  /**
   * iframe加载完成后，绑定点击事件
   */
  const handleIframeLoad = () => {
    console.log('Iframe loaded');
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
    // 阻止默认事件
    e.preventDefault();
    setSelectedElement(target);
    console.log(parseDOM(target));
  };

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

  const IframeView: FunctionComponent<{ src: string }> = ({ src }) => {
    return (
      <iframe
        ref={iframeRef}
        src={src + random_id}
        onLoad={handleIframeLoad}
        width="80%"
        height="400px"
        style={{
          border: '2px solid #000', // 设置边框宽度为2px，颜色为黑色
          borderRadius: '30px' // 设置边框圆角为10px
        }}
      ></iframe>
    );
  };

  /**
   *
   * @param code - 需要展示的html代码
   * @returns - 代码展示组件
   * @constructor
   */
  const HtmlCodeDisplay: FunctionComponent<{code: string}> = ({code}): React.ReactNode => {
    return (
      <SyntaxHighlighter language="htmlbars" style={xcode}>
        {code}
      </SyntaxHighlighter>
    );
  };

  return (
    <div>
      {/**/}
      {/*<input type="text" value={url} onChange={handleUrlChange} placeholder="Enter a website URL"/>*/}
      <h1>Select An ELEMENT</h1>
      <IframeView src="http://localhost:3000/sample-page" />
      {/*<IframeView src="https://www.csdn.net" />*/}
      {/*<IframeView src="https://www.baidu.com/"/>*/}
      {selectedElement && (
        <div>
          Selected element: {selectedElement.tagName}
          <br/>
          HTML:
          <HtmlCodeDisplay code={pretty(selectedElement.outerHTML)}/>
          <br/>
          Content:
          <div style={{border: '1px solid #000'}}>
            <pre>
              <code dangerouslySetInnerHTML={{__html: selectedElement.outerHTML}}/>
            </pre>
          </div>
          <br/>
          DOM path: {parseDOM(selectedElement)}
        </div>
      )}
    </div>
  );
};

export default ElementSelector;