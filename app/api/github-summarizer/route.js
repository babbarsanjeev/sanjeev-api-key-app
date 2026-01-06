import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';
import { summarizeGithubReadme } from '@/lib/chain';

// POST - Validate API key and summarize GitHub repo
export async function POST(request) {
  try {
    const body = await request.json();
    const { repo_url } = body;
    
    // Get API key from header (case-insensitive)
    const key = request.headers.get('x-api-key') || request.headers.get('X-API-Key') || request.headers.get('X-Api-Key');
    
    // Debug: Log all headers
    console.log('Headers received:', Object.fromEntries(request.headers.entries()));
    console.log('API Key received:', key);

    // Validate API key is provided
    if (!key || !key.trim()) {
      return NextResponse.json({ valid: false, error: 'API key is required', debug: 'No x-api-key header found' }, { status: 400 });
    }

    // Validate repo_url is provided
    if (!repo_url || !repo_url.trim()) {
      return NextResponse.json({ valid: false, error: 'repo_url is required' }, { status: 400 });
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

    // Key is valid - increment usage
    const { error: updateError } = await supabase
      .from('api_keys')
      .update({ usage: (data.usage || 0) + 1 })
      .eq('id', data.id);

    if (updateError) {
      console.error('Error updating usage:', updateError);
    }

    // Now proceed with GitHub summarization
    // Extract owner and repo from GitHub URL
    const githubRegex = /(?:https?:\/\/)?github\.com\/([^\/]+)\/([^\/]+)/;
    const match = repo_url.match(githubRegex);

    if (!match) {
      return NextResponse.json(
        { error: 'Invalid GitHub URL format. Use: https://github.com/owner/repo' },
        { status: 400 }
      );
    }

    const owner = match[1];
    const repo = match[2].replace('.git', '');

    // Fetch repository data from GitHub API
    const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Sanjeev-API-Key-App'
      }
    });

    if (!repoResponse.ok) {
      return NextResponse.json(
        { error: `GitHub repository not found: ${owner}/${repo}` },
        { status: 404 }
      );
    }

    const repoData = await repoResponse.json();

    // Fetch README content
    const readmeContent = await getReadmeContent(repo_url);

    // Use LangChain to summarize the README
    let aiSummary = null;
    if (readmeContent) {
      try {
        aiSummary = await summarizeGithubReadme(readmeContent);
      } catch (aiError) {
        console.error('Error generating AI summary:', aiError);
        aiSummary = { summary: 'AI summary unavailable', cool_facts: [] };
      }
    }

    // Return successful response with repo summary
    return NextResponse.json({ 
      valid: true, 
      message: 'API key validated successfully',
      keyName: data.name,
      repository: repoData.full_name,
      summary: {
        description: repoData.description || 'No description available',
        language: repoData.language,
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        open_issues: repoData.open_issues_count,
        created_at: repoData.created_at,
        updated_at: repoData.updated_at,
        topics: repoData.topics || [],
        license: repoData.license?.name || 'Not specified',
        homepage: repoData.homepage || null
      },
      ai_summary: aiSummary?.summary || 'README not available for AI summary',
      cool_facts: aiSummary?.cool_facts || []
    });

  } catch (error) {
    console.error('Error in github-summarizer:', error);
    return NextResponse.json({ valid: false, error: 'Failed to process request' }, { status: 500 });
  }
}

/**
 * Fetches the content of README.md from a given GitHub repository URL.
 * @param {string} repo_url - The URL of the GitHub repository
 * @returns {Promise<string|null>} - The markdown content of the README file, or null if not found.
 */
async function getReadmeContent(repo_url) {
  try {
    // Parse owner and repo from the repo_url
    const match = repo_url.match(/github\.com\/([^\/]+)\/([^\/]+)(\.git)?/);
    if (!match) return null;
    const owner = match[1];
    const repo = match[2].replace(/\.git$/, '');

    // Use GitHub API to get README
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;

    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3.raw',
        'User-Agent': 'Sanjeev-API-Key-App'
      }
    });

    if (!response.ok) {
      return null;
    }

    const readmeContent = await response.text();
    return readmeContent;
  } catch (error) {
    console.error('Error fetching README:', error);
    return null;
  }
}
