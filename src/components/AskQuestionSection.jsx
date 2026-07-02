import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Send, CheckCircle2 } from "lucide-react";
import SectionHeading from "./ui/SectionHeading.jsx";
import Button from "./ui/Button.jsx";
import { fadeUp, stagger, inView } from "../lib/motion.js";

const FAQS = [
  {
    q: "Qanday kranlarni ta'mirlaysiz?",
    a: "Ko'prikli, kozlovoy, minorali va boshqa yuk ko'taruvchi kranlarning deyarli barcha turlarini ta'mirlaymiz — joriy ta'mirdan kapital tiklashgacha.",
  },
  {
    q: "Ekspertiza qancha vaqt oladi?",
    a: "Obyekt hajmi va murakkabligiga qarab, sanoat xavfsizligi ekspertizasi odatda 3–10 ish kunini oladi.",
  },
  {
    q: "Texnik hujjatlarni rasmiylashtirasizmi?",
    a: "Ha. Pasport, texnik kartalar va boshqa barcha zarur hujjatlarni amaldagi standartlarga muvofiq tayyorlab beramiz.",
  },
  {
    q: "Xizmat ko'rsatish hududi qayer?",
    a: "Toshkent shahri va butun O'zbekiston bo'ylab xizmat ko'rsatamiz. Kerak bo'lsa mutaxassislarimiz obyektga chiqadi.",
  },
];

function AccordionItem({ item, isOpen, onToggle, index }) {
  return (
    <motion.div
      variants={fadeUp}
      className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-soft"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${index}`}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-bold text-ink">{item.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-50 text-brand-600"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-ink-soft">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink outline-none transition-all duration-200 " +
  "placeholder:text-neutral-400 focus:ring-4";

export default function AskQuestionSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const [values, setValues] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Ismingizni kiriting.";
    if (!/^[+\d][\d\s()-]{6,}$/.test(values.phone.trim()))
      next.phone = "To'g'ri telefon raqamini kiriting.";
    if (values.message.trim().length < 5)
      next.message = "Savolingizni batafsilroq yozing.";
    return next;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSent(true);
      setValues({ name: "", phone: "", message: "" });
    }
  };

  const fieldRing = (field) =>
    errors[field]
      ? "border-red-400 focus:border-red-400 focus:ring-red-100"
      : "border-neutral-200 focus:border-brand-500 focus:ring-brand-100";

  return (
    <section id="faq" className="section scroll-mt-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Savol berish"
          title="Savolingiz **bormi?** Biz javob beramiz"
          subtitle="Yuk ko'taruvchi mashinalar bo'yicha har qanday savolingizni bering — mutaxassislarimiz siz bilan bog'lanadi."
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* FAQ accordion */}
          <motion.div
            variants={stagger}
            {...inView}
            className="flex flex-col gap-4"
          >
            {FAQS.map((item, i) => (
              <AccordionItem
                key={i}
                index={i}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.div variants={fadeUp} {...inView}>
            <div className="rounded-[var(--radius-card)] glass-strong p-7 shadow-soft sm:p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-ink">Rahmat!</h3>
                  <p className="mt-2 max-w-xs text-sm text-ink-soft">
                    Murojaatingiz qabul qilindi. Tez orada siz bilan
                    bog'lanamiz.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-6 text-sm font-semibold text-brand-700 hover:text-brand-800"
                  >
                    Yana savol berish
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  noValidate
                  className="flex flex-col gap-5"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-semibold text-ink"
                    >
                      Ism
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={values.name}
                      onChange={update("name")}
                      placeholder="Ismingiz"
                      aria-invalid={!!errors.name}
                      className={`${inputBase} ${fieldRing("name")}`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs font-medium text-red-500">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-sm font-semibold text-ink"
                    >
                      Telefon
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={values.phone}
                      onChange={update("phone")}
                      placeholder="+998 __ ___ __ __"
                      aria-invalid={!!errors.phone}
                      className={`${inputBase} ${fieldRing("phone")}`}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs font-medium text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-semibold text-ink"
                    >
                      Savolingiz
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={values.message}
                      onChange={update("message")}
                      placeholder="Savolingizni yozing..."
                      aria-invalid={!!errors.message}
                      className={`${inputBase} resize-none ${fieldRing("message")}`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs font-medium text-red-500">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    Savolni yuborish
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
