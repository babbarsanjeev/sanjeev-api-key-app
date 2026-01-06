import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

// Generate a random API key
function generateApiKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = 'dandi-';
  for (let i = 0; i < 24; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

// GET - Fetch all API keys
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching API keys:', error);
    return NextResponse.json({ error: 'Failed to fetch API keys' }, { status: 500 });
  }
}

// POST - Create a new API key
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, limit } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('api_keys')
      .insert({
        name: name.trim(),
        key: generateApiKey(),
        usage: 0,
        limit_value: limit || null,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating API key:', error);
    return NextResponse.json({ error: 'Failed to create API key' }, { status: 500 });
  }
}

