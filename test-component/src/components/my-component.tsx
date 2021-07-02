// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, Prop, h } from '@stencil/core'
import { format } from '../utils/utils'

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string

  /**
   * The middle name
   */
  @Prop() middle: string

  /**
   * The last name
   */
  @Prop() last: string

  private getText(): string {
    return format(this.first, this.middle, this.last)
  }

  render() {
    return (
      <div class="widget_preview">
    <h5>{this.getText()}</h5>
    <br />
    <div class="latest_download">
      <h4>Latest downloads</h4>
      <div class="latest_download_content">
        <ul>
          <li>04 Jan</li>
          <li>
            
            <a href="/#">google chrome 28.0.1500.95</a>
          </li>
          <li>
            
            <a href="/#">utorrent 3.3.1 build 29988</a>
          </li>
          <li>03 Jan</li>
          <li>
            
            <a href="/#">google chrome 28.0.1500.95</a>
          </li>
          <li>
            
            <a href="/#">utorrent 3.3.1 build 29988</a>
          </li>
          <li>
            
            <a href="/#">utorrent 3.3.1 build 29988</a>
          </li>
          <li>
            
            <a href="/#">utorrent 3.3.1 build 29988</a>
          </li>
          <li>01 Jan</li>
          <li>
            
            <a href="/#">google chrome 28.0.1500.95</a>
          </li>
          <li>Powered by filehippo</li>
        </ul>
      </div>
    </div>
  </div>
    )
  }
}