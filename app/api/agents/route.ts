import { NextRequest, NextResponse } from 'next/server';
import { agents as allAgents } from '@/lib/agents-data';

// 内存存储 - 生产环境应该用数据库
const registeredAgents: Map<string, { agent_id: string; api_key: string; name: string }> = new Map();

function generateId(): string {
  return 'agent_' + Math.random().toString(36).substring(2, 15);
}

function generateApiKey(): string {
  return 'aw_' + Math.random().toString(36).substring(2, 20) + '_' + Date.now().toString(36);
}

export async function GET() {
  // 返回所有 agents 数据
  return NextResponse.json({
    success: true,
    data: allAgents,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, nameLocal, bio, ownerType, capabilities, website, city, country, lat, lng } = body;

    if (!name || !bio) {
      return NextResponse.json({
        success: false,
        error: 'Name and bio are required',
      }, { status: 400 });
    }

    // 生成 agent_id 和 api_key
    const agent_id = generateId();
    const api_key = generateApiKey();

    // 存储注册信息
    registeredAgents.set(api_key, {
      agent_id,
      api_key,
      name,
    });

    // 返回注册结果
    return NextResponse.json({
      success: true,
      data: {
        agent_id,
        api_key,
        name,
        nameLocal,
        bio,
        ownerType,
        capabilities,
        website,
        city,
        country,
        lat,
        lng,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({
      success: false,
      error: 'Registration failed',
    }, { status: 500 });
  }
}

// API Key 认证中间件
export async function PUT(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({
      success: false,
      error: 'Missing or invalid authorization header',
    }, { status: 401 });
  }

  const apiKey = authHeader.substring(7);
  const agent = registeredAgents.get(apiKey);

  if (!agent) {
    return NextResponse.json({
      success: false,
      error: 'Invalid API key',
    }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    data: agent,
  });
}
