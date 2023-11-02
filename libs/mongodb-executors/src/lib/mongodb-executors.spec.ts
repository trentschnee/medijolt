import { mongodbExecutors } from './mongodb-executors';

describe('mongodbExecutors', () => {
  it('should work', () => {
    expect(mongodbExecutors()).toEqual('mongodb-executors');
  });
});
