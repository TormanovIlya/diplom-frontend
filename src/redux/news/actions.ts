import {ActionType, createAsyncAction} from "typesafe-actions";
import {ArticlePromoT} from "../../components/pages/news/NewsPromo";

export const NewsActions = {
    getList: createAsyncAction(
        'news/GET_LIST_REQUEST',
        'news/GET_LIST_SUCCESS',
        'news/GET_LIST_FAILURE'
    )<undefined, ArticlePromoT[], null>(),
    getNews: createAsyncAction(
        'news/GET_NEWS_REQUEST',
        'news/GET_NEWS_SUCCESS',
        'news/GET_NEWS_FAILURE'
    )<{id: number}, ArticlePromoT, null>()
}

export type NewsActionsType = ActionType<typeof NewsActions>