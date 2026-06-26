import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqData = [
  {
    q: "Qanday qilib buyurtma berish mumkin?",
    a: "Mahsulotni tanlang, savatga qo'shing va rasmiylashtirish tugmasini bosing. Siz bilan tez orada bog'lanamiz."
  },
  {
    q: "To'lov usullari qanday?",
    a: "Biz Click, Payme va naqd pul orqali to'lovlarni qabul qilamiz. Yaqin orada onlayn karta orqali to'lov ham yo'lga qo'yiladi."
  },
  {
    q: "Yetkazib berish qancha vaqt oladi?",
    a: "Toshkent shahri bo'ylab 24 soat ichida, viloyatlarga esa 2-3 kun ichida yetkazib beriladi."
  },
  {
    q: "Mahsulotni qaytarish mumkinmi?",
    a: "Ha, mahsulotda nuqson bo'lsa yoki tavsifga mos kelmasa, 24 soat ichida qaytarishingiz mumkin."
  }
];

const infoCards = [
  { id: 'shipping', title: 'Yetkazib berish', text: "O'zbekiston bo'ylab 24 soat ichida yetkazib beramiz. Toshkent shahri ichida yetkazib berish bepul." },
  { id: 'returns', title: 'Qaytarish', text: 'Mahsulotni 24 soat ichida qaytarish yoki almashtirish imkoniyati mavjud (agar nuqson bo\'lsa).' },
  { id: 'privacy', title: 'Maxfiylik', text: 'Sizning ma\'lumotlaringiz biz bilan xavfsiz. Biz hech qachon shaxsiy ma\'lumotlarni uchinchi shaxslarga bermaymiz.' },
  { id: 'careers', title: 'Karyera', text: 'Biz bilan birga kelajakni quring. Yangi bo\'sh ish o\'rinlari uchun CV-ingizni yuboring.' },
  { id: 'news', title: 'Blog', text: 'Dunyodagi eng so\'nggi texnologik yangiliklar va maslahatlar bizning blogimizda.' }
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="faq-trigger"
      >
        <span className="faq-question">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={20} className="faq-icon" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="faq-content"
          >
            <p className="faq-answer">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InfoSection = () => {
  return (
    <section id="info" className="container section info-section-modern">
      <div className="info-grid-modern">
        <div id="faq" className="info-item-modern">
          <h2 className="section-title-small" style={{ marginBottom: '24px' }}>FAQ</h2>
          <div className="faq-accordions">
            {faqData.map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>

        {infoCards.map((card) => (
          <div key={card.id} id={card.id} className="info-item-modern">
            <h2 className="section-title-small">{card.title}</h2>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfoSection;
