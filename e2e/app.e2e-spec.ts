import { MadnessPage } from './app.po';

describe('madness App', () => {
  let page: MadnessPage;

  beforeEach(() => {
    page = new MadnessPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
