import React from 'react'
import { Button } from 'antd'
import style from './style.module.less'
import image from '@/assets/welcome.jpg'

export default (): React.ReactNode => {
  return (
    <div className={style.main}>
      <h2 className={style.title}>Welcome to FrontEnd Template!</h2>
      <img className={style.image} src={image} alt="welecome" />
      <Button type="primary">A button to test antd theme!</Button>
    </div>
  )
}
