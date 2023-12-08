import { NavLink } from 'react-router-dom'
import classNames from 'classnames/bind';
import styles from './Home.module.css';
let cn = classNames.bind(styles);

const Home = () => {
    return (
    <section className={cn('main__container')}>
      <ul className={cn('home__container')}>
        <li>
          <NavLink to="/catalog">Catalog</NavLink>
        </li>
        <li>
          <NavLink to="/favorites">Favorites</NavLink>
        </li>
      </ul>
      <p>Discover the world on wheels with our car rental service</p>
    </section>
  )
};

export default Home;