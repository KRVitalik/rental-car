import React, { useEffect, useState } from 'react'
import FilterForm from '../FilterForm/FilterForm'
import CarItem from '../CarItem/CarItem'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames/bind';
import styles from './CarsList.module.css';
import { getCars } from '../storage/collectionAPI';
import { Link, useLocation } from 'react-router-dom';
import Button from '../Button/Button';

let cn = classNames.bind(styles);


const CarsList = () => {
  const location = useLocation();
  const [page, setPage] = useState(2)
  const [data, setData] = useState([])
    const allCars = useSelector((state) => state.cars.cars);
    const formData = useSelector((state) => state.cars.formData);

    const [make, setMake] = useState('')
    const dispatch = useDispatch();

useEffect(() => {
  if(data.length === 0){
    dispatch(getCars({}))
    setData(allCars)
  }
}, [allCars, data.length, dispatch, page])

useEffect(() => {
  setMake(formData.make)
if(make !== formData.make){
  setData(allCars)
}
}, [allCars, formData.make, make])


const handleClick = async() => {
  setPage(prevPage => prevPage + 1)
  const response = await dispatch(getCars({page}))
  await setData((prevData) => [...prevData, ...response.payload]);
  };

  const buttonStyle = {
    height:40,
    width: 100,
    position: "absolute",
    top: 30,
    left: 30,
}

  return (
<section>
  <Link to=".." relative="path">
      <Button title={"Back"} type="button" customStyle={buttonStyle}/>
  </Link>
  <FilterForm/>
    <ul className={cn('item__container')}>
        <CarItem items={data}/>
    </ul>
    {location.pathname === "/catalog" && <button onClick={()=>handleClick()} type='bottom' className={cn('item__load')}>Load more</button>}
    </section>
  )
}

export default CarsList