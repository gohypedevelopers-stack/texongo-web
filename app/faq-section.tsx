"use client";
import { useState } from "react";
import styles from "./page.module.css";

const faqs = [
  {
    q: "What types of fabrics does Texongo offer?",
    a: "Texongo offers a wide range of fabric types including Rib, Pique, French Terry, Waffle, and Single Jersey knits. We also carry woven fabrics for women's wear, digital print textiles, and ethnic fabric lines. More text coming soon.",
  },
  {
    q: "Can I order fabric samples before bulk purchase?",
    a: "Yes, we offer sample swatches for most of our fabric lines. More text coming soon.",
  },
  {
    q: "What is the minimum order quantity?",
    a: "Minimum order quantities vary by fabric type. More text coming soon.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, Texongo ships to international destinations. More text coming soon.",
  },
  {
    q: "How does digital fabric printing work?",
    a: "Our digital print service allows you to print custom patterns on fabric. More text coming soon.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept bank transfers, UPI, and major credit/debit cards. More text coming soon.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen((prev) => (prev === i ? null : i));

  return (
    <section className={styles.faqSection}>
      <div className={styles.faqContainer}>
        {/* Left Side: Header */}
        <div className={styles.faqSideHeader}>
          <span className={styles.eyebrow}>Need Help?</span>
          <h2>Frequently<br />Asked<br />Questions</h2>
          <p>Everything you need to know about Texongo textiles, shipping, and our digital studio services.</p>
        </div>

        {/* Right Side: Accordion */}
        <div className={styles.faqList}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`${styles.faqItem} ${open === i ? styles.faqItemOpen : ""}`}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => toggle(i)}
                aria-expanded={open === i}
              >
                <span>{faq.q}</span>
                <span className={styles.faqIcon}></span>
              </button>

              <div className={styles.faqAnswer}>
                <div className={styles.faqAnswerInner}>
                  <p>{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
