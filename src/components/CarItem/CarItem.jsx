import classNames from 'classnames/bind';
import styles from './CarItem.module.css';
import Button from '../Button/Button';
import icon from '../../symbol.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites } from '../storage/collectionAPI';
import { useLocation } from 'react-router-dom';
import Modal from '../Modal/Modal';
import { useState } from 'react';

let cn = classNames.bind(styles);

const CarItem = ({ items }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [dataModal, setDataModal] = useState({});
    const favoritesCars = useSelector((state) => state.cars.favorites);

    const carInCity = (item) => item.split(" ")[3].split("").slice(0, item.split(" ")[3].split("").length - 1);
    const carInCountry = (item) => item.split(" ")[4].split("");

    const sortFavoritesCars = (id) => {
        return favoritesCars.find(favoritesCar => favoritesCar === id);
    };

    const handleFavoriteClick = (el) => {
        console.log(sortFavoritesCars(el.id))
        switch (!sortFavoritesCars(el.id)) {
            case true:
                dispatch(addToFavorites([...favoritesCars, el]));
                break;
            case false:
                const newFavorites = favoritesCars.filter(favoritesCar => console.log(favoritesCar));
                console.log(newFavorites)
                dispatch(addToFavorites(newFavorites));
                break;
            default:
                break;
        };
    };

    const itemsToRender = () => {
        if (location.pathname === "/catalog") {
            return items;
        } else return items.filter((item) => favoritesCars.includes(item.id));
    };

    const openModal = (item) => {
        setDataModal(item);
        dialog.show();
    };

    const dialog = document.querySelector('dialog');

    return (
        <>
            {items && itemsToRender().map((item) =>
                <li className={cn('item')} key={item.id}>
                    <button className={cn('item__svg')} onClick={() => handleFavoriteClick(item)}>
                        <svg width="18px" height="18px">
                            <use href={icon + `${sortFavoritesCars(item) ? "#icon-active" : "#icon-normal"}`}></use>
                        </svg>
                    </button>
                    <div>
                        <img className={cn('item__image')} src={item.img} alt={item.model} />
                        <div className={cn('item__carName')}>
                            <div>
                                <h2>{item.make}&nbsp;</h2>
                                <span>{item.model}</span>
                                <p>,&nbsp;{item.year}</p>
                            </div>
                            <p>{item.rentalPrice}</p>
                        </div>
                        <ul className={cn('item__info_list')}>
                            <li>&nbsp;{carInCity(item.address)}&nbsp;</li>
                            <li>&nbsp;{carInCountry(item.address)}&nbsp;</li>
                            <li>&nbsp;{item.rentalCompany}&nbsp;</li>
                            <li>&nbsp;Premium&nbsp;</li>
                            <li>&nbsp;{item.type}&nbsp;</li>
                            <li>&nbsp;{item.model}&nbsp;</li>
                            <li>&nbsp;{item.id}&nbsp;</li>
                            <li>&nbsp;{item.functionalities[1]}&nbsp;</li>
                        </ul>
                    </div>
                    <Button id="openDialog" title={"Learn more"} type={'button'} action={() => openModal(item)} onClick={() => dialog.showModal()} />
                </li>
            )}
            <Modal data={dataModal} />
        </>
    )
};

export default CarItem;