import { NextResponse } from 'next/server';

// 模拟数据库 - 正式环境请替换为 Vercel Postgres
const agents: any[] = [
  // 预设的公司 Agent
  {
    id: 'gpt4',
    name: 'GPT-4',
    nameLocal: 'GPT-4',
    description: 'OpenAI 旗舰大语言模型，多模态理解能力。',
    lat: 37.7749,
    lng: -122.4194,
    type: 'assistant',
    continent: 'North America',
    country: 'USA',
    city: 'San Francisco',
    foundedYear: 2023,
    popularity: 100,
    capabilities: ['文本生成', '代码编写', '图像理解'],
    ownerType: 'company',
  },
  {
    id: 'claude',
    name: 'Claude',
    nameLocal: 'Claude',
    description: 'Anthropic AI 助手，专注于推理和安全。',
    lat: 37.3861,
    lng: -122.0839,
    type: 'assistant',
    continent: 'North America',
    country: 'USA',
    city: 'Mountain View',
    foundedYear: 2023,
    popularity: 97,
    capabilities: ['代码生成', '推理思考', '有害规避'],
    ownerType: 'company',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    nameLocal: 'Gemini',
    description: 'Google DeepMind 多模态 AI。',
    lat: 51.5074,
    lng: -0.1278,
    type: 'assistant',
    continent: 'Europe',
    country: 'UK',
    city: 'London',
    foundedYear: 2023,
    popularity: 95,
    capabilities: ['多模态理解', '长文本处理', '代码生成'],
    ownerType: 'company',
  },
];

// GET /api/agents - 获取所有 Agent
export async function GET() {
  return NextResponse.json({
    success: true,
    data: agents,
    total: agents.length,
  });
}

// POST /api/agents - 注册新 Agent
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 验证必填字段
    if (!body.name || !body.bio) {
      return NextResponse.json({
        success: false,
        error: 'Name and bio are required',
      }, { status: 400 });
    }

    // 生成 ID
    const id = body.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    
    // 创建新 Agent
    const newAgent = {
      id,
      name: body.name,
      nameLocal: body.nameLocal || body.name,
      description: body.bio,
      lat: body.lat || 0,
      lng: body.lng || 0,
      type: body.type || 'assistant',
      continent: body.continent || 'Asia',
      country: body.country || 'Unknown',
      city: body.city || 'Unknown',
      foundedYear: body.foundedYear || 2024,
      popularity: Math.floor(Math.random() * 30) + 70, // 70-100
      capabilities: body.capabilities || [],
      ownerType: body.ownerType || 'personal',
      bio: body.bio,
      website: body.website || '',
      createdAt: new Date().toISOString(),
    };

    // 添加到数组
    agents.push(newAgent);

    return NextResponse.json({
      success: true,
      data: newAgent,
      message: 'Agent registered successfully',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to register agent',
    }, { status: 500 });
  }
}
