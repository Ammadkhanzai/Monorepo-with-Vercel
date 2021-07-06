// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, h, State } from '@stencil/core'

@Component({
  tag: 'fileinstant-widget-component',
  styleUrl: 'fileinstant-widget-component.css',
  shadow: true,
})

export class MyComponent {

  @State() softwares: Array<any>;

  componentWillLoad() {
    return fetch('http://api-fileinstant.herokuapp.com/api/latest-software/')
      .then(response => response.json())
      .then(data => {
        this.softwares = data.data;
      });

  }
  render() {
    return (
      <div class="widget_preview">
        <br />
        <div class="latest_download">
          <h4 class="new">Latest downloads</h4>
          <div class="latest_download_content">
            <ul>
              {this.softwares.map(software =>
                <li>
                  <img
                    src={`https://fileinstant.herokuapp.com/uploads/${software.softwareID.softwareIcon}`}
                    alt=''
                    class='img-fluid'
                  />
                  <a href={`https://proxy-omega.vercel.app/download/${software.softwareID.softwareName.trim().split(" ").join("-").toLowerCase()}/${software.softwareID._id.toString()}`}>{software.softwareID.softwareName + " " + software.softwareID.softwareVersion}</a>
                </li>
              )}
              <li>Powered by Fieinstant</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}