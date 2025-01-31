import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUnresolvedIncidents } from '../useUnresolvedIncidents';
import { waitFor } from '@testing-library/react';

const mockedIncidents = [
  {
    name: 'test incident',
    impact: 'major',
  },
];
jest.mock('statuspage.io', () => ({
  Statuspage: jest.fn().mockImplementation(a => ({
    api: {
      incidents: {
        getUnresolved: jest.fn().mockImplementation(() => ({
          incidents: mockedIncidents,
        })),
      },
    },
  })),
}));

describe('useUnresolvedIncidents', () => {
  it('should return unresolved incidents', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: any) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(() => useUnresolvedIncidents(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.incidents).toBe(mockedIncidents);
  });
});
