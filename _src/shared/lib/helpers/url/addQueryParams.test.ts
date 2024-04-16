import { getQueryParams } from './addQueryParam';

describe('shared/url/getQueryParams', () => {
  test('test with one param', () => {
    const params = getQueryParams({
      test: 'value'
    });
    expect(params).toBe('test=value');
  });
  test('test with multiple params', () => {
    const params = getQueryParams({
      test: 'value',
      second: '2'
    });
    expect(params).toBe('test=value&second=2');
  });
  test('test with undefined', () => {
    const params = getQueryParams({
      test: 'value',
      second: undefined
    });
    expect(params).toBe('test=value');
  });
});

describe('shared/url/addQueryParams', () => {
  test('test with initial query params', () => {
    jest.spyOn(window, 'location', 'get').mockReturnValue({
      ...window.location,
      search: '?abc=1&second=4'
    });

    const params = getQueryParams({
      test: undefined,
      second: '2'
    });

    expect(params).toBe('abc=1&second=2');
  });
});
