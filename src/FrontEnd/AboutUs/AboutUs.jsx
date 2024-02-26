import Header from "../Home/header";
import Footer from "./Footer";

function AboutUs() {
  return (
    <div className=" flex flex-col ">
      <Header />
      <div className=" flex flex-col mt-20 mx-5 items-center">
        {" "}
        <span className=" text-4xl font-bold tracking-tighter">About Us</span>
        <span className=" text-sm m-2 text-gray-500 font-extralight">
          Get to know more about MindRest
        </span>
      </div>
      <div className=" flex p-10 flex-row-reverse">
        <div className="flex flex-col m-10  w-1/2">
          <span className=" text-4xl my-8 px-32 font-bold tracking-tighter">
            Our Approach
          </span>{" "}
          <span className="px-32">
            At MindRest, we understand that seeking therapy can be a significant
            step, and we are here to support you every step of the way. Our
            platform connects you with licensed therapists who specialize in a
            wide range of mental health concerns, including anxiety, depression,
            stress, trauma, and relationship issues. We believe in a holistic
            approach to mental health care, addressing the unique needs of each
            individual. Our therapists are trained to provide evidence-based
            therapies, such as cognitive-behavioral therapy (CBT),
            mindfulness-based therapy, and interpersonal therapy, tailored to
            your specific goals and preferences.
          </span>
        </div>{" "}
        <div className=" p-20 pb-0 pr-0 w-1/2">
          <img src="src/assets/about us/gus-moretta-BCyfpZE3aVE-unsplash.jpg"></img>
        </div>
      </div>
      <div className=" flex p-10 flex-row">
        <div className="flex flex-col m-10  w-1/2">
          <span className=" text-4xl my-8 px-32 font-bold tracking-tighter">
            Why Choose MindRest?
          </span>{" "}
          <span className="px-32">
            Accessibility: We offer online therapy sessions that you can access
            from the comfort and privacy of your own home, eliminating the need
            for travel or long wait times. Affordability: We strive to make
            therapy accessible to all individuals by offering flexible pricing
            options and financial assistance programs. Confidentiality: Your
            privacy and confidentiality are our top priorities. Our platform is
            secure, and all therapy sessions are conducted in a safe and
            confidential environment. Cultural Sensitivity: We understand the
            importance of cultural sensitivity in therapy. Our diverse team of
            therapists respects and values the cultural backgrounds and beliefs
            of our clients.
          </span>
        </div>{" "}
        <div className=" p-20 pb-0 pl-0 w-1/2">
          <img src="src/assets/about us/danie-franco-tnxRFtXI9dI-unsplash.jpg"></img>
        </div>
      </div>
      <div className=" flex p-10 flex-row-reverse">
        <div className="flex flex-col m-10  w-1/2">
          <span className=" text-4xl pt-14 my-8 px-32 font-bold tracking-tighter">
            Our Mission
          </span>{" "}
          <span className="px-32">
            Our mission at MindRest is to break down barriers to mental health
            care by offering convenient and confidential online therapy
            sessions. We strive to empower individuals to prioritize their
            mental well-being and seek the support they need to lead fulfilling
            lives.
          </span>
          <span className="mt-14 px-32">
            Our team consists of licensed therapists who are passionate about
            helping individuals improve their mental health and well-being. We
            are committed to providing personalized and compassionate care to
            each and every client we serve.
          </span>
          <span className="mt-14 px-32">
            Take the first step towards better mental health and well-being with
            MindRest. Whether you're struggling with anxiety, depression, or any
            other mental health concern, we're here to help you navigate life's
            challenges and find hope and healing along the way. Join us on your
            journey to greater mental wellness. Get started with MindRest today.
          </span>
        </div>{" "}
        <div className=" p-20 pt-0 pr-0 w-1/2">
          <img src="src/assets/about us/shea-rouda-mRQk1B4OM0k-unsplash.jpg"></img>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
