react-redux-optimist
---

react bindings for [redux-optimist](https://github.com/ForbesLindesay/redux-optimist)

![halffull](https://i.imgur.com/hAprwfP.jpg)

```jsx
let o = this.context.optimist('add_todo');

// optimistically update with an action
dispatch(o.begin({payload, ...}))
// -> {type: 'add_to', payload, optimist: {}, ...}

// after some async stuff, dispatch a commit
dispatch(o.commit({payload, ...}))
// -> {type: 'add_to:commit', payload, optimist: {}, ...}

// or if you you want to revert the optimistic update
dispatch(o.revert({payload, error, ...}))
// -> {type: 'add_to:revert', payload, error, optimist: {}, ...}

// you could override the generated action types, of course.

```

 - from the work on [redux-react-local](https://github.com/threepointone/redux-react-local)
