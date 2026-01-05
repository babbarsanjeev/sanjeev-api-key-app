import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

// GET - Fetch a single API key
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return NextResponse.json({ error: 'API key not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching API key:', error);
    return NextResponse.json({ error: 'Failed to fetch API key' }, { status: 500 });
  }
}

// PUT - Update an API key
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, limit } = body;

    const updateData = {};
    if (name) updateData.name = name.trim();
    if (limit !== undefined) updateData.limit_value = limit || null;

    const { data, error } = await supabase
      .from('api_keys')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating API key:', error);
    return NextResponse.json({ error: 'Failed to update API key' }, { status: 500 });
  }
}

// DELETE - Delete an API key
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ message: 'API key deleted successfully' });
  } catch (error) {
    console.error('Error deleting API key:', error);
    return NextResponse.json({ error: 'Failed to delete API key' }, { status: 500 });
  }
}

