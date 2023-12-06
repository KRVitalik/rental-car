import icon from '../../symbol.svg';
import classNames from 'classnames/bind';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import Button from '../Button/Button';

let cn = classNames.bind(styles);

const Modal = ({data}) => {
  const modalRoot = document.getElementById('modal');
  const dialog = document.querySelector('dialog');

  const carInCity = (item) => item.split(" ")[3].split("").slice(0, item.split(" ")[3].split("").length-1);
  const carInCountry = (item) => item.split(" ")[4].split("");

  const handleBackdrop = (e) => {
      if(e.target.localName === "dialog"){
      dialog.close();
    };
  };

  const handleEscapeBackdrop = (e) => {
    if(e.code === 'Escape'){
      dialog.close();
    };
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscapeBackdrop);
    return () => {
        window.removeEventListener('keydown', handleEscapeBackdrop);
    };
  });

  const handleCall = () => {
    const link = document.createElement('a');
    link.href = `tel:+380730000000`;
    link.click();
  };

    const regex = /(\$)(\d+)/;
  return (
    createPortal(
      <dialog onClick={(e)=>handleBackdrop(e)}>
      <div className={cn('modal')}>
        <button className={cn('modal__svg')} onClick={()=>dialog.close()}>
          <svg   width="24px" height="24px">
                    <use href={icon + "#icon-x"}></use>
                </svg>
                </button>
                <img className={cn('modal__img')} src={data.img} alt="" />
                <div className={cn('modal__carName')}>
                        <h2>{data.make}&ensp;</h2>
                        <span>{data.model}</span>
                        <p>,&ensp;{data.year}</p>
                </div>
                <ul className={cn('modal__info_list')}>
                    {Object.keys(data).length !== 0 && <li>&ensp;{carInCity(data.address)}&ensp;</li>}
                    {Object.keys(data).length !== 0 && <li>&ensp;{carInCountry(data.address)}&ensp;</li>}
                    <li>&ensp;id:&ensp;{data.id}&ensp;</li>
                    <li>&ensp;Year:&ensp;{data.year}&ensp;</li>
                    <li>&ensp;Type:&ensp;{data.type}&ensp;</li>
                    <li>&ensp;Fuel Consumption:&ensp;{data.fuelConsumption}&ensp;</li>
                    <li>&ensp;Engine Size:&ensp;{data.engineSize}&ensp;</li>
                </ul>
                <p className={cn('modal__description')}>{data.description}</p>
                <p className={cn('modal__functionalities')}>Accessories and functionalities:</p>
                <ul className={cn('modal__info_list')}>
                  {Object.keys(data).length !== 0 && data.functionalities.map((functionality)=><li key={functionality}>&ensp;{functionality}&ensp;</li>)}
                </ul>
                <p className={cn('modal__functionalities')}>Rental Conditions: </p>
                <ul className={cn('modal__functionalities_list')}>
                  {Object.keys(data).length !== 0 && data.rentalConditions.split('\n').map((el)=><li key={el}>{el}</li>)}
                  {Object.keys(data).length !== 0 && <li>Mileage:&nbsp;<span>{data.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span></li>}
                  {Object.keys(data).length !== 0 && <li>Price:&nbsp;<span>{data.rentalPrice.replace(regex, '$2$1')}</span></li>}
                </ul>
                <Button title={"Rental car"} type={'button'} customStyle={{width:168}} action={()=>handleCall()}/>
    </div>
</dialog>,
      modalRoot,
  )
  )
};

export default Modal;