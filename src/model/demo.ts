import { createModel } from '../store/createModel'

async function getListService(): Promise<InitState['list']> {
  return Promise.resolve([{ id: 1, title: 'title' }])
}

type InitState = {
  page: number
  pageSize: number
  list: {
    id: number
    title: string
  }[]
}

const model = createModel({
  namespace: 'list',
  state: {
    list: [],
    page: 1,
    pageSize: 10,
  } as InitState,
  lifecycle: {
    async onLoad() {
      this.setPage({ page: 1 })
    },
    async onShow(query: { id: number }) {
      const list = await this.getList(query.id, 1, 10)
      console.log(list[0].id)
    },
    onLeave() {
      this.reset()
    }
  },
  effects: {
    async getList(id: number, page: number, pageSize: number) {
      const list = await getListService()
      const reducer = this.setList({ page: 1, pageSize, list })
      console.log(reducer.type, reducer.payload.list[0].id)

      const reducer2 = this.setPage({ page: 1 })
      console.log(reducer.type, reducer2.payload.page)

      return list
    },
  },
  reducers: {
    setList(state, payload: InitState) {
      state.page = payload.page
      state.pageSize = payload.pageSize
      state.list = payload.list

      const action = this.setPage(state, { page: payload.page })
      console.log(action.type, action.payload.page)
      return state
    },
    setPage(state, payload: { page: number }) {
      state.page = payload.page

      const action = this.reset(state)
      console.log(action)
      return state
    },
    reset(state) {
      state = this.initState
      return state
    },
  },
})

console.log(model.state.list[0].id)
console.log(model.lifecycle.onShow({ id: 123 }))
console.log(model.effects.getList(123, 1, 10))
console.log(model.reducers.setPage(model.state, { page: 1 }))

type Model = typeof model

const modelInstance = {} as Model
console.log(modelInstance.state.list[0].id)
console.log(modelInstance.lifecycle.onShow({ id: 123 }))
console.log(modelInstance.effects.getList(123, 1, 10))
console.log(modelInstance.reducers.setPage(model.state, { page: 1 }))
