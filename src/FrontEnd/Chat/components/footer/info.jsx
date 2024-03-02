import {
  RiArrowDropRightLine,
  CiLocationOn,
  CiMobile4,
  HiOutlineMail,
  BsClock,
  BsInfoCircle,
  BsTwitter,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineHome,
  FaFacebookF,
  GrContactInfo,
  MdOutlineHomeRepairService,
  TfiGallery,
} from "../../assets/icons/icons";

// List of services offered
const serviceList = [
  "Commercial Cleaning",
  "House Cleaning",
  "Move In Out Service",
  "Post Renovation",
  "Window Cleaning",
  "Green Spaces Maintenance",
  "Novumm Elementum",
  "Sicilium Polon",
];

// List of contact information
const contactList = [
  { icon: <CiLocationOn />, title: "12 Aware St., Addis Ababa, Ethiopia" },
  { icon: <CiMobile4 />, title: "+251 986 8965" },
  { icon: <HiOutlineMail />, title: "contact@Nilo.com" },
  { icon: <BsClock />, title: "Mon-Fri: 08.00 am - 05.00 pm" },
];

// List of navigation links
const linkList = [
  { icon: <AiOutlineHome />, title: "Home" },
  { icon: <BsInfoCircle />, title: "Contact Us" },
  { icon: <MdOutlineHomeRepairService />, title: "Service" },
  { icon: <TfiGallery />, title: "Gallery" },
  { icon: <GrContactInfo />, title: "Contact us" },
];

// List of social media icons
const socialMediaList = [
  <BsTwitter />,
  <FaFacebookF />,
  <AiFillInstagram />,
  <AiFillYoutube />,
];

// Component to display a single service
function Service({ title }) {
  return (
    <div className="flex items-center gap-4">
      <RiArrowDropRightLine />
      <p>{title}</p>
    </div>
  );
}

// Component to display a single contact information item
function Contact({ icon, title }) {
  return (
    <div className="flex items-center gap-4">
      {icon}
      <p>{title}</p>
    </div>
  );
}

// Component to display a single navigation link
function Links({ icon, title }) {
  return (
    <div className="flex items-center gap-4 border-b-[1px] border-b-gray-500 pb-3">
      {icon}
      <a href="#">{title}</a>
    </div>
  );
}

// Component to display a single social media icon
function SocialMedia({ icon }) {
  return (
    <div className="flex items-center justify-center p-4 rounded-full bg-[#40484A] text-white">
      {icon}
    </div>
  );
}

export {
  SocialMedia,
  Links,
  Contact,
  Service,
  socialMediaList,
  linkList,
  contactList,
  serviceList,
};
