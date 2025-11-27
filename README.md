vite plugin enable html embed application/typescript for test.


# usage
download this repo dir to project root, or other dir.

vite.config.ts
```javascript
import htmlEmbedTS from './vite-plugin-html-embed-typescript';

export default {
  plugins: [
    htmlEmbedTS(),
  ],

  server: {
    allowedHosts: true,
  },
};

```


index.html
```html

<div>test TS in html</div>

<script type="application/typescript">
interface G{
 i: string
}
let g: number = "ab"
console.log(`test ts in html`) 
</script>
```

## RUN

```shell
vite dev

curl localhost:5173
```

get html script ts -> js

