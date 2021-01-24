type EffectsModel = Record<string, (...args: any[]) => Promise<any>>

type Action<P = any> = P extends void ? { type: string; payload: void } : { type: string; payload: P }

type ReducersModel<S, P = any> = {
  [key: string]: (state: S, payload: P) => S
}

type Reducer<S, P = any> = (state: S, payload: P) => S

type Reducer2Action<S, R extends Reducer<S>> = R extends (state: infer S, ...payload: infer P) => any ? (...payload: P) => Action<P[0]> : () => Action<void>

type EffectCallReducer<S, R extends ReducersModel<S>> = {
  [reducerKey in keyof R]: Reducer2Action<S, R[reducerKey]>
}

type ThisReducerType<S, R extends Reducer<S>> = R extends (state: infer S, ...payload: infer P) => S ? (state: S, ...payload: P) => Action<P[0]> : (state: S) => Action<void>

type ReducerCallReducer<S, R extends ReducersModel<S>> = {
  [reducerKey in keyof R]: ThisReducerType<S, R[reducerKey]>
}

type Model<S, E extends EffectsModel, R extends ReducersModel<S>> = {
  namespace: string
  state: S
  effects: E & ThisType<E & EffectCallReducer<S, R>>
  reducers: R & ThisType<ReducerCallReducer<S, R> & { initState: S }>
}

type FinalModel<S, E extends EffectsModel, R extends ReducersModel<S>> = {
  namespace: string
  state: S
  effects: E & ThisType<E & EffectCallReducer<S, R>>
  reducers: R & ThisType<EffectCallReducer<S, R>>
}

export const createModel = <S, E extends EffectsModel, R extends ReducersModel<S>>(model: Model<S, E, R>): FinalModel<S, E, R> => {
  const finalModel: any = model
  return finalModel as FinalModel<S, E, R>
}
