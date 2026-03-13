import { NextResponse } from 'next/server';
import { agents as allAgents } from '@/lib/agents-data';

export async function GET() {
  // 返回所有 agents 数据
  return NextResponse.json({
    success: true,
    data: allAgents,
  });
}
