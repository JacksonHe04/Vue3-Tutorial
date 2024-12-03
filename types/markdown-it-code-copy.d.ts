// types/markdown-it-code-copy.d.ts
declare module "markdown-it-code-copy" {
  interface Options {
    buttonText?: string;
  }

  function plugin(md: any, options?: Options): void;

  export = plugin;
}
