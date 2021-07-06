import { newSpecPage } from '@stencil/core/testing';
import { FileinstantWidgetComponent } from '../fileinstant-widget-component';

describe('fileinstant-widget-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FileinstantWidgetComponent],
      html: `<fileinstant-widget-component></fileinstant-widget-component>`,
    });
    expect(page.root).toEqualHtml(`
      <fileinstant-widget-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </fileinstant-widget-component>
    `);
  });
});
