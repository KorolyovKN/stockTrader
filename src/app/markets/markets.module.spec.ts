import { MarketsModule } from './markets.module';

describe('MarketsModule', () => {
  let marketsModule: MarketsModule;

  beforeEach(() => {
    marketsModule = new MarketsModule();
  });

  it('should create an instance', () => {
    expect(marketsModule).toBeTruthy();
  });
});
