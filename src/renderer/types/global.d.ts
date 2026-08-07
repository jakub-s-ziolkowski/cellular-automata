
declare module '*.scss' {

    const content : { [className : string] : string };
    export default content;
}

declare module '*.svg' {

    const src : string;
    export default src;
}

declare module '*.wasm' {

    const content : any;
    export default content;
}
