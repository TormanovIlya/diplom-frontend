import * as React from 'react'
import styles from './ProductStyles.module.sass';
import {url} from "../../../apiConfig";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {ProductActions} from "../../../redux/product/actions";
import {RootState} from "../../../redux";
import {useHistory, useParams} from "react-router";
import {Button, ButtonColor, ButtonSize} from "../../button/Button";
import {BasketActions} from "../../../redux/basket/actions";
import {useIsMobile} from "../../../hooks";
import {ImageModalAction} from "../../../redux/image";
import {CategoryTag} from "./CategoryTag";
import {ProductSlideI} from "../../slides/ProductSlide";
import {routes} from "../../../routes";

export const Product = (props:{data?: ProductSlideI } ) => {
    const product = useSelector((state: RootState) => state.ProductReducer.product)
    const dispatch = useDispatch();
    const isMobile = useIsMobile();
    const history = useHistory();
    const {id} = useParams<{ id: string }>();
    useEffect(() => {
       !props.data && dispatch(ProductActions.getProduct.request({id:+id}))
    }, [dispatch])
    return (
        <>
            {props.data ?
                <div className={styles.productWrapper}>
                    <div className={styles.product}>
                        <div className={styles.title}>
                            {props.data.title}
                        </div>
                        <img src={url((`files/${props.data.image}`))} className={styles.mainImage}/>
                        <div className={styles.additionalImages}>
                            {props.data.additionalImages?.map(image =>
                                <img src={url((`files/${image.link}`))}
                                     key={image.id}
                                     className={styles.additionalImage}
                                     onClick={() => dispatch(ImageModalAction({
                                         link: image.link,
                                         title: props.data?.title,
                                         isOpen: true
                                     }))}/>
                            )}
                        </div>
                        <div className={styles.description}>
                            {props.data.description}
                        </div>
                        <CategoryTag {...props.data.category} onClick={(id)=> history.push(`${routes.products}?category=${id}`)}/>
                        <div className={styles.price}>
                            <div className={styles.costs}>
                                <div className={styles.cost}>
                                    {props.data.cost} руб
                                </div>
                                <div className={styles.stockCost}>
                                    {props.data.stockCost} руб
                                </div>
                            </div>
                            <Button onClick={() => dispatch(BasketActions.pushBasketAction(props.data as ProductSlideI))}
                                    content={'В корзину'}
                                    alignSelf={isMobile ? 'center' : 'start'}
                                    size={ButtonSize.DEFAULT}
                                    color={ButtonColor.BLUE}/>
                        </div>
                    </div>
                </div>
                :
                <div className={styles.productWrapper}>
                    <div className={styles.product}>
                        <div className={styles.title}>
                            {product.title}
                        </div>
                        <img src={url((`files/${product.image}`))} className={styles.mainImage}/>
                        <div className={styles.additionalImages}>
                            {product.additionalImages?.map(image =>
                                <img src={url((`files/${image.link}`))}
                                     key={image.id}
                                     className={styles.additionalImage}
                                     onClick={() => dispatch(ImageModalAction({
                                         link: image.link,
                                         title: product.title,
                                         isOpen: true
                                     }))}/>
                            )}
                        </div>
                        <div className={styles.description}>
                            {product.description}
                        </div>
                        <CategoryTag {...product.category}  onClick={(id)=> history.push(`${routes.products}?category=${id}`)}/>
                        <div className={styles.price}>
                            <div className={styles.costs}>
                                <div className={styles.cost}>
                                    {product.cost} руб
                                </div>
                                <div className={styles.stockCost}>
                                    {product.stockCost} руб
                                </div>
                            </div>
                            <Button onClick={() => dispatch(BasketActions.pushBasketAction(product))}
                                    content={'В корзину'}
                                    alignSelf={isMobile ? 'center' : 'start'}
                                    size={ButtonSize.DEFAULT}
                                    color={ButtonColor.BLUE}/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}