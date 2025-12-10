import type { Meta, StoryObj } from '@storybook/react';
import { useState, useCallback, useEffect, useRef } from 'react';
import { DataGrid } from '../../DataGrid';
import type { ColumnDef } from '../../types';
import '../../index.css';

// Potter DB API Types
interface Character {
  slug: string;
  name: string;
  born: string | null;
  died: string | null;
  gender: string | null;
  species: string | null;
  bloodStatus: string | null;
  house: string | null;
}

interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
  totalCount?: number;
}

interface CharactersResponse {
  data: {
    characters: {
      edges: Array<{
        node: Character;
        cursor: string;
      }>;
      pageInfo: PageInfo;
      totalCount?: number;
    };
  };
}

// GraphQL query function
const fetchCharacters = async (
  pageSize: number,
  cursor?: string
): Promise<CharactersResponse> => {
  const query = `
    query GetCharacters($first: Int!, $after: String) {
      characters(first: $first, after: $after) {
        edges {
          node {
            slug
            name
            born
            died
            gender
            species
            bloodStatus
            house
          }
          cursor
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        totalCount
      }
    }
  `;

  const response = await fetch("/api/potterdb/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        first: pageSize,
        after: cursor,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

// Column definitions
const characterColumns: ColumnDef<Character>[] = [
  {
    id: 'name',
    key: 'name',
    header: 'Name',
    width: 250,
    enableSorting: true,
    render: (row) => row.name || 'N/A',
  },
  {
    id: 'house',
    key: 'house',
    header: 'House',
    width: 150,
    enableSorting: true,
    enableGrouping: true,
    render: (row) => row.house || 'Unknown',
  },
  {
    id: 'species',
    key: 'species',
    header: 'Species',
    width: 150,
    render: (row) => row.species || 'Unknown',
  },
  {
    id: 'gender',
    key: 'gender',
    header: 'Gender',
    width: 120,
    render: (row) => row.gender || 'Unknown',
  },
  {
    id: 'bloodStatus',
    key: 'bloodStatus',
    header: 'Blood Status',
    width: 150,
    render: (row) => row.bloodStatus || 'Unknown',
  },
  {
    id: 'born',
    key: 'born',
    header: 'Born',
    width: 150,
    render: (row) => row.born || 'Unknown',
  },
];

const meta: Meta<typeof DataGrid> = {
  title: 'Examples/Server Pagination (Potter DB)',
  component: DataGrid,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{
        padding: '2rem',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f3f0 0%, #e8e5e0 100%)',
      }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

export const PotterDBPagination: Story = {
  render: () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [isLoading, setIsLoading] = useState(false);
    const [cursors, setCursors] = useState<(string | undefined)[]>([undefined]);
    const [totalCount, setTotalCount] = useState<number>(0);

    const cursorsRef = useRef(cursors);
    cursorsRef.current = cursors;
    const hasLoadedInitialRef = useRef(false);

    const loadPage = useCallback(async (page: number) => {
      setIsLoading(true);
      try {
        const cursor = cursorsRef.current[page];
        const response = await fetchCharacters(pageSize, cursor);
        const edges = response.data.characters.edges;

        setCharacters(edges.map(edge => edge.node));

        // Store the total count if available
        if (response.data.characters.totalCount) {
          setTotalCount(response.data.characters.totalCount);
        }

        // Store the next cursor if we haven't seen it
        if (response.data.characters.pageInfo.endCursor && !cursorsRef.current[page + 1]) {
          setCursors(prev => [...prev, response.data.characters.pageInfo.endCursor ?? undefined]);
        }
      } catch (error) {
        console.error("Failed to fetch characters:", error);
      } finally {
        setIsLoading(false);
      }
    }, [pageSize]);

    // Load initial data
    useEffect(() => {
      if (!hasLoadedInitialRef.current) {
        hasLoadedInitialRef.current = true;
        loadPage(0);
      }
    }, []);

    const handlePageChange = useCallback((newPage: number) => {
      setPageIndex(newPage);
      loadPage(newPage);
    }, [loadPage]);

    return (
      <div>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">🪄 Potter DB - Server Pagination</h3>
          <p className="font-ui text-sm text-gray-600 mb-2">
            Real-time data from the Potter DB GraphQL API with server-side pagination.
          </p>
          <div className="font-ui text-xs text-gray-500 space-y-1">
            <p>• Data is fetched from the server for each page change</p>
            <p>• Uses cursor-based pagination with GraphQL</p>
            <p>• Supports sorting and grouping on client-side after fetch</p>
            {isLoading && <p className="text-copper font-semibold">⏳ Loading...</p>}
          </div>
        </div>
        <div style={{ height: '600px' }}>
          <DataGrid
          gridId="potter-db-pagination"
          columns={characterColumns}
          data={characters}
          getRowId={(row) => row.slug}
          isLoading={isLoading}
          loadingMessage="Fetching magical data from Potter DB..."
          emptyMessage="No characters found"
          pagination={{
            pageIndex,
            pageSize,
            totalRows: totalCount,
            manualPagination: true,
            onPageChange: handlePageChange,
            onPageSizeChange: (newSize) => {
              setPageSize(newSize);
              setPageIndex(0);
              setCursors([undefined]);
              loadPage(0);
            },
            pageSizeOptions: [10, 20, 50],
          }}
          enableSorting
          enableColumnResize
          />
        </div>
      </div>
    );
  },
};

export const PotterDBWithGrouping: Story = {
  render: () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [characters, setCharacters] = useState<Character[]>([]);
    const [allCharacters, setAllCharacters] = useState<Character[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingAll, setIsLoadingAll] = useState(false);
    const [loadedAll, setLoadedAll] = useState(false);
    const [groupingEnabled, setGroupingEnabled] = useState(false);
    const [cursors, setCursors] = useState<(string | undefined)[]>([undefined]);
    const [totalCount, setTotalCount] = useState<number>(0);

    const cursorsRef = useRef(cursors);
    cursorsRef.current = cursors;
    const hasLoadedInitialRef = useRef(false);

    // Load single page
    const loadPage = useCallback(async (page: number) => {
      setIsLoading(true);
      try {
        const cursor = cursorsRef.current[page];
        const response = await fetchCharacters(pageSize, cursor);
        const edges = response.data.characters.edges;

        setCharacters(edges.map(edge => edge.node));

        if (response.data.characters.totalCount) {
          setTotalCount(response.data.characters.totalCount);
        }

        if (response.data.characters.pageInfo.endCursor && !cursorsRef.current[page + 1]) {
          setCursors(prev => [...prev, response.data.characters.pageInfo.endCursor ?? undefined]);
        }
      } catch (error) {
        console.error("Failed to fetch characters:", error);
      } finally {
        setIsLoading(false);
      }
    }, [pageSize]);

    // Load ALL characters for grouping
    const fetchAllCharacters = useCallback(async () => {
      setIsLoadingAll(true);
      let allData: Character[] = [];
      let cursor: string | undefined = undefined;
      let fetchCount = 0;
      const maxFetches = 20; // Safety limit

      try {
        while (fetchCount < maxFetches) {
          const response = await fetchCharacters(50, cursor);
          const edges = response.data.characters.edges;
          allData = [...allData, ...edges.map(e => e.node)];

          fetchCount++;

          if (!response.data.characters.pageInfo.hasNextPage) {
            break;
          }

          cursor = response.data.characters.pageInfo.endCursor ?? undefined;
        }

        setAllCharacters(allData);
        setTotalCount(allData.length);
        setLoadedAll(true);
        setGroupingEnabled(true);
      } catch (error) {
        console.error("Failed to fetch all characters:", error);
      } finally {
        setIsLoadingAll(false);
      }
    }, []);

    // Load initial page
    useEffect(() => {
      if (!hasLoadedInitialRef.current && !groupingEnabled) {
        hasLoadedInitialRef.current = true;
        loadPage(0);
      }
    }, [groupingEnabled, loadPage]);

    const handlePageChange = useCallback((newPage: number) => {
      setPageIndex(newPage);
      loadPage(newPage);
    }, [loadPage]);

    const handleLoadAllForGrouping = () => {
      fetchAllCharacters();
    };

    const handleDisableGrouping = () => {
      setGroupingEnabled(false);
      setPageIndex(0);
      loadPage(0);
    };

    const displayData = groupingEnabled ? allCharacters : characters;

    return (
      <div>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">🪄 Potter DB - Grouping with Load All</h3>
          <p className="font-ui text-sm text-gray-600 mb-3">
            Demonstrates the tradeoff between server pagination and client-side grouping when the API doesn't support server-side grouping.
          </p>

          {!loadedAll && !groupingEnabled && (
            <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-md">
              <p className="font-ui text-sm text-amber-900 mb-2">
                <strong>⚠️ Limitation:</strong> Potter DB API doesn't support server-side grouping or filtering.
                To enable grouping, we need to load all {totalCount || '250+'} characters into memory.
              </p>
              <button
                onClick={handleLoadAllForGrouping}
                disabled={isLoadingAll}
                className="px-4 py-2 bg-copper text-white rounded-md hover:bg-copper-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-ui text-sm font-medium"
              >
                {isLoadingAll ? '⏳ Loading all characters...' : `📥 Load all ${totalCount || '250+'} characters to enable grouping`}
              </button>
            </div>
          )}

          {groupingEnabled && (
            <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-md flex items-center justify-between">
              <p className="font-ui text-sm text-green-900">
                ✓ All {allCharacters.length} characters loaded. Grouping, filtering, and sorting now work client-side!
              </p>
              <button
                onClick={handleDisableGrouping}
                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-ui text-xs font-medium"
              >
                Switch back to pagination
              </button>
            </div>
          )}

          <div className="font-ui text-xs text-gray-500 space-y-1">
            {groupingEnabled ? (
              <>
                <p>• Viewing all {allCharacters.length} characters (loaded in memory)</p>
                <p>• Client-side grouping, filtering, and sorting enabled</p>
                <p>• No pagination needed - virtualization handles performance</p>
              </>
            ) : (
              <>
                <p>• Server-side pagination: fetching {pageSize} characters per page</p>
                <p>• Currently on page {pageIndex + 1}</p>
                <p>• Grouping disabled (API limitation)</p>
                {isLoading && <p className="text-copper font-semibold">⏳ Loading...</p>}
              </>
            )}
          </div>
        </div>

        <div style={{ height: '600px' }}>
          <DataGrid
            gridId="potter-db-grouping"
            columns={characterColumns}
            data={displayData}
            getRowId={(row) => row.slug}
            isLoading={groupingEnabled ? isLoadingAll : isLoading}
            loadingMessage="Fetching magical data from Potter DB..."
            emptyMessage="No characters found"
            pagination={groupingEnabled ? undefined : {
              pageIndex,
              pageSize,
              totalRows: totalCount,
              manualPagination: true,
              onPageChange: handlePageChange,
              onPageSizeChange: (newSize) => {
                setPageSize(newSize);
                setPageIndex(0);
                setCursors([undefined]);
                loadPage(0);
              },
              pageSizeOptions: [10, 20, 50],
            }}
            enableSorting
            enableGrouping={groupingEnabled}
            enableColumnResize
          />
        </div>
      </div>
    );
  },
};

export const PotterDBInfiniteScroll: Story = {
  render: () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
    const [isFetching, setIsFetching] = useState(false);
    const [totalCount, setTotalCount] = useState<number | undefined>(undefined);
    const [batchSize, setBatchSize] = useState(50);

    const loadMore = useCallback(async () => {
      if (!hasMore || isFetching) return;

      setIsFetching(true);
      setIsLoading(true);

      try {
        const response = await fetchCharacters(batchSize, nextCursor);
        const edges = response.data.characters.edges;
        const newCharacters = edges.map(edge => edge.node);

        setCharacters(prev => [...prev, ...newCharacters]);
        setNextCursor(response.data.characters.pageInfo.endCursor ?? undefined);
        setHasMore(response.data.characters.pageInfo.hasNextPage);

        // Store total count
        if (response.data.characters.totalCount && !totalCount) {
          setTotalCount(response.data.characters.totalCount);
        }
      } catch (error) {
        console.error("Failed to fetch characters:", error);
      } finally {
        setIsLoading(false);
        setIsFetching(false);
      }
    }, [hasMore, nextCursor, isFetching, totalCount, batchSize]);

    // Load initial data and reload when batch size changes
    useEffect(() => {
      loadMore();
    }, [batchSize]);

    // Handle scroll to load more
    const handleScroll = useCallback(({ scrollPercentage }: { scrollPercentage: number }) => {
      // Load more when scrolled 80% down
      if (scrollPercentage > 0.8 && hasMore && !isLoading) {
        loadMore();
      }
    }, [hasMore, isLoading, loadMore]);

    return (
      <div>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-ui text-lg font-semibold text-charcoal mb-2">🪄 Potter DB - Infinite Scroll</h3>
          <p className="font-ui text-sm text-gray-600 mb-2">
            Real-time data from the Potter DB GraphQL API with virtualized infinite scrolling.
          </p>
          <div className="font-ui text-xs text-gray-500 space-y-1 mb-3">
            <p>• Characters loaded: {characters.length}{totalCount ? ` / ${totalCount}` : ''}</p>
            <p>• Automatically fetches more data as you scroll</p>
            <p>• Virtualized rendering for smooth performance</p>
            <p>• No pagination controls needed!</p>
            {isLoading && <p className="text-copper font-semibold">⏳ Loading more...</p>}
            {!hasMore && characters.length > 0 && <p className="text-green-600 font-semibold">✓ All {totalCount} characters loaded!</p>}
          </div>
          <div className="flex items-center gap-2">
            <label className="font-ui text-sm font-medium text-charcoal">Batch Size:</label>
            <select
              value={batchSize}
              onChange={(e) => {
                const newSize = Number(e.target.value);
                setBatchSize(newSize);
                // Reset and reload with new batch size
                setCharacters([]);
                setNextCursor(undefined);
                setHasMore(true);
                setTotalCount(undefined);
              }}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-ui"
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
        <div style={{ height: '600px' }}>
          <DataGrid
            gridId="potter-db-infinite"
            columns={characterColumns}
            data={characters}
            getRowId={(row) => row.slug}
            emptyMessage="No characters found"
            virtualizationThreshold={20}
            enableSorting
            enableGrouping
            enableColumnResize
            onScroll={handleScroll}
          />
        </div>
      </div>
    );
  },
};
