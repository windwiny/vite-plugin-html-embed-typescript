vite plugin enable html embed application/typescript for test.


# usage

vite.config.ts
```javascript
import htmlEmbedTS from './vite/plugin-html-embed-typescript';

export default {
  plugins: [
    htmlEmbedTS(),
  ],

  server: {
    allowedHosts: true,
  },
};

```


test1.html
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


```shell
vite dev

curl localhost:5173/test1.html
```

