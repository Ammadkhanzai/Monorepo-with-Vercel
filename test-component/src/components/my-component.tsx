// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, Prop, h, State  } from '@stencil/core'
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
 
  @State() name: object;

  componentWillLoad() {
    fetch('http://api-fileinstant.herokuapp.com/api/latest-software/')
      .then((response: Response) => response.json())
      .then(response => {
        this.name = response;
      });
  }
  componentWillUpdate(){
    console.log(this.name)
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
          <li>
          <img
                src="https://fileinstant.herokuapp.com/uploads/1620286871733-115782190.png"
                alt=''
                class='img-fluid'
              />
            <a href="/#">add chrome 28.0.1500.95</a>
          </li>
          <li>
          <img
                src="https://fileinstant.herokuapp.com/uploads/1620286871733-115782190.png"
                alt=''
                class='img-fluid'
              />
            <a href="/#">utorrent 3.3.1 build 29988</a>
          </li>
          <li> 
          <img
                src="https://fileinstant.herokuapp.com/uploads/1620286871733-115782190.png"
                alt=''
                class='img-fluid'
              /> 
            <a href="/#">google chrome 28.0.1500.95</a>
          </li>
          <li>
          <img
                src="https://fileinstant.herokuapp.com/uploads/1620286871733-115782190.png"
                alt=''
                class='img-fluid'
              />
            <a href="/#">utorrent 3.3.1 build 29988</a>
          </li>
          <li>
          <img
                src="https://fileinstant.herokuapp.com/uploads/1620286871733-115782190.png"
                alt=''
                class='img-fluid'
              />
            <a href="/#">utorrent 3.3.1 build 29988</a>
          </li>
          <li>
          <img
                src="https://fileinstant.herokuapp.com/uploads/1620286871733-115782190.png"
                alt=''
                class='img-fluid'
              />
            <a href="/#">utorrent 3.3.1 build 29988</a>
          </li>
          <li>  
          <img
                src="https://fileinstant.herokuapp.com/uploads/1620286871733-115782190.png"
                alt=''
                class='img-fluid'
              />
            <a href="/#">google chrome 28.0.1500.95</a>
          </li>
          <li>Powered by Fieinstant</li>
        </ul>
      </div>
    </div>
  </div>
    )
  }
}