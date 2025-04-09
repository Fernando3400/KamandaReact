import React, { useState } from 'react';

const AccordionItem = ({ menuItems }) => {
  const { title, submenu } = menuItems;
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className={`accordion_item ${isOpen ? 'open' : 'closed'}`}>
      <div className="tab">
        <p className='titulo'>{title}</p>
        <button
          onClick={handleToggle}
          className="control">
          {isOpen ? '-' : '+'}
        </button>
      </div>
      {isOpen && (
        <ul className="submenu">
          {submenu.map((item, index) => (
            <li className="submenu-item" key={index}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default AccordionItem;
