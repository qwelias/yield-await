# yield-await
Use generator's `yield` as `await`.
> In case you're stuck at NodeJS 6, otherwise just use async functions

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

## Known issue
It is impossible to throw into generator if it is done, so the following example is invalid unlike in async function
```js
try {
    return Promise.reject(reason)
} catch (e) {
    return value
}
```
catch statement will be unreachable.

In order to make it valid it is required to `yield` returned promise, like so
```js
try {
    return yield Promise.reject(reason)
} catch (e) {
    return value
}
```
