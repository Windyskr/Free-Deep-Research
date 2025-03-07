export const runtime = 'edge';

interface SearchResult {
  query: string;
  results: {
    url: string;
    title: string;
    content: string;
  }[];
}

interface TavilyApiResponse {
  results: Array<{
    url: string;
    title: string;
    content: string;
    [key: string]: any;
  }>;
}

/**
 * Searches for information using the Tavily API
 */
async function tavilySearch(
  key: string,
  q: string
): Promise<SearchResult> {
  const url = 'https://api.tavily.com/search';

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        query: q,
        time_range: 'year',
        include_answer: 'advanced',
      }),
    });

    if (!res.ok) {
      throw new Error(`Tavily API error: ${res.status} ${res.statusText}`);
    }

    const json = (await res.json()) as TavilyApiResponse;

    return {
      query: q,
      results: json.results.map((item) => ({
        url: item.url,
        title: item.title,
        content: item.content,
      })),
    };
  } catch (error) {
    console.error('Tavily search error:', error);
    throw error;
  }
}

/**
 * GET handler for search functionality
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    if (!q) {
      return Response.json(
        { error: 'Missing query parameter' },
        { status: 400 }
      );
    }

    const TAVILY_KEY = process.env.TAVILY_KEY;
    
    if (!TAVILY_KEY) {
      return Response.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const data = await tavilySearch(TAVILY_KEY, q);
    
    return Response.json(data);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    return Response.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
