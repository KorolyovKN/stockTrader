import { PortfoliosModule } from './portfolios.module';

describe('PortfoliosModule', () => {
  let portfoliosModule: PortfoliosModule;

  beforeEach(() => {
    portfoliosModule = new PortfoliosModule();
  });

  it('should create an instance', () => {
    expect(portfoliosModule).toBeTruthy();
  });
});
