import classNames from 'classnames/bind';
import styles from './FilterForm.module.css';
import Button from '../Button/Button';
import cars from '../car.json';
import { useDispatch } from 'react-redux';
import { getCars } from '../storage/collectionAPI';

let cn = classNames.bind(styles);

const FilterForm = () => {
    const dispatch = useDispatch();

    const buttonStyle = {
        height:48
    };

    const handleForm = (e) => {
        e.preventDefault();
        const formData = {
            make:e.target.cars.value
        };
        dispatch(getCars(formData));
    };

  return (
    <form className={cn('form__container')} onSubmit={(e)=>handleForm(e)}>
        <label className={cn('form__label_brand')}>Car brand
            <select className={cn('form__select_car')} name="cars" id="cars">
                {cars.map((car)=><option key={car} value={car}>{car}</option>)}
            </select>
        </label>
        <label className={cn('form__label_brand')}>Price/ 1 hour
            <input className={cn('form__input_priceStep')} type="number" min="0" step="10" max="100" placeholder='To $'></input>
        </label>
        <label className={cn('form__label_brand', 'mileage')}>Car mileage / km
            <div className={cn('mileage')}>
                <input className={cn('form__input_mileage', 'min')} type="text" name="min" placeholder='From'/>
                <input className={cn('form__input_mileage', 'max')} type="text" name="max" placeholder='To $'/>
            </div>
        </label>
        <Button title={"Search"} type={'submit'} customStyle={buttonStyle}/>
    </form>
  )
  };

export default FilterForm;