
declare module '*.scss' {

    const content : { [className : string] : string };
    export default content;
}

declare module '*.svg' {
    
    import type { FunctionComponent, SVGProps } from 'react';

    const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

    export default ReactComponent;
}

declare module '*.wasm' {

    const content : any;
    export default content;
}
