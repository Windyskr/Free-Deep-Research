import { z } from 'zod';
import { OpenAI } from 'openai';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const openai = new OpenAI({
  baseURL: process.env.OPENAI_BASE_URL,
  apiKey: process.env.OPENAI_API_KEY,
});

const chatCompletionSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string(),
    })
  ),
  temperature: z.number().optional().default(0.6),
});

function createResponse(body: any, status = 200, additionalHeaders = {}) {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...additionalHeaders,
    },
  });
}

function handleCorsPreflightRequest() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

function createStreamResponse(stream: any) {
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          // console.log('收到 API 响应块:', JSON.stringify(chunk));
          const content = chunk.choices[0]?.delta?.content || '';
          const reasoningContent = chunk.choices[0]?.delta?.reasoning_content || '';

          if (content || reasoningContent) {
            const response = {
              choices: [{
                delta: {
                  content: content,
                  reasoning_content: reasoningContent
                }
              }]
            };

            // console.log('发送给前端的响应:', JSON.stringify(response));
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(response)}\n\n`));
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (error) {
        console.error('流处理错误:', error);
        controller.error(error);
      }
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request: Request) {
  request.headers.delete('accept-encoding');
  // console.log('开始处理聊天请求');

  try {
    const json = await request.clone().json();
    // console.log('请求数据:', JSON.stringify(json));
    
    const result = chatCompletionSchema.safeParse(json);

    if (!result.success) {
      console.error('数据验证失败:', result.error.message);
      return createResponse(JSON.stringify({ error: result.error.message }));
    }

    const { messages, temperature } = result.data;
    // console.log('开始调用 OpenAI API, 消息数量:', messages.length);

    const res = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL as string,
      messages: messages,
      stream: true,
      temperature,
    });

    // console.log('OpenAI API 调用成功，开始流式传输响应');
    return createStreamResponse(res);
  } catch (error: any) {
    console.error('处理请求时发生错误:', error.message);
    return createResponse(JSON.stringify({ error: error.message }));
  }
}

export async function OPTIONS() {
  return handleCorsPreflightRequest();
}
