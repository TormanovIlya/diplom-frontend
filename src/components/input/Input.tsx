import * as React from 'react'
import {FunctionComponent} from "react";
import styles from './InputStyles.module.sass'

export interface InputI {
    onChange: (value: string) => void,
    type?: 'password' | 'text',
    placeholder?: string,
    value: string,
    required: boolean,
    color: 'white' | 'black'
}

export const Textarea: FunctionComponent<InputI> = (props) => {
    return(
       <div className={styles.textareaWrapper}>
           {props.required &&
           <span>*</span>
           }
            <textarea value={props.value}
                      required={props.required}
                      placeholder={props.placeholder}
                      className={styles.textarea}
                      onChange={(event) => props.onChange(event.target.value)}/>
       </div>
    )
}

export const Input: FunctionComponent<InputI> = (props) => {
    return (
                <div className={styles.inputWrapper}>
                    {props.required &&
                    <span>*</span>
                    }
                    <input placeholder={props.placeholder}
                           type={props.type ?? 'text'}
                           value={props.value}
                           className={styles.input}
                           style={{color: props.color}}
                           required={props.required}
                           onChange={(event) => props.onChange(event.target.value)}/>
                </div>
    )
}