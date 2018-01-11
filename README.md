# yield-await
Use generator's `yield` as `await`.
> In case you're stuck atn NodeJS 6, otherwise just use async functions

## Usage
```js
const async = require('yield-await')

const doStuff = async(function *(foo, bar){
  let left = willReturnPromiseFoo(foo)
  let right = willReturnPromiseBar(bar)
  
  try {
    [left, right] = yield Promise.all([left, right])
  } catch (e) {
    return null
  }
  
  if (left !== 'foo') throw new Error()
  
  return { left, right }
})

doStuff(foo, bar).then(result => {
  ...
}).catch(reason => {
  ...
})
```
