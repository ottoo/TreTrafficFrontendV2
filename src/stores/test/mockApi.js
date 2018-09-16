export const mockGetRequest = mockResponse => {
  return jest.fn().mockImplementation(() => Promise.resolve(mockResponse));
};
