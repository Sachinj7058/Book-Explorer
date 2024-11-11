import React from "react";
import { useNavigate } from "react-router-dom";
import { FiBookOpen, FiArrowRight } from "react-icons/fi";
import img from "../assets/Pattern.svg";
import Fiction from "../assets/Fiction.svg";
import Drama from "../assets/Drama.svg";
import Humour from "../assets/Humour.svg";
import Politics from "../assets/Politics.svg";
import Philosophy from "../assets/Philosophy.svg";
import History from "../assets/History.svg";
import Adventure from "../assets/Adventure.svg";

const genrels = [
  { name: "Fiction", icon: <FiBookOpen />, frIcon: Fiction },
  { name: "Drama", icon: <FiBookOpen />, frIcon: Drama },
  { name: "Humour", icon: <FiBookOpen />, frIcon: Humour },
  { name: "Politics", icon: <FiBookOpen />, frIcon: Politics },
  { name: "Philosophy", icon: <FiBookOpen />, frIcon: Philosophy },
  { name: "History", icon: <FiBookOpen />, frIcon: History },
  { name: "Adventure", icon: <FiBookOpen />, frIcon: Adventure },
];

const Home = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/books/${category.toLowerCase()}`);
  };

  return (
    <>
      <div className="min-h-screen bg-[#F8F7FF] flex flex-col items-center justify-center">
        <div className="text-center mb-20 ">
          <img
            src={img}
            alt=""
            className="w-full fixed top-0 bottom-0 left-0 right-0 z-0 object-cover "
          />
          <h1 className="absolute text-5xl font-semibold text-[#5E56E7] mb-4 font-montserrat left-96 ml-12  ">
            Gutenberg Project
          </h1>
          <p className="absolute text-lg text-[#333333] mb-12 mt-14 left-96 ml-14 ">
            A social cataloging website that allows you to freely search its
            database of books, annotations,
          </p>
          <p className="absolute text-lg text-[#333333] mb-12 mt-20 left-96 ml-14 ">
            and reviews.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 mt-20 ">
          {genrels.map((genre, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(genre.name)}
              className="flex items-center justify-between w-80 bg-white py-3 px-10 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center space-x-8">
                <img src={genre.frIcon} alt={genre.name} className="w-8 h-8" />
                <span className="text-lg font-semibold text-gray-700">
                  {genre.name.toUpperCase()}
                </span>
              </div>
              <span className="text-[#5E56E7]">
                <FiArrowRight size={24} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
