import React from 'react'
import classes from './myModal.module.css'
import { Input,Button } from 'antd';
export default function ({children,visible,setVisible}) {
    const rootClasses = [classes.myModal]
    if(visible){
        rootClasses.push(classes.active)
    }
  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
        <div className={classes.myModalContent} onClick={(e) => e.stopPropagation()}>
        <form>
            <Input placeholder='Наименование Основного средства' className={classes.inputField}></Input>
            <Input placeholder='Код основного средства' className={classes.inputField}></Input>
            <Input placeholder='Первоначальная стоимость' className={classes.inputField}></Input>
            <Input placeholder='Дата начала эксплуатации' className={classes.inputField}></Input>
            <Input placeholder='Дата выбытия' className={classes.inputField}></Input>
            <Input placeholder='Код вида выбытия' className={classes.inputField}></Input>
            <Input placeholder='Нормативный срок службы' className={classes.inputField}></Input>
            <Button onClick={() => setVisible(false)}> Сохранить</Button>
        
         </form>
        </div>
    </div>
  )
}
