/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface FileinstantWidgetComponent {
    }
}
declare global {
    interface HTMLFileinstantWidgetComponentElement extends Components.FileinstantWidgetComponent, HTMLStencilElement {
    }
    var HTMLFileinstantWidgetComponentElement: {
        prototype: HTMLFileinstantWidgetComponentElement;
        new (): HTMLFileinstantWidgetComponentElement;
    };
    interface HTMLElementTagNameMap {
        "fileinstant-widget-component": HTMLFileinstantWidgetComponentElement;
    }
}
declare namespace LocalJSX {
    interface FileinstantWidgetComponent {
    }
    interface IntrinsicElements {
        "fileinstant-widget-component": FileinstantWidgetComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "fileinstant-widget-component": LocalJSX.FileinstantWidgetComponent & JSXBase.HTMLAttributes<HTMLFileinstantWidgetComponentElement>;
        }
    }
}