# Redux Side Effects

This repo uses two different redux middlewares, `redux-saga` and `redux-loop`, for handling a type of side effect that I couldn't seem to model nicely using `redux-thunk`.

The goal was to be able to dispatch an action that, if some condition (internal to that action) was met, would trigger this display of a modal that asks the user to confirm whether they wanted to proceed with that action. Only if they confirmed via the modal would that action actually be carried out.

An aim here might be to create an abstraction that would handle the asynchrony of a modal confirmation for _any_ action / condition pairing. I haven't done that here as it obscured the main aim of this repo which was to highlight the differences between the two libraries in their most basic form.

## Running

This was built with create-react-app so in order to run the app you just need to `yarn start` from the root directory (not that it's a very exciting app).

## Findings

Its worth noting that with the right modelling, as you might hope, you can decopule a good deal of your domain logic from your side effecting logic added by these libraries. For example, both the implementation of `Incrementer` and the core reducer logic in `reducers/root` can stay completely consistent between approaches. This also means that swapping between the two in this basic case is pretty easy.

The initialising of the two libraries with redux is just middleware / store enhancers, which is done in `index.ts`. Aside from that, the business logic is handled in either a reducer (`redux-loop`) or a generator (`redux-saga`) and glancing at the two you can see similarities.

Given I wanted the decision for whether to show the modal to be encapsulated within the action (not passed in to the action creator), this required accessing the global state and using a selector to determine whether that condition was met. In `redux-saga` this was very easy as there is a primitive to do this `select`. In `redux-loop` it was relatively easy using `reduceReducers` and was only complicated by the (admittedly correct) TS typings for the inital state of the side effecting reducer - there is a comment in the code that links to a further explanation.

While on the subject of TS typings, `redux-saga` suffers relatively badly from the fact that TS doesn't currently support the typing of `yield` returns in generators, so these values are always `any`. With more complex logic this could be pretty painful. On the other hand this isn't an issue for `redux-loop`.

In terms of lines of code `redux-saga` is definitely less and while I'd say that it has the bigger API surface area in total, this isn't evident from this implementation.

## Testing

Yet to be looked at.
