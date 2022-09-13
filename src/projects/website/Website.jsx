import React, { useState } from 'react';
import './website.scss';
import Menu from './menuApi';

const Website = () => {
  const [menuData, setMenuData] = useState(Menu);
  const [selectedMenu, setSelectedMenu] = useState("full");

  const uniqueCat = [...new Set(Menu.map(item => item.category))]

  const filter = (filterItem) => {
    setSelectedMenu(filterItem);

    const newData = Menu.filter(item => {
      if (filterItem !== 'full') {
        return item.category === filterItem
      } else {
        return menuData
      }
    })
    setMenuData(newData);
  }

  return (
    <div className="website">
      <header className="website-header">
        <ul>
          <li>
            <button className={selectedMenu === "full" ? "button button-active" : "button"} onClick={() => filter("full")}>All</button>
          </li>

          {uniqueCat.map((item, index) => {
            return (
              <li key={index}>
                <button className={selectedMenu === item? "button button-active" : "button"} onClick={() => filter(item)}>{item}</button>
              </li>
            )
          })}
        </ul>
      </header>

      <section className="website-body">
        <h2 className="website-title">
          This is our <strong>{selectedMenu}</strong> menu
        </h2>

        <div className="card-holder">
          {menuData.map(item => {
            const { id, name, image, category, price, description } = item;
            return (
              <div key={id} className="card">
                <div className="card-image">
                  <span className="card-price">${price}</span>
                  <img src={image} alt={image} />
                </div>

                <h3 className="card-title">
                  <span>{name}</span>
                </h3>

                <h3 className="card-category">
                  {category}
                </h3>

                <p className="card-description">
                  {description}
                </p>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default Website
