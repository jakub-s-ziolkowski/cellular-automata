
declare module '*.scss' {

    const content: { [className : string] : string };
    export default content;
}

declare module '*.wasm' {

    const content: any;
    export default content;
}
