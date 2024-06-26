// app/api/proxy/route.tsx
import {NextRequest, NextResponse} from "next/server";

export async function GET(
  req: NextRequest,
) {
  // 提取请求参数
  const param = req.nextUrl.searchParams;
  const url = param.get('url');
  if (!url) {
    return NextResponse.json({ error: 'Missing URL parameter' }, { status: 400 });
  }

  // 代理请求
  try {
    const response = await fetch(url);
    // 检查响应是否成功
    if (!response.ok) {
      // 如果响应失败，返回错误信息
      return NextResponse.json({ error: `Request failed with status ${response.status}` }, { status: response.status });
    }

    // 将响应转换为文本
    const text = await response.text();

    // 返回响应内容
    return NextResponse.json(text);
  } catch (error) {
    /// 如果请求失败，返回错误信息
    if (error instanceof Error) {
      return NextResponse.json({ error: `Request failed: ${error.message}` }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Request failed' }, { status: 500 });
    }
  }


}