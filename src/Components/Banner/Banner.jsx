import "./Banner.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useItems } from '../Context/ItemContext';
import { useNavigate } from 'react-router-dom';

function Banner() {
  const { setSelectedCategory, setSearchQuery } = useItems();
  const navigate = useNavigate();
  
  const handleCategoryClick = (category) => {
      setSelectedCategory(category);
      setSearchQuery('');
      navigate('/search');
  };
     
  const categories = [
    "Mobile Phones",
    "Cars",
    "Motorcycles",
    "Houses",
    "TV - Video - Audio",
    "Tablets",
    "Land & Plots",
    "Books - Sports - Hobbies",
    "Business - Industrial",
    "Services"
  ];

  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="subNavbar">
          <div className="left-nav">
            <h1>
              ALL CATEGORIES <KeyboardArrowDownIcon />
            </h1>
          </div>
          <div className="right-nav">
            <ul>
              {categories.map((category, index) => (
                <li key={index}>
                  <a onClick={() => handleCategoryClick(category)}>
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="banner">
          <img src="../../../Images/banner copy.png" alt="Banner" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
