'use client';

import React, { useState, useRef, FormEvent } from 'react';

const ScalePage = () => {
  const [result, setResult] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const arraysEqual = (a: string[], b: string[]) => {
    if (!a || !b || a.length !== b.length) return false;
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return sortedA.every((val, idx) => val === sortedB[idx]);
  };

  const submitQuiz = (event: FormEvent) => {
    event.preventDefault();
    const currentForm = formRef.current;
    if (!currentForm) {
      return;
    }

    const answers: { [key: string]: string | string[] } = {
        q1: 'b', q2: 'b', q3: 'true', q4: 'true', q5: 'b', q6: 'c', q7: 'true', q8: 'true',
        q9: 'a', q10: 'a', q11: 'b', q12: 'a', q13: 'c', q14: 'true', q15: 'true', q16: 'true',
        q17: 'false', q18: 'true', q19: 'a', q20: 'b', q21: 'a', q22: 'a', q23: 'a', q24: 'b',
        q25: 'a', q26: 'c', q27: 'c', q28: 'd', q29: 'c', q30: 'b', q31: 'false', q32: 'false',
        q33: 'true', q34: 'true', q35: 'true', q36: 'true', q37: 'true', q38: 'true', q39: 'false',
        q40: 'false', q41: 'false', q42: 'c', q43: 'a', q44: 'false', q45: 'true', q46: 'true',
        q47: 'a', q48: 'true', q49: 'true', q50: 'a', q51: 'true', q52: 'true', q53: 'a',
        q54: 'true', q55: 'true', q56: 'true', q57: 'b', q58: 'c', q59: 'a', q60: 'a',
        q61: 'true', q62: 'a', q63: 'a',
        q64: ['a', 'c', 'd'], q65: ['a', 'b'], q66: ['a', 'c', 'd'], q67: ['a', 'b', 'c', 'e'], q68: ['a', 'b', 'c', 'e'],
        q69: ['a', 'b', 'c', 'd'], q70: ['a', 'b', 'c', 'd'], q71: ['a', 'd'], q72: ['a', 'b', 'c', 'd'], q73: ['a', 'd'],
        q74: 'a', q75: ['a', 'b', 'c', 'd'], q76: 'true', q77: 'a', q78: ['a', 'b', 'c'],
        q79: 'true', q80: 'a', q81: ['a', 'b', 'd'], q82: 'false', q83: 'a', q84: 'a',
        q85: 'true', q86: 'b', q87: ['a', 'b', 'c'], q88: 'true', q89: 'c',
        q90: ['a', 'b', 'c', 'd'], q91: 'true', q92: 'a', q93: 'true', q94: 'a', q95: 'b',
        q96: 'true', q97: 'true', q98: 'c', q99: 'a', q100: 'c', q101: 'c',
    };

    let score = 0;
    const total = Object.keys(answers).length;
    let resultHTML = '<h3>答题结果：</h3>';

    for (const key in answers) {
      const questionNumber = key.replace('q', '');
      const correctAnswer = answers[key];

      if (Array.isArray(correctAnswer)) {
        const userCheckboxes = currentForm.querySelectorAll<HTMLInputElement>(`input[name=${key}]:checked`);
        const userAnswers = Array.from(userCheckboxes).map(i => i.value);

        if (userAnswers.length === 0) {
          resultHTML += `<p>第 ${questionNumber} 题：未作答</p>`;
          continue;
        }
        if (arraysEqual(userAnswers.sort(), correctAnswer.sort())) {
          score++;
          resultHTML += `<p>第 ${questionNumber} 题：正确</p>`;
        } else {
          resultHTML += `<p>第 ${questionNumber} 题：错误（正确答案：${correctAnswer.join(', ')}）</p>`;
        }
      } else {
        const selectedOption = currentForm.querySelector<HTMLInputElement>(`input[name=${key}]:checked`);
        if (!selectedOption) {
          resultHTML += `<p>第 ${questionNumber} 题：未作答</p>`;
          continue;
        }
        if (selectedOption.value === correctAnswer) {
          score++;
          resultHTML += `<p>第 ${questionNumber} 题：正确</p>`;
        } else {
          resultHTML += `<p>第 ${questionNumber} 题：错误（正确答案：${correctAnswer}）</p>`;
        }
      }
    }
    resultHTML += `<h3 style="margin-top: 20px;">总分：${score} / ${total}</h3>`;
    setResult(resultHTML);
  };

  return (
    <>
      <style jsx global>{`
        body {
            font-family: Arial, sans-serif;
            margin: 0;
        }
        h1 {
            text-align: center;
            color: #333;
        }
        .question {
            margin-bottom: 20px;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        .options {
            margin-top: 10px;
        }
        .option {
            margin-bottom: 5px;
        }
        button {
            padding: 10px 20px;
            background-color: #007BFF;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            display: block;
            margin: 20px auto;
        }
        button:hover {
            background-color: #0056b3;
        }
        #result {
            margin-top: 20px;
            padding: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
      `}</style>
      <div style={{
        background: 'linear-gradient(to bottom, #d9e2ec, #b8c6db)',
        padding: '80px 20px 20px 20px',
        minHeight: '100vh'
      }}>
        <h1>HTML和CSS基础测试（扩展版）</h1>
        <form id="quizForm" ref={formRef} onSubmit={submitQuiz}>

          <div className="question">
              <p>1. 以下哪个标签用于定义 HTML 文档的头部信息？</p>
              <div className="options">
                  <label className="option"><input type="radio" name="q1" value="a" /> &lt;body&gt;</label><br/>
                  <label className="option"><input type="radio" name="q1" value="b" /> &lt;head&gt;</label><br/>
                  <label className="option"><input type="radio" name="q1" value="c" /> &lt;html&gt;</label><br/>
                  <label className="option"><input type="radio" name="q1" value="d" /> &lt;title&gt;</label><br/>
              </div>
          </div>
          <div className="question">
              <p>2. CSS 中用于设置背景颜色的属性是？</p>
              <div className="options">
                  <label className="option"><input type="radio" name="q2" value="a" /> text-color</label><br/>
                  <label className="option"><input type="radio" name="q2" value="b" /> background-color</label><br/>
                  <label className="option"><input type="radio" name="q2" value="c" /> color</label><br/>
                  <label className="option"><input type="radio" name="q2" value="d" /> bg-color</label><br/>
              </div>
          </div>
          <div className="question">
              <p>3. &lt;img&gt; 标签用于插入图片，必须包含 `src` 属性。（判断题）</p>
              <div className="options">
                  <label className="option"><input type="radio" name="q3" value="true" /> 正确</label><br/>
                  <label className="option"><input type="radio" name="q3" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>4. CSS 选择器 `.classname` 用于选择类名为 `classname` 的元素。（判断题）</p>
              <div className="options">
                  <label className="option"><input type="radio" name="q4" value="true" /> 正确</label><br/>
                  <label className="option"><input type="radio" name="q4" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>5. 以下哪个标签用于创建有序列表？</p>
              <div className="options">
                  <label className="option"><input type="radio" name="q5" value="a" /> &lt;ul&gt;</label><br/>
                  <label className="option"><input type="radio" name="q5" value="b" /> &lt;ol&gt;</label><br/>
                  <label className="option"><input type="radio" name="q5" value="c" /> &lt;li&gt;</label><br/>
                  <label className="option"><input type="radio" name="q5" value="d" /> &lt;dl&gt;</label><br/>
              </div>
          </div>
          <div className="question">
              <p>6. CSS 中用于设置字体大小的属性是？</p>
              <div className="options">
                  <label className="option"><input type="radio" name="q6" value="a" /> font-style</label><br/>
                  <label className="option"><input type="radio" name="q6" value="b" /> font-weight</label><br/>
                  <label className="option"><input type="radio" name="q6" value="c" /> font-size</label><br/>
                  <label className="option"><input type="radio" name="q6" value="d" /> font-family</label><br/>
              </div>
          </div>
          <div className="question">
              <p>7. HTML 中可以使用 &lt;br&gt; 标签来创建换行。（判断题）</p>
              <div className="options">
                  <label className="option"><input type="radio" name="q7" value="true" /> 正确</label><br/>
                  <label className="option"><input type="radio" name="q7" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>8. CSS 盒模型由内容、内边距、边框和外边距组成。（判断题）</p>
              <div className="options">
                  <label className="option"><input type="radio" name="q8" value="true" /> 正确</label><br/>
                  <label className="option"><input type="radio" name="q8" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>9. 在 HTML 中，哪个属性用于设置图片的替代文本？</p>
              <div className="options">
                <label className="option"><input type="radio" name="q9" value="a" /> alt</label><br/>
                <label className="option"><input type="radio" name="q9" value="b" /> title</label><br/>
                <label className="option"><input type="radio" name="q9" value="c" /> src</label><br/>
                <label className="option"><input type="radio" name="q9" value="d" /> href</label><br/>
              </div>
          </div>
          <div className="question">
              <p>10. 以下哪个 CSS 属性用于设置文本颜色？</p>
              <div className="options">
                <label className="option"><input type="radio" name="q10" value="a" /> color</label><br/>
                <label className="option"><input type="radio" name="q10" value="b" /> text-color</label><br/>
                <label className="option"><input type="radio" name="q10" value="c" /> font-color</label><br/>
                <label className="option"><input type="radio" name="q10" value="d" /> background</label><br/>
              </div>
          </div>
          <div className="question">
              <p>11. &lt;table&gt; 标签用于什么？</p>
              <div className="options">
                <label className="option"><input type="radio" name="q11" value="a" /> 插入视频</label><br/>
                <label className="option"><input type="radio" name="q11" value="b" /> 创建表格</label><br/>
                <label className="option"><input type="radio" name="q11" value="c" /> 创建段落</label><br/>
                <label className="option"><input type="radio" name="q11" value="d" /> 添加图片</label><br/>
              </div>
          </div>
          <div className="question">
              <p>12. 哪个属性可以让链接在新窗口打开？</p>
              <div className="options">
                <label className="option"><input type="radio" name="q12" value="a" /> target=&quot;_blank&quot;</label><br/>
                <label className="option"><input type="radio" name="q12" value="b" /> href=&quot;new&quot;</label><br/>
                <label className="option"><input type="radio" name="q12" value="c" /> open=&quot;new&quot;</label><br/>
                <label className="option"><input type="radio" name="q12" value="d" /> window=&quot;_new&quot;</label><br/>
              </div>
          </div>
          <div className="question">
              <p>13. CSS 中用于设置元素外边距的属性是？</p>
              <div className="options">
                <label className="option"><input type="radio" name="q13" value="a" /> padding</label><br/>
                <label className="option"><input type="radio" name="q13" value="b" /> border</label><br/>
                <label className="option"><input type="radio" name="q13" value="c" /> margin</label><br/>
                <label className="option"><input type="radio" name="q13" value="d" /> spacing</label><br/>
              </div>
          </div>
          <div className="question">
              <p>14. HTML5 中，&lt;section&gt; 标签可用于定义文档中的章节。（判断题）</p>
              <div className="options">
                <label className="option"><input type="radio" name="q14" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q14" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>15. 在 CSS 中，id 选择器使用“#”号来表示。（判断题）</p>
              <div className="options">
                <label className="option"><input type="radio" name="q15" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q15" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>16. 可以在 HTML 中直接写 CSS 样式，不需要引入外部文件。（判断题）</p>
              <div className="options">
                <label className="option"><input type="radio" name="q16" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q16" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>17. 所有 HTML 标签都必须成对出现。（判断题）</p>
              <div className="options">
                <label className="option"><input type="radio" name="q17" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q17" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>18. 外部 CSS 文件可以通过 &lt;link&gt; 标签引入。（判断题）</p>
              <div className="options">
                <label className="option"><input type="radio" name="q18" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q18" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>19. 哪个标签通常用于包含网页的主要内容？</p>
              <div className="options">
                <label className="option"><input type="radio" name="q19" value="a" /> &lt;main&gt;</label><br/>
                <label className="option"><input type="radio" name="q19" value="b" /> &lt;body&gt;</label><br/>
                <label className="option"><input type="radio" name="q19" value="c" /> &lt;div&gt;</label><br/>
                <label className="option"><input type="radio" name="q19" value="d" /> &lt;content&gt;</label><br/>
              </div>
          </div>
          <div className="question">
              <p>20. CSS 中设置字体加粗的属性是？</p>
              <div className="options">
                <label className="option"><input type="radio" name="q20" value="a" /> font-style</label><br/>
                <label className="option"><input type="radio" name="q20" value="b" /> font-weight</label><br/>
                <label className="option"><input type="radio" name="q20" value="c" /> text-bold</label><br/>
                <label className="option"><input type="radio" name="q20" value="d" /> bold</label><br/>
              </div>
          </div>
          <div className="question">
              <p>21. 在 HTML 中，哪个标签用于播放音频？</p>
              <div className="options">
                <label className="option"><input type="radio" name="q21" value="a" /> &lt;audio&gt;</label><br/>
                <label className="option"><input type="radio" name="q21" value="b" /> &lt;sound&gt;</label><br/>
                <label className="option"><input type="radio" name="q21" value="c" /> &lt;mp3&gt;</label><br/>
                <label className="option"><input type="radio" name="q21" value="d" /> &lt;media&gt;</label><br/>
              </div>
          </div>
          <div className="question">
              <p>22. 哪个属性可以用来合并单元格？</p>
              <div className="options">
                <label className="option"><input type="radio" name="q22" value="a" /> rowspan 和 colspan</label><br/>
                <label className="option"><input type="radio" name="q22" value="b" /> align 和 valign</label><br/>
                <label className="option"><input type="radio" name="q22" value="c" /> width 和 height</label><br/>
                <label className="option"><input type="radio" name="q22" value="d" /> cellspan 和 rowspan</label><br/>
              </div>
          </div>
          <div className="question">
              <p>23. 要让段落文字居中，应使用哪个 CSS 属性？</p>
              <div className="options">
                <label className="option"><input type="radio" name="q23" value="a" /> text-align: center</label><br/>
                <label className="option"><input type="radio" name="q23" value="b" /> align: center</label><br/>
                <label className="option"><input type="radio" name="q23" value="c" /> center: true</label><br/>
                <label className="option"><input type="radio" name="q23" value="d" /> text: center</label><br/>
              </div>
          </div>
          <div className="question">
              <p>24. 哪种方式可以添加外部 CSS 文件？</p>
              <div className="options">
                <label className="option"><input type="radio" name="q24" value="a" /> &lt;css src=&quot;style.css&quot;&gt;</label><br/>
                <label className="option"><input type="radio" name="q24" value="b" /> &lt;link rel=&quot;stylesheet&quot; href=&quot;style.css&quot;&gt;</label><br/>
                <label className="option"><input type="radio" name="q24" value="c" /> &lt;style href=&quot;style.css&quot;&gt;</label><br/>
                <label className="option"><input type="radio" name="q24" value="d" /> &lt;script src=&quot;style.css&quot;&gt;</label><br/>
              </div>
          </div>
          <div className="question">
              <p>25. 以下哪个 HTML 标签用于定义表单中的文本输入框？</p>
              <div className="options">
                <label className="option"><input type="radio" name="q25" value="a" /> &lt;input type=&quot;text&quot;&gt;</label><br/>
                <label className="option"><input type="radio" name="q25" value="b" /> &lt;text&gt;</label><br/>
                <label className="option"><input type="radio" name="q25" value="c" /> &lt;textarea&gt;</label><br/>
                <label className="option"><input type="radio" name="q25" value="d" /> &lt;forminput&gt;</label><br/>
              </div>
          </div>
          <div className="question">
              <p>26. 哪个属性用于为图像提供说明性文本？</p>
              <div className="options">
                <label className="option"><input type="radio" name="q26" value="a" /> title</label><br/>
                <label className="option"><input type="radio" name="q26" value="b" /> description</label><br/>
                <label className="option"><input type="radio" name="q26" value="c" /> alt</label><br/>
                <label className="option"><input type="radio" name="q26" value="d" /> desc</label><br/>
              </div>
          </div>
          <div className="question">
              <p>27. 在 HTML 中，&lt;form&gt; 标签的作用是？</p>
              <div className="options">
                <label className="option"><input type="radio" name="q27" value="a" /> 创建段落</label><br/>
                <label className="option"><input type="radio" name="q27" value="b" /> 创建超链接</label><br/>
                <label className="option"><input type="radio" name="q27" value="c" /> 创建输入表单</label><br/>
                <label className="option"><input type="radio" name="q27" value="d" /> 插入图片</label><br/>
              </div>
          </div>
          <div className="question">
              <p>28. 以下哪个 CSS 单位是相对于根元素字体大小的？</p>
              <div className="options">
                <label className="option"><input type="radio" name="q28" value="a" /> px</label><br/>
                <label className="option"><input type="radio" name="q28" value="b" /> em</label><br/>
                <label className="option"><input type="radio" name="q28" value="c" /> %</label><br/>
                <label className="option"><input type="radio" name="q28" value="d" /> rem</label><br/>
              </div>
          </div>
          <div className="question">
              <p>29. HTML 是一种什么类型的语言？</p>
              <div className="options">
                <label className="option"><input type="radio" name="q29" value="a" /> 编程语言</label><br/>
                <label className="option"><input type="radio" name="q29" value="b" /> 样式语言</label><br/>
                <label className="option"><input type="radio" name="q29" value="c" /> 标记语言</label><br/>
                <label className="option"><input type="radio" name="q29" value="d" /> 脚本语言</label><br/>
              </div>
          </div>
          <div className="question">
              <p>30. 以下哪个标签可以用来显示粗体文本？</p>
              <div className="options">
                <label className="option"><input type="radio" name="q30" value="a" /> &lt;i&gt;</label><br/>
                <label className="option"><input type="radio" name="q30" value="b" /> &lt;b&gt;</label><br/>
                <label className="option"><input type="radio" name="q30" value="c" /> &lt;strong&gt;</label><br/>
                <label className="option"><input type="radio" name="q30" value="d" /> &lt;bold&gt;</label><br/>
              </div>
          </div>
          <div className="question">
              <p>31. 判断题：CSS 的选择器不区分大小写。</p>
              <div className="options">
                <label className="option"><input type="radio" name="q31" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q31" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>32. 判断题：&lt;div&gt; 是一种内联元素。</p>
              <div className="options">
                <label className="option"><input type="radio" name="q32" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q32" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>33. 判断题：可以在一个 HTML 页面中使用多个 &lt;h1&gt; 标签。</p>
              <div className="options">
                <label className="option"><input type="radio" name="q33" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q33" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>34. 判断题：HTML 中的注释语法是 &lt;!-- 注释内容 --&gt;。</p>
              <div className="options">
                <label className="option"><input type="radio" name="q34" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q34" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>35. 判断题：标签 &lt;em&gt; 和 &lt;i&gt; 表示相同的视觉效果，但语义不同。</p>
              <div className="options">
                <label className="option"><input type="radio" name="q35" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q35" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>36. 判断题：CSS 的优先级规则中，id 选择器优先级高于类选择器。</p>
              <div className="options">
                <label className="option"><input type="radio" name="q36" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q36" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>37. 判断题：一个元素可以同时拥有多个类名（class）。</p>
              <div className="options">
                <label className="option"><input type="radio" name="q37" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q37" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>38. 判断题：&lt;title&gt; 标签只能出现在 &lt;head&gt; 标签中。</p>
              <div className="options">
                <label className="option"><input type="radio" name="q38" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q38" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>39. 判断题：margin 和 padding 是相同的属性，只是叫法不同。</p>
              <div className="options">
                <label className="option"><input type="radio" name="q39" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q39" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>40. 判断题：&lt;link&gt; 标签可以用于引入外部 JavaScript 文件。</p>
              <div className="options">
                <label className="option"><input type="radio" name="q40" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q40" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>41. 判断题：display: none 与 visibility: hidden 效果完全相同。</p>
              <div className="options">
                <label className="option"><input type="radio" name="q41" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q41" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>42. 在 CSS 中，设置元素为块级元素的 display 值是？</p>
              <div className="options">
                <label className="option"><input type="radio" name="q42" value="a" /> inline</label><br/>
                <label className="option"><input type="radio" name="q42" value="b" /> none</label><br/>
                <label className="option"><input type="radio" name="q42" value="c" /> block</label><br/>
                <label className="option"><input type="radio" name="q42" value="d" /> flex</label><br/>
              </div>
          </div>
          <div className="question">
              <p>43. 在 CSS 中，设置元素的内部间距使用哪个属性？</p>
              <div className="options">
                <label className="option"><input type="radio" name="q43" value="a" /> padding</label><br/>
                <label className="option"><input type="radio" name="q43" value="b" /> margin</label><br/>
                <label className="option"><input type="radio" name="q43" value="c" /> border</label><br/>
                <label className="option"><input type="radio" name="q43" value="d" /> spacing</label><br/>
              </div>
          </div>
          <div className="question">
              <p>44. 判断题：&lt;span&gt; 是一个块级元素。</p>
              <div className="options">
                <label className="option"><input type="radio" name="q44" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q44" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>45. 判断题：&lt;meta&gt; 标签常用于设置网页的字符编码。</p>
              <div className="options">
                <label className="option"><input type="radio" name="q45" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q45" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>46. 判断题：CSS 可以通过嵌入、外部引入或行内方式使用。</p>
              <div className="options">
                <label className="option"><input type="radio" name="q46" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q46" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>47. 以下哪个 CSS 属性用于设置文字的行高？</p>
              <div className="options">
                <label className="option"><input type="radio" name="q47" value="a" /> line-height</label><br/>
                <label className="option"><input type="radio" name="q47" value="b" /> text-height</label><br/>
                <label className="option"><input type="radio" name="q47" value="c" /> height</label><br/>
                <label className="option"><input type="radio" name="q47" value="d" /> letter-spacing</label><br/>
              </div>
          </div>
          <div className="question">
              <p>48. 判断题：&lt;a&gt; 标签可用于创建超链接。</p>
              <div className="options">
                <label className="option"><input type="radio" name="q48" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q48" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>49. 判断题：CSS 的 z-index 属性控制元素的层叠顺序。</p>
              <div className="options">
                <label className="option"><input type="radio" name="q49" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q49" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>50. 在 HTML 中，哪个标签用于添加下拉选择菜单？</p>
              <div className="options">
                <label className="option"><input type="radio" name="q50" value="a" /> &lt;select&gt;</label><br/>
                <label className="option"><input type="radio" name="q50" value="b" /> &lt;option&gt;</label><br/>
                <label className="option"><input type="radio" name="q50" value="c" /> &lt;dropdown&gt;</label><br/>
                <label className="option"><input type="radio" name="q50" value="d" /> &lt;menu&gt;</label><br/>
              </div>
          </div>
          <div className="question">
              <p>51. 判断题：HTML 页面中只应该有一个 &lt;h1&gt; 标签以保证良好的SEO和可访问性。</p>
              <div className="options">
                <label className="option"><input type="radio" name="q51" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q51" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>52. 判断题：使用 position: fixed 的元素会相对于浏览器窗口固定。</p>
              <div className="options">
                <label className="option"><input type="radio" name="q52" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q52" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>53. 在 CSS 中，哪个属性可用于隐藏元素但不移除其占位？</p>
              <div className="options">
                <label className="option"><input type="radio" name="q53" value="a" /> visibility: hidden</label><br/>
                <label className="option"><input type="radio" name="q53" value="b" /> display: none</label><br/>
                <label className="option"><input type="radio" name="q53" value="c" /> opacity: 0</label><br/>
                <label className="option"><input type="radio" name="q53" value="d" /> z-index: -1</label><br/>
              </div>
          </div>
          <div className="question">
              <p>54. 判断题：HTML5 引入了语义化标签，如 &lt;header&gt;、&lt;footer&gt;、&lt;article&gt;。</p>
              <div className="options">
                <label className="option"><input type="radio" name="q54" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q54" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>55. 判断题：CSS 属性 `overflow` 用于控制内容溢出时的显示方式。</p>
              <div className="options">
                <label className="option"><input type="radio" name="q55" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q55" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>56. 判断题：class 选择器可以使用多个空格分隔的类名。</p>
              <div className="options">
                <label className="option"><input type="radio" name="q56" value="true" /> 正确</label><br/>
                <label className="option"><input type="radio" name="q56" value="false" /> 错误</label><br/>
              </div>
          </div>
          <div className="question">
              <p>57. 以下哪个CSS选择器表示所有类名为&quot;active&quot;的元素？</p>
              <div className="options">
                <label><input type="radio" name="q57" value="a" /> #active</label><br/>
                <label><input type="radio" name="q57" value="b" /> .active</label><br/>
                <label><input type="radio" name="q57" value="c" /> active</label><br/>
                <label><input type="radio" name="q57" value="d" /> *active</label>
              </div>
          </div>
          <div className="question">
              <p>58. 下列关于HTML的说法，哪项是正确的？</p>
              <div className="options">
                  <label><input type="radio" name="q58" value="a" /> &lt;div&gt; 标签只能包含文本内容</label><br/>
                  <label><input type="radio" name="q58" value="b" /> &lt;span&gt; 是块级元素</label><br/>
                  <label><input type="radio" name="q58" value="c" /> 为了可访问性，&lt;img&gt; 标签应有 alt 属性</label><br/>
                  <label><input type="radio" name="q58" value="d" /> &lt;p&gt; 标签可以嵌套另一个 &lt;p&gt; 标签</label>
              </div>
          </div>
          <div className="question">
              <p>59. CSS中的&quot;盒模型&quot;包含哪几个部分？</p>
              <div className="options">
                <label><input type="radio" name="q59" value="a" /> 内容、内边距、边框、外边距</label><br/>
                <label><input type="radio" name="q59" value="b" /> 内容、字体、颜色、填充</label><br/>
                <label><input type="radio" name="q59" value="c" /> 边距、边框、颜色、字体</label><br/>
                <label><input type="radio" name="q59" value="d" /> 内容、边距、字体、背景</label>
              </div>
          </div>
          <div className="question">
              <p>60. 以下哪个属性可以用来控制元素的透明度？</p>
              <div className="options">
                <label><input type="radio" name="q60" value="a" /> opacity</label><br/>
                <label><input type="radio" name="q60" value="b" /> visibility</label><br/>
                <label><input type="radio" name="q60" value="c" /> display</label><br/>
                <label><input type="radio" name="q60" value="d" /> z-index</label>
              </div>
          </div>
          <div className="question">
              <p>61. 判断题：HTML中的&lt;br /&gt;标签是空元素，不需要闭合标签。</p>
              <div className="options">
                <label><input type="radio" name="q61" value="true" /> 正确</label><br/>
                <label><input type="radio" name="q61" value="false" /> 错误</label>
              </div>
          </div>
          <div className="question">
              <p>62. 下列CSS语句中，设置字体大小为16像素的正确写法是？</p>
              <div className="options">
                <label><input type="radio" name="q62" value="a" /> font-size: 16px;</label><br/>
                <label><input type="radio" name="q62" value="b" /> size: 16px;</label><br/>
                <label><input type="radio" name="q62" value="c" /> font: 16px;</label><br/>
                <label><input type="radio" name="q62" value="d" /> text-size: 16px;</label>
              </div>
          </div>
          <div className="question">
              <p>63. CSS中，如何选中所有段落元素（&lt;p&gt;）内部的链接（&lt;a&gt;）？</p>
              <div className="options">
                <label><input type="radio" name="q63" value="a" /> {'p a { ... }'}</label><br/>
                <label><input type="radio" name="q63" value="b" /> {'a p { ... }'}</label><br/>
                <label><input type="radio" name="q63" value="c" /> {'p > a { ... }'}</label><br/>
                <label><input type="radio" name="q63" value="d" /> {'a { ... }'}</label>
              </div>
          </div>
          <div className="question">
              <p>64. 以下哪些是HTML的语义化标签？（多选）</p>
              <div className="options">
                <label><input type="checkbox" name="q64" value="a" /> &lt;article&gt;</label><br/>
                <label><input type="checkbox" name="q64" value="b" /> &lt;div&gt;</label><br/>
                <label><input type="checkbox" name="q64" value="c" /> &lt;nav&gt;</label><br/>
                <label><input type="checkbox" name="q64" value="d" /> &lt;section&gt;</label><br/>
                <label><input type="checkbox" name="q64" value="e" /> &lt;span&gt;</label>
              </div>
          </div>
          <div className="question">
              <p>65. 以下哪些CSS属性用于设置盒模型中的外边距和内边距？（多选）</p>
              <div className="options">
                <label><input type="checkbox" name="q65" value="a" /> margin</label><br/>
                <label><input type="checkbox" name="q65" value="b" /> padding</label><br/>
                <label><input type="checkbox" name="q65" value="c" /> border</label><br/>
                <label><input type="checkbox" name="q65" value="d" /> outline</label><br/>
                <label><input type="checkbox" name="q65" value="e" /> spacing</label>
              </div>
          </div>
          <div className="question">
              <p>66. 以下哪些标签可以包含文本内容？（多选）</p>
              <div className="options">
                <label><input type="checkbox" name="q66" value="a" /> &lt;p&gt;</label><br/>
                <label><input type="checkbox" name="q66" value="b" /> &lt;img /&gt;</label><br/>
                <label><input type="checkbox" name="q66" value="c" /> &lt;span&gt;</label><br/>
                <label><input type="checkbox" name="q66" value="d" /> &lt;h1&gt;</label><br/>
                <label><input type="checkbox" name="q66" value="e" /> &lt;input /&gt;</label>
              </div>
          </div>
          <div className="question">
              <p>67. 下列哪些CSS属性可以用来控制字体的样式？（多选）</p>
              <div className="options">
                <label><input type="checkbox" name="q67" value="a" /> font-family</label><br/>
                <label><input type="checkbox" name="q67" value="b" /> font-size</label><br/>
                <label><input type="checkbox" name="q67" value="c" /> font-weight</label><br/>
                <label><input type="checkbox" name="q67" value="d" /> text-align</label><br/>
                <label><input type="checkbox" name="q67" value="e" /> line-height</label>
              </div>
          </div>
          <div className="question">
              <p>68. 以下哪些HTML标签是自闭合（void）元素？（多选）</p>
              <div className="options">
                <label><input type="checkbox" name="q68" value="a" /> &lt;img /&gt;</label><br/>
                <label><input type="checkbox" name="q68" value="b" /> &lt;br /&gt;</label><br/>
                <label><input type="checkbox" name="q68" value="c" /> &lt;input /&gt;</label><br/>
                <label><input type="checkbox" name="q68" value="d" /> &lt;div&gt;</label><br/>
                <label><input type="checkbox" name="q68" value="e" /> &lt;hr /&gt;</label>
              </div>
          </div>
          <div className="question">
              <p>69. 以下哪些CSS属性用于控制元素的定位和布局？（多选）</p>
              <div className="options">
                <label><input type="checkbox" name="q69" value="a" /> position</label><br/>
                <label><input type="checkbox" name="q69" value="b" /> float</label><br/>
                <label><input type="checkbox" name="q69" value="c" /> display</label><br/>
                <label><input type="checkbox" name="q69" value="d" /> top</label><br/>
                <label><input type="checkbox" name="q69" value="e" /> overflow</label>
              </div>
          </div>
          <div className="question">
              <p>70. 下列哪些标签用于创建表单控件？（多选）</p>
              <div className="options">
                <label><input type="checkbox" name="q70" value="a" /> &lt;input /&gt;</label><br/>
                <label><input type="checkbox" name="q70" value="b" /> &lt;textarea&gt;</label><br/>
                <label><input type="checkbox" name="q70" value="c" /> &lt;select&gt;</label><br/>
                <label><input type="checkbox" name="q70" value="d" /> &lt;button&gt;</label><br/>
                <label><input type="checkbox" name="q70" value="e" /> &lt;form&gt;</label>
              </div>
          </div>
          <div className="question">
              <p>71. 以下哪些是CSS伪类？（多选）</p>
              <div className="options">
                <label><input type="checkbox" name="q71" value="a" /> :hover</label><br/>
                <label><input type="checkbox" name="q71" value="b" /> :before</label><br/>
                <label><input type="checkbox" name="q71" value="c" /> ::after</label><br/>
                <label><input type="checkbox" name="q71" value="d" /> :active</label><br/>
                <label><input type="checkbox" name="q71" value="e" /> @media</label>
              </div>
          </div>
          <div className="question">
              <p>72. 以下哪些标签是HTML5新增的结构性标签？（多选）</p>
              <div className="options">
                <label><input type="checkbox" name="q72" value="a" /> &lt;section&gt;</label><br/>
                <label><input type="checkbox" name="q72" value="b" /> &lt;header&gt;</label><br/>
                <label><input type="checkbox" name="q72" value="c" /> &lt;footer&gt;</label><br/>
                <label><input type="checkbox" name="q72" value="d" /> &lt;article&gt;</label><br/>
                <label><input type="checkbox" name="q72" value="e" /> &lt;center&gt;</label>
              </div>
          </div>
          <div className="question">
              <p>73. 以下哪些CSS单位属于绝对单位？（多选）</p>
              <div className="options">
                <label><input type="checkbox" name="q73" value="a" /> px</label><br/>
                <label><input type="checkbox" name="q73" value="b" /> em</label><br/>
                <label><input type="checkbox" name="q73" value="c" /> rem</label><br/>
                <label><input type="checkbox" name="q73" value="d" /> pt</label><br/>
                <label><input type="checkbox" name="q73" value="e" /> %</label>
              </div>
          </div>
          <div className="question">
              <p>74. 在Flex布局中，哪个属性定义主轴的方向？</p>
              <div className="options">
                <label><input type="radio" name="q74" value="a" /> flex-direction</label><br/>
                <label><input type="radio" name="q74" value="b" /> justify-content</label><br/>
                <label><input type="radio" name="q74" value="c" /> align-items</label><br/>
                <label><input type="radio" name="q74" value="d" /> flex-wrap</label>
              </div>
          </div>
          <div className="question">
              <p>75. 下列哪些是flex容器的默认属性值？（多选）</p>
              <div className="options">
                <label><input type="checkbox" name="q75" value="a" /> flex-direction: row</label><br/>
                <label><input type="checkbox" name="q75" value="b" /> flex-wrap: nowrap</label><br/>
                <label><input type="checkbox" name="q75" value="c" /> justify-content: flex-start</label><br/>
                <label><input type="checkbox" name="q75" value="d" /> align-items: stretch</label>
              </div>
          </div>
          <div className="question">
              <p>76. 判断题：justify-content属性控制flex容器主轴上的对齐方式。</p>
              <div className="options">
                <label><input type="radio" name="q76" value="true" /> 正确</label><br/>
                <label><input type="radio" name="q76" value="false" /> 错误</label>
              </div>
          </div>
          <div className="question">
              <p>77. 控制flex子项是否换行的属性是？</p>
              <div className="options">
                <label><input type="radio" name="q77" value="a" /> flex-wrap</label><br/>
                <label><input type="radio" name="q77" value="b" /> flex-grow</label><br/>
                <label><input type="radio" name="q77" value="c" /> flex-shrink</label><br/>
                <label><input type="radio" name="q77" value="d" /> flex-basis</label>
              </div>
          </div>
          <div className="question">
              <p>78. 下列哪些属性会影响元素盒模型的尺寸？（多选）</p>
              <div className="options">
                <label><input type="checkbox" name="q78" value="a" /> width</label><br/>
                <label><input type="checkbox" name="q78" value="b" /> padding</label><br/>
                <label><input type="checkbox" name="q78" value="c" /> border-width</label><br/>
                <label><input type="checkbox" name="q78" value="d" /> margin</label>
              </div>
          </div>
          <div className="question">
              <p>79. 判断题：box-sizing: border-box使元素的width包含padding和border。</p>
              <div className="options">
                <label><input type="radio" name="q79" value="true" /> 正确</label><br/>
                <label><input type="radio" name="q79" value="false" /> 错误</label>
              </div>
          </div>
          <div className="question">
              <p>80. flex-grow属性的作用是？</p>
              <div className="options">
                <label><input type="radio" name="q80" value="a" /> 定义项目的放大比例</label><br/>
                <label><input type="radio" name="q80" value="b" /> 定义项目的缩小比例</label><br/>
                <label><input type="radio" name="q80" value="c" /> 定义项目的基础尺寸</label><br/>
                <label><input type="radio" name="q80" value="d" /> 定义主轴方向</label>
              </div>
          </div>
          <div className="question">
              <p>81. 以下哪些CSS属性用于控制元素的定位？（多选）</p>
              <div className="options">
                <label><input type="checkbox" name="q81" value="a" /> position</label><br/>
                <label><input type="checkbox" name="q81" value="b" /> top</label><br/>
                <label><input type="checkbox" name="q81" value="c" /> float</label><br/>
                <label><input type="checkbox" name="q81" value="d" /> z-index</label>
              </div>
          </div>
          <div className="question">
              <p>82. 判断题：relative定位元素会改变文档流中的位置。</p>
              <div className="options">
                <label><input type="radio" name="q82" value="true" /> 正确</label><br/>
                <label><input type="radio" name="q82" value="false" /> 错误</label>
              </div>
          </div>
          <div className="question">
              <p>83. 下列哪个属性是设置元素缩小比例的？</p>
              <div className="options">
                <label><input type="radio" name="q83" value="a" /> flex-shrink</label><br/>
                <label><input type="radio" name="q83" value="b" /> flex-grow</label><br/>
                <label><input type="radio" name="q83" value="c" /> flex-basis</label><br/>
                <label><input type="radio" name="q83" value="d" /> flex-wrap</label>
              </div>
          </div>
          <div className="question">
              <p>84. 哪个属性设置flex项目的初始主轴尺寸？</p>
              <div className="options">
                <label><input type="radio" name="q84" value="a" /> flex-basis</label><br/>
                <label><input type="radio" name="q84" value="b" /> flex-grow</label><br/>
                <label><input type="radio" name="q84" value="c" /> flex-shrink</label><br/>
                <label><input type="radio" name="q84" value="d" /> flex-wrap</label>
              </div>
          </div>
          <div className="question">
              <p>85. 判断题：display: flex使元素变为块级伸缩容器。 </p>
              <div className="options">
                <label><input type="radio" name="q85" value="true" /> 正确</label><br/>
                <label><input type="radio" name="q85" value="false" /> 错误</label>
              </div>
          </div>
          <div className="question">
              <p>86. 在CSS中，哪个属性设置文本换行方式？</p>
              <div className="options">
                <label><input type="radio" name="q86" value="a" /> word-wrap</label><br/>
                <label><input type="radio" name="q86" value="b" /> white-space</label><br/>
                <label><input type="radio" name="q86" value="c" /> text-overflow</label><br/>
                <label><input type="radio" name="q86" value="d" /> overflow-wrap</label>
              </div>
          </div>
          <div className="question">
              <p>87. 以下哪些属性是影响元素层叠上下文的条件？（多选）</p>
              <div className="options">
                <label><input type="checkbox" name="q87" value="a" /> position: relative + z-index 不为 auto</label><br/>
                <label><input type="checkbox" name="q87" value="b" /> opacity 小于 1</label><br/>
                <label><input type="checkbox" name="q87" value="c" /> transform 不为 none</label><br/>
                <label><input type="checkbox" name="q87" value="d" /> float 不为 none</label>
              </div>
          </div>
          <div className="question">
              <p>88. 判断题：CSS中的margin合并只会发生在垂直方向的相邻块元素之间。 </p>
              <div className="options">
                <label><input type="radio" name="q88" value="true" /> 正确</label><br/>
                <label><input type="radio" name="q88" value="false" /> 错误</label>
              </div>
          </div>
          <div className="question">
              <p>89. 下面哪个CSS属性不能直接控制元素透明度？</p>
              <div className="options">
                <label><input type="radio" name="q89" value="a" /> opacity</label><br/>
                <label><input type="radio" name="q89" value="b" /> filter: alpha(opacity=50)</label><br/>
                <label><input type="radio" name="q89" value="c" /> visibility</label><br/>
                <label><input type="radio" name="q89" value="d" /> rgba颜色通道</label>
              </div>
          </div>
          <div className="question">
              <p>90. 多选题：以下哪些CSS属性会导致元素生成新的层叠上下文？（多选）</p>
              <div className="options">
                <label><input type="checkbox" name="q90" value="a" /> position: fixed</label><br/>
                <label><input type="checkbox" name="q90" value="b" /> opacity: 0.99</label><br/>
                <label><input type="checkbox" name="q90" value="c" /> transform: translate(0,0)</label><br/>
                <label><input type="checkbox" name="q90" value="d" /> z-index: 0（在非static定位下）</label>
              </div>
          </div>
          <div className="question">
              <p>91. 判断题：overflow: hidden会截断超出容器的内容，且可能创建块级格式化上下文。</p>
              <div className="options">
                <label><input type="radio" name="q91" value="true" /> 正确</label><br/>
                <label><input type="radio" name="q91" value="false" /> 错误</label>
              </div>
          </div>
          <div className="question">
              <p>92. flex布局中，如何让某个flex项目占据剩余空间？</p>
              <div className="options">
                <label><input type="radio" name="q92" value="a" /> 设置flex-grow为1</label><br/>
                <label><input type="radio" name="q92" value="b" /> 设置flex-shrink为1</label><br/>
                <label><input type="radio" name="q92" value="c" /> 设置flex-basis为auto</label><br/>
                <label><input type="radio" name="q92" value="d" /> 设置flex-wrap为wrap</label>
              </div>
          </div>
          <div className="question">
              <p>93. 判断题：使用绝对定位（position: absolute）的元素脱离文档流，不占据空间。</p>
              <div className="options">
                <label><input type="radio" name="q93" value="true" /> 正确</label><br/>
                <label><input type="radio" name="q93" value="false" /> 错误</label>
              </div>
          </div>
           <div className="question">
              <p>94. 使用哪个标签可以嵌入 JavaScript 代码？</p>
              <div className="options">
                <label><input type="radio" name="q94" value="a" /> &lt;script&gt;</label><br/>
                <label><input type="radio" name="q94" value="b" /> &lt;code&gt;</label><br/>
                <label><input type="radio" name="q94" value="c" /> &lt;javascript&gt;</label><br/>
                <label><input type="radio" name="q94" value="d" /> &lt;js&gt;</label><br/>
              </div>
          </div>
          <div className="question">
              <p>95. 以下哪个标签用于创建表单？</p>
              <div className="options">
                  <label><input type="radio" name="q95" value="a" /> &lt;input /&gt;</label><br />
                  <label><input type="radio" name="q95" value="b" /> &lt;form&gt;</label><br />
                  <label><input type="radio" name="q95" value="c" /> &lt;button&gt;</label><br />
                  <label><input type="radio" name="q95" value="d" /> &lt;label&gt;</label>
              </div>
          </div>
          <div className="question">
              <p>96. 判断题：HTML5中，&lt;section&gt;标签用于定义文档中的独立区域或章节。</p>
              <div className="options">
                  <label><input type="radio" name="q96" value="true" /> 正确</label><br />
                  <label><input type="radio" name="q96" value="false" /> 错误</label>
              </div>
          </div>
          <div className="question">
              <p>97. 判断题：&lt;a&gt; 标签的 href 属性是必需的，才能使其成为功能性链接。</p>
              <div className="options">
                  <label><input type="radio" name="q97" value="true" /> 正确</label><br />
                  <label><input type="radio" name="q97" value="false" /> 错误</label>
              </div>
          </div>
          <div className="question">
              <p>98. CSS 伪元素 `::before` 和 `::after` 创建的元素是？</p>
              <div className="options">
                  <label><input type="radio" name="q98" value="a" /> 块级元素</label><br />
                  <label><input type="radio" name="q98" value="b" /> 行内块元素</label><br />
                  <label><input type="radio" name="q98" value="c" /> 行内元素</label><br />
                  <label><input type="radio" name="q98" value="d" /> 弹性元素</label>
              </div>
          </div>
          <div className="question">
              <p>99. 在CSS中，如何选择所有`p`元素的第一个字母？</p>
              <div className="options">
                  <label><input type="radio" name="q99" value="a" /> p::first-letter</label><br />
                  <label><input type="radio" name="q99" value="b" /> p:first-letter</label><br />
                  <label><input type="radio" name="q99" value="c" /> p::first</label><br />
                  <label><input type="radio" name="q99" value="d" /> p:letter</label>
              </div>
          </div>
          <div className="question">
              <p>100. Grid 布局中，`grid-template-columns` 属性的作用是？</p>
              <div className="options">
                  <label><input type="radio" name="q100" value="a" /> 定义网格的行</label><br />
                  <label><input type="radio" name="q100" value="b" /> 定义网格的区域</label><br />
                  <label><input type="radio" name="q100" value="c" /> 定义网格的列</label><br />
                  <label><input type="radio" name="q100" value="d" /> 定义网格的间隙</label>
              </div>
          </div>
          <div className="question">
              <p>101. 以下哪个CSS属性可以实现文本溢出时显示省略号？</p>
              <div className="options">
                  <label><input type="radio" name="q101" value="a" /> overflow: ellipsis</label><br />
                  <label><input type="radio" name="q101" value="b" /> text-wrap: ellipsis</label><br />
                  <label><input type="radio" name="q101" value="c" /> text-overflow: ellipsis</label><br />
                  <label><input type="radio" name="q101" value="d" /> overflow-text: ellipsis</label>
              </div>
          </div>

          <button type="submit">提交答案</button>
        </form>
        {result && <div id="result" dangerouslySetInnerHTML={{ __html: result }} />}
      </div>
    </>
  );
};

export default ScalePage;