import classNames from 'classnames/bind';
import styles from './Button.module.css';

let cn = classNames.bind(styles);

const Button = ({title, type, customStyle, action}) => {

    return (
    <button 
        style={customStyle} 
        className={cn('button')} 
        type={type} 
        onClick={action}>
          {title}
      </button>
  )
}

export default Button