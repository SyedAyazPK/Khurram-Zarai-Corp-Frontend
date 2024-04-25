import { FloatingWhatsApp } from "react-floating-whatsapp";

export const WhatsAppIcon = () => {
  return (
    <FloatingWhatsApp
      phoneNumber="+923412001000"
      accountName="Khurram Zarai"
      avatar="/assets/images/logo/logo.png"
      onSubmit={(e) => console.log(e)}
    />
  );
};
