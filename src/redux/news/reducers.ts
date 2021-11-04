import {createReducer} from "typesafe-actions";
import {ArticlePromoT} from "../../components/pages/news/NewsPromo";
import {NewsActions, NewsActionsType} from "./actions";
import {combineReducers} from "redux";



export const NewsReducer = combineReducers({
    list: createReducer<ArticlePromoT[], NewsActionsType>([])
        .handleAction(NewsActions.getList.success, (_, action) => action.payload),
    news: createReducer<ArticlePromoT, NewsActionsType>({
        image: "",
        author: "", content: "", creationDate: "", id: 0, title: ""
    })
        .handleAction(NewsActions.getNews.success, (_, action) => action.payload)
})
