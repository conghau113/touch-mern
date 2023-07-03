import classNames from 'classnames'
import styles from './PreLoader.module.scss'

interface PreLoaderProps {
  className?: string
}

export default function PreLoader(props: PreLoaderProps) {
  const { className } = props

  return (
    <div className={classNames(styles[`preloader-container`], styles[`preloader-wave-spread`], className)}>
      <div className={styles[`preloader`]}>
        <div className={styles[`preloader-line-1`]}></div>
        <div className={styles[`preloader-line-2`]}></div>
        <div className={styles[`preloader-line-3`]}></div>
        <div className={styles[`preloader-line-4`]}></div>
        <div className={styles[`preloader-line-5`]}></div>
      </div>
    </div>
  )
}
