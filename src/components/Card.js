import React from "react";
import PropTypes from "prop-types";

const Card = ({ name, id, image, onClick }) => {
  return (
    <div>
      <div
        className="bg-[#F2F2F2] p-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
        onClick={onClick}
      >
        <div className="flex justify-center">
          <div className="transform transition-transform duration-300 hover:scale-105 cursor-pointer">
            <img src={image} alt={`${name} sprite`} className="w-40 h-40" />
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-3 flex-col ml-1">
        <div>N° {id}</div>
        <div className="flex">
          <div>
            <div className="capitalize">
              <span className="font-bold text-2xl">{name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card;
