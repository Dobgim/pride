export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    category: 'Buying Guide',
    question: 'How do I choose the right mobility scooter for me?',
    answer:
      'Choosing the right scooter depends on where you plan to use it, how far you need to travel, and your physical requirements. Lightweight scooters are ideal for short trips and travelling in a car. Folding scooters are perfect for those who need a compact solution for holidays or public transport. Road scooters are best for longer outdoor journeys. Our expert team is available 7 days a week to help you find the perfect match.',
  },
  {
    id: 'faq-2',
    category: 'Buying Guide',
    question: 'Can I test-ride a scooter before buying?',
    answer:
      'Yes! We have showrooms across the UK where you can see and test our full range. We also offer home demonstrations in many areas, where a specialist will bring a selection of scooters directly to your door. Contact us to arrange a no-obligation demo.',
  },
  {
    id: 'faq-3',
    category: 'Delivery & Returns',
    question: 'How long does delivery take?',
    answer:
      'Most scooters are delivered within 3–5 working days. We offer free delivery on all scooters over £500. Our delivery team will contact you to arrange a convenient time slot and will bring the scooter directly into your home and demonstrate how to use it.',
  },
  {
    id: 'faq-4',
    category: 'Delivery & Returns',
    question: 'What is your returns policy?',
    answer:
      'We offer a 14-day no-quibble returns policy on all products. If you are not completely satisfied with your purchase, simply contact us within 14 days of delivery and we will arrange a free collection and full refund. The scooter must be in its original condition.',
  },
  {
    id: 'faq-5',
    category: 'Technical',
    question: 'How far can mobility scooters travel on a full charge?',
    answer:
      'This varies by model. Our lightweight scooters typically offer 20–30 km per charge, folding scooters 28–40 km, and road scooters up to 80 km. Battery range can be affected by terrain, user weight, and weather conditions. We always recommend charging overnight for a full day of use.',
  },
  {
    id: 'faq-6',
    category: 'Technical',
    question: 'Are mobility scooters road legal?',
    answer:
      'Class 2 scooters (up to 6 km/h) are permitted on pavements and paths. Class 3 scooters (up to 15 km/h) are road legal and can be used on single carriageways. Road scooters in our Class 3 range include all required lighting and reflectors. You do not need a driving licence, but you must be aged 14 or over.',
  },
  {
    id: 'faq-7',
    category: 'Technical',
    question: 'Can I take a mobility scooter on public transport?',
    answer:
      'Policies vary by transport provider. Most folding scooters, due to their compact size, are accepted on trains and some airlines (lithium battery models must meet airline guidelines). Class 2 scooters can be used on buses with a ramp. We recommend checking with your specific transport operator in advance.',
  },
  {
    id: 'faq-8',
    category: 'Servicing',
    question: 'Do you offer servicing and repairs?',
    answer:
      'Yes, we offer comprehensive servicing and repair packages. Our mobile technicians can visit your home, or you can use one of our service centres. We recommend an annual service to keep your scooter in peak condition. All service plans include a full safety check, battery health test, tyre inspection, and brake adjustment.',
  },
  {
    id: 'faq-9',
    category: 'Servicing',
    question: 'What warranty do the scooters come with?',
    answer:
      'All our scooters come with a minimum 1-year manufacturer warranty covering parts and labour. Many premium models include a 2 or 3-year warranty. Extended warranty packages are also available at checkout. Batteries are typically covered for 6–12 months.',
  },
  {
    id: 'faq-10',
    category: 'Buying Guide',
    question: 'Are there any government grants available?',
    answer:
      'In some circumstances, mobility scooters may be available through the NHS, local councils, or disability charity grants. We can provide guidance on applying for relevant funding. For VAT-registered disabled customers, scooters and accessories are zero-rated for VAT, saving you 20%. Our team can advise on your eligibility.',
  },
];
