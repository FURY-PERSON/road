import { TestAsyncThunk } from '@/shared/lib/helpers/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchNewsList } from '../fetchNewsList/fetchNewsList';
import { fetchNextNewsPage } from './fetchNextNewsPage';

jest.mock('../fetchNewsList/fetchNewsList');

describe('fetchNextNewsPage', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchNextNewsPage, {
      newsPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true
      }
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(4);
    expect(fetchNewsList).toHaveBeenCalledWith({ page: 3 });
  });

  test('should not fetch if hasMore qual false', async () => {
    const thunk = new TestAsyncThunk(fetchNextNewsPage, {
      newsPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: false
      }
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(fetchNewsList).not.toHaveBeenCalled();
  });

  test('should not fetch if isLoading qual true', async () => {
    const thunk = new TestAsyncThunk(fetchNextNewsPage, {
      newsPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: true,
        hasMore: true
      }
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(fetchNewsList).not.toHaveBeenCalled();
  });
});
