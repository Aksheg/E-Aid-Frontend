import "./LandingPage3.css";
import Carousel from "../Carousel";
import CarouselCards from "../CarouselCards";

const LandingPageThree: React.FC = () => {
  const names = [
    {
      name: "Adeola Abraham",
      info: "I can't thank E-aid enough. Their prompt response and professional guidance saved my child's life during a critical situation. I highly recommend their services.",
    },
    {
      name: "Adekola Johnson",
      info: "In moments of uncertainty, E-aid has been my reliable companion. The wealth of information and access to medical experts has given me the confidence to handle emergencies effectively.",
    },
    {
      name: "Peter Ebuka",
      info: "E-aid is a game-changer. The convenience of booking sessions and talking to doctors from the comfort of my home is invaluable. I feel secure knowing help is just a few taps away.",
    },
    {
      name: "Oluwatobi Adekunle",
      info: "E-Aid has been a lifesaver for my family. We recently had a medical emergency, and the app connected us with a nearby hospital within minutes. The quick response and efficient service provided by E-Aid is commendable.",
    },
    {
      name: "Chidinma Nwosu",
      info: "As a mother, I find great comfort in knowing that E-Aid is just a click away. The first aid articles for children have been incredibly helpful in managing minor injuries and illnesses. This app is a must-have for every parent.",
    },
    {
      name: "Abdul Ibrahim",
      info: "I had a chat with a doctor through E-Aid App, and I was impressed by the professionalism and knowledge of the doctor I spoke to. The app's interface is user-friendly, and the medical advice I received was accurate and reassuring. Highly recommended!",
    },
    {
      name: "Olumide Okonkwo",
      info: "E-Aid has revolutionized the way I seek medical assistance. From searching for hospitals in my area to accessing reliable health information, this app has become my trusted companion. It's an invaluable resource that I can rely on in times of need.",
    },
  ];

  return (
    <div className="carousel-container">
      <h1 className="landingPageHeader">Hear what our customers are saying</h1>
      <p className="landingPageParagraph">
        Discover how we have made a positive impact on the lives of our users.
      </p>
      <Carousel Card={CarouselCards} names={names} />
    </div>
  );
};

export default LandingPageThree;
