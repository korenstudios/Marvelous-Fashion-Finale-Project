import { Link } from "react-router-dom";
import aboutImg from "../images/about_us_logo.jpg";

const About = () => {
  return (
    <div className="about-container">
      <div className="intro-container">
        <div className="wrapper-intro">
          <img src={aboutImg} alt="About Us Logo" />
          <div className="intro-title">
            <h2>About Us</h2>
          </div>
        </div>
      </div>

      <div className="about-description">
        <h3>Story of Marvelous Fashion Store</h3>
        <h5>
          Welcome to MarvelousFashion.com. We are based in Israel and we are a
          team of enthusiastic developers, entrepreneurs <br /> and superheroes
          fans who decided to convert their common experience into this web
          store. We hope you'll like it as much as we do and <br />
          have a great shopping experience here. Our prime goal is to create a
          shop in which you can easily find whatever product you need
        </h5>
        <h3>WHY US</h3>
        <h5>We are superheros fans so we know what do you want exactly</h5>
        <h5>High Quality products we are sure you will be 100% satisfied</h5>
        <h5>The best prices you will find in our store only</h5>
        <h5>Free Shipping on all orders</h5>
        <h5>No minimum order quantity</h5>
        <h5>Easy and secure buying with PayPal and Credit Cards</h5>
        <h5>Professional customer service</h5>
        <h5>
          Our team is passionate about making it easier for you to shop online.
        </h5>
        <h5>
          We care about your time so we try our best to make your shopping
          experience pleasant, seamless and hassle-free.
        </h5>
        <h5>
          We're committed to offering frequent promotions and seasonal sales.
        </h5>
        <h5>
          We hope to build relationships with our customers so we'll do
          everything we can to ensure you're satisfied.
        </h5>
        <h3>OUR CORE VALUES</h3>
        <h5>Be Adventurous, Creative, and Open-Minded</h5>
        <h5>Create Long-Term Relationship with Our Customers</h5>
        <h5>Pursue Growth and Learning</h5>
        <h5>Create Fun and A Little Weirdness</h5>
        <h5>Make Sure Our Customers are Pleased</h5>
        <h5>Build A Community Between All Customers</h5>
        <h3>Our Main Warehouse Address</h3>
        <h5>80 Alenbi , Tel Aviv, Israel</h5>
        <h3>KEEP CONTACT WITH US</h3>
        <h5>
          We keep working on our web store and we are open for any suggestions.
        </h5>
        <h5>Feel free to contact with us any time If you need any help</h5>
        <h5>Contact us via the links below.</h5>
        <h4>
          <Link to="#mailto:marvelous.fashion.shop@gmail.com">CONTACT US</Link>
        </h4>
      </div>
    </div>
  );
};

export default About;
