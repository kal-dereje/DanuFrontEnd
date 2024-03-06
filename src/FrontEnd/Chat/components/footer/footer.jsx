import {
  Contact,
  Links,
  Service,
  SocialMedia,
  contactList,
  linkList,
  serviceList,
  socialMediaList,
} from "./info";

function Footer() {
  return (
    <footer className="flex flex-col bg-[#343C3E] text-white">
      <div className="flex">
        <div className="flex flex-col  gap-4 grow  w-1/4 p-10 text-[#B2B9BB]">
          <h1 className="font-bold mb-5 text-white">ABOUT US</h1>
          <p>
            Founded in 1995 Nilo quickly built a reputation as one of the
            leading providers of residential and commercial cleaning solutions.
          </p>
          <p>
            Our focus is to listen to our clients, understand their needs and
            provide the exceptional level of cleaning service.
          </p>
          <div className="px-4 py-2  text-white flex justify-center bg-[#40484A] rounded-xl mt-5">
            Learn More
          </div>
        </div>

        <div className="flex flex-col  gap-4  grow p-10">
          <h1 className="font-bold mb-5">OUR SERVICES</h1>
          {serviceList.map((service, index) => {
            return <Service key={index} title={service} />;
          })}
        </div>

        <div className="flex flex-col  gap-4  grow p-10">
          <h1 className="font-bold mb-5">CONTACT INFO</h1>
          {contactList.map((contact, index) => {
            return (
              <Contact key={index} title={contact.title} icon={contact.icon} />
            );
          })}
        </div>
        <div className="flex flex-col gap-4 grow  p-10">
          <h1 className="font-bold mb-5">LINKS</h1>
          {linkList.map((link, index) => {
            return <Links key={index} title={link.title} icon={link.icon} />;
          })}
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mb-5">
        {socialMediaList.map((icon, index) => {
          return <SocialMedia key={index} icon={icon} />;
        })}
      </div>
      <div className="flex justify-center text-xs mb-5">
        © Copyright 2020 Nilo Theme by Hilina
      </div>
    </footer>
  );
}

export default Footer;
