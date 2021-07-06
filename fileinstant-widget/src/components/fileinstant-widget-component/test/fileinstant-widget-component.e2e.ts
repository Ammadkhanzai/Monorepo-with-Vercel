import { newE2EPage } from '@stencil/core/testing';

describe('fileinstant-widget-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<fileinstant-widget-component></fileinstant-widget-component>');

    const element = await page.find('fileinstant-widget-component');
    expect(element).toHaveClass('hydrated');
  });
});
