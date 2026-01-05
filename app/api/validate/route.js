import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

// POST - Validate an API key
export async function POST(request) {
  try {
    const body = await request.json();
    const { key } = body;

    if (!key || !key.trim()) {
      return NextResponse.json({ valid: false, error: 'API key is required' }, { status: 400 });
    }

    // Look up the API key in the database
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('key', key.trim())
      .single();

    if (error || !data) {
      return NextResponse.json({ valid: false, error: 'Invalid API Key' }, { status: 401 });
    }

    // Check if the key has usage limits and if they've been exceeded
    if (data.limit_value && data.usage >= data.limit_value) {
      return NextResponse.json({ 
        valid: false, 
        error: 'API key usage limit exceeded' 
      }, { status: 403 });
    }

    // Key is valid - optionally increment usage
    const { error: updateError } = await supabase
      .from('api_keys')
      .update({ usage: (data.usage || 0) + 1 })
      .eq('id', data.id);

    if (updateError) {
      console.error('Error updating usage:', updateError);
    }

    return NextResponse.json({ 
      valid: true, 
      message: 'valid api key, /protected can be accessed',
      keyName: data.name 
    });
  } catch (error) {
    console.error('Error validating API key:', error);
    return NextResponse.json({ valid: false, error: 'Failed to validate API key' }, { status: 500 });
  }
}

