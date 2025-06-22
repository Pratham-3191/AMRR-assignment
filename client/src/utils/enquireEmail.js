import emailjs from '@emailjs/browser';

export const sendEnquiryEmail = async (item) => {
  const templateParams = {
    to_email: 'prathamchaudhari134@gmail.com',
    item_name: item.name,
    item_type: item.type,
    item_description: item.description,
  };

  return emailjs.send(
    import.meta.env.VITE_SERVIVE_ID,
    import.meta.env.VITE_TEMPLATE_ID,
    templateParams,
    import.meta.env.VITE_PUBLIC_KEY,
  );
};
