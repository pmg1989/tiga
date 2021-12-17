"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const createModel_1 = require("../store/createModel");
function getListService() {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.resolve([{ id: 1, title: 'title' }]);
    });
}
const model = createModel_1.createModel({
    namespace: 'list',
    state: {
        list: [],
        page: 1,
        pageSize: 10,
    },
    lifecycle: {
        onLoad() {
            return __awaiter(this, void 0, void 0, function* () {
                this.setPage({ page: 1 });
            });
        },
        onShow(query) {
            return __awaiter(this, void 0, void 0, function* () {
                const list = yield this.getList(query.id, 1, 10);
                console.log(list[0].id);
            });
        },
        onLeave() {
            this.reset();
        },
    },
    effects: {
        getList(_id, page, pageSize) {
            return __awaiter(this, void 0, void 0, function* () {
                const list = yield getListService();
                const reducer = this.setList({ page, pageSize, list });
                console.log(reducer.type, reducer.payload.list[0].id);
                const reducer2 = this.setPage({ page: 1 });
                console.log(reducer.type, reducer2.payload.page);
                return list;
            });
        },
    },
    reducers: {
        setList(state, payload) {
            state.page = payload.page;
            state.pageSize = payload.pageSize;
            state.list = payload.list;
            const action = this.setPage(state, { page: payload.page });
            console.log(action.type, action.payload.page);
            return state;
        },
        setPage(state, payload) {
            state.page = payload.page;
            const action = this.reset(state);
            console.log(action);
            return state;
        },
        reset(state) {
            state = this.initState;
            return state;
        },
    },
});
console.log(model.state.list[0].id);
console.log(model.lifecycle.onShow({ id: 123 }));
console.log(model.effects.getList(123, 1, 10));
console.log(model.reducers.setPage(model.state, { page: 1 }));
const modelInstance = {};
console.log(modelInstance.state.list[0].id);
console.log(modelInstance.lifecycle.onShow({ id: 123 }));
console.log(modelInstance.effects.getList(123, 1, 10));
console.log(modelInstance.reducers.setPage(model.state, { page: 1 }));
