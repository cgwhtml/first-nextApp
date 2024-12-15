import React from 'react';

interface IProps {
  altTxt: string;
  content: string;
  bgColor?: {
    from: string;
    via: string;
    to: string;
  };
}

export default function Hero(props: IProps) {
  // 默认颜色配置
  const defaultColors = {
    from: 'from-blue-600',
    via: 'via-purple-600',
    to: 'to-blue-700'
  };

  // 使用传入的颜色或默认颜色
  const colors = props.bgColor || defaultColors;
  
  return (
    <div className="h-screen relative">
      <div className="absolute inset-0 -z-10">
        {/* 渐变背景层 */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.from} ${colors.via} ${colors.to} opacity-85`} />
        
        {/* 网格纹理层 */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        {/* 暗色渐变叠加 */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50" />
      </div>
      
      {/* 内容层 */}
      <div className="flex justify-center pt-48">
        <h1 className="text-white text-6xl font-bold">
          {props.content}
        </h1>
      </div>
    </div>
  );
}
