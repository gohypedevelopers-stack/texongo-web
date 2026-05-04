"use client";
import { useState } from "react";
import styles from "./page.module.css";

const faqs = [
  {
    q: "Looking for high-quality knit fabric?",
    a: "Absolutely! If you're on the hunt for high-quality knit fabric, Texongo is an excellent choice. They offer a wide variety of textures and patterns, ensuring you find the perfect match for your project. Their fabrics are known for their durability and softness, making them ideal for everything from apparel to home decor. Plus, the customer service is top-notch, ready to help you with any questions. Happy sewing!"
  },
  {
    q: "How can we assist you today?",
    a: "Thank you for reaching out! At Texongo, we’re here to help you find the perfect high-quality knit fabric for your needs. Whether you have specific questions about our fabric options, need assistance with ordering, or are looking for design inspiration, feel free to ask or call our customer service 9301598498!"
  },
  {
    q: "Whether you need fabric samples, pricing information, or help with bulk orders, we're here to help!",
    a: "Absolutely! Whether you need fabric samples, pricing information, or assistance with bulk orders, we're here to help. You can visit our website to explore our extensive selection and find all the details you need. If you have any specific questions or need further assistance, don’t hesitate to reach out!"
  },
  {
    q: "What is the typical lead time for orders from Texongo?",
    a: "At Texongo, we keep most of our fabrics in stock for quick fulfilment. For items that aren't in stock, we typically aim for a turnaround time of 20 to 30 days. If you have specific needs or questions about your order, feel free to reach out—we're here to help! Whether you need fabric samples, pricing information, or assistance with bulk orders, we're here to help! Just let us know what you need, and you can also visit our website for more details. We're committed to making your experience smooth and enjoyable!"
  },
  {
    q: "Can you help with fabric recommendations based on my project needs?",
    a: "Absolutely! We’d love to help with fabric recommendations tailored to your project needs. If you can share details about your project—such as the type, desired characteristics, and any specific styles or themes, like a tech pack or mood board—we’ll suggest the perfect fabrics for you. You can also check out our website for more inspiration and options!"
  },
  {
    q: "Can you provide information on the care instructions for your knit fabrics?",
    a: "Of course! Care instructions for our knit fabrics can vary depending on the specific material, but generally, we recommend the following:\n1. Washing: Use cold water on a gentle cycle to help maintain the fabric’s integrity and colour.\n2. Drying: Air dry whenever possible. If using a dryer, choose a low heat setting to prevent shrinkage.\n3. Ironing: Use a low heat setting and avoid direct contact with the fabric to prevent damage.\nFor specific care instructions, we recommend getting our fabric tested to ensure you have all the details you need. If you have a particular fabric in mind, let us know, and we can provide tailored care tips!"
  },
  {
    q: "Do you have a catalogue or online portfolio of your knit fabric offerings?",
    a: "Yes, we do have a catalogue of our knit fabric offerings! You can check our website for the full selection. Additionally, consider taking advantage of our fabric subscription service, where you'll receive a quarterly collection of new fabric swatches that align with seasonal trends. It’s a great way to stay updated with the latest styles!"
  },
  {
    q: "What are the most popular knit fabrics among your customers?",
    a: "Sure! Here are some of the most popular knit fabrics among our customers:\n1. Cotton Jersey: Loved for its softness and breathability, this fabric is perfect for t-shirts, dresses, and casual wear.\n2. French Terry: This fabric combines comfort with style, making it ideal for sweatshirts and loungewear, with a lovely looped texture on one side.\n3. Rib Knit: A favourite for its excellent stretch and recovery, rib knit is perfect for fitted garments like cuffs, necklines, and dresses.\n4. Interlock Knit: Known for its durability and smooth texture, interlock knit works well for both activewear and casual pieces, offering a refined look.\n5. Bamboo Knit: Eco-friendly and incredibly soft, this fabric drapes beautifully and is perfect for making comfortable tops and dresses.\n6. Polyester Knit: Durable and moisture-wicking, polyester knit is great for activewear and garments that require a bit more stretch and resilience.\nIf you have a specific project in mind, let us know, and we can help you find the perfect fabric to match your needs!"
  },
  {
    q: "How do you ensure the quality of your knit fabrics?",
    a: "At Texongo, quality is our top priority! We ensure it by sourcing premium materials from trusted suppliers and subjecting each fabric to rigorous testing for durability and performance. Our skilled team pays meticulous attention to detail during production, and we conduct thorough inspections to catch any issues before delivery. Additionally, we value customer feedback to continuously improve our offerings. With us, you can trust that you’re getting knit fabrics that not only look great but also last! If you have any questions, just let us know!"
  },
  {
    q: "Can you accommodate rush orders for urgent projects?",
    a: "Yes, we can accommodate rush orders for urgent projects! Just let us know your timeline, and we’ll do our best to meet your needs. Our team is here to help you get the fabrics you need as quickly as possible, so feel free to reach out with any specific requirements!"
  },
  {
    q: "What shipping options do you provide for fabric orders?",
    a: "We offer a variety of shipping options for fabric orders to meet your needs. You can choose from standard shipping for budget-friendly delivery, as well as expedited options for faster service. We partner with reliable carriers to ensure your order arrives safely and on time. If you have specific shipping requirements or need assistance selecting the best option for your project, feel free to reach out!"
  },
  {
    q: "Can I speak to a representative for personalized assistance? (How can I connect with Texongo’s customer support?)",
    a: "At Texongo, we prioritize personalized support. If you have specific questions or need assistance that isn't covered in our FAQs, please feel free to reach out to our customer service team at 9301598498. We're here to ensure you get the same high-quality assistance for any inquiry, and if your question requires more specific expertise, we'll redirect you to the right representative for personalized help."
  },
  {
    q: "Are there any fabric trends I should know about?",
    a: "Absolutely! Staying updated with fabric trends is essential, and that's why we recommend our fabric subscription service. With this subscription, you'll receive quarterly updates on the latest trends and a curated collection of new fabrics, keeping you informed about what’s hot in the market. Alternatively, you can always check our website for the latest offerings and trend insights. If you have any questions or need more information, feel free to reach out!"
  },
  {
    q: "What fabric is best for summer/winter clothing?",
    a: "For summer clothing, lightweight and breathable fabrics are ideal. We recommend cotton jersey, linen, and bamboo knits as they help keep you cool and comfortable in the heat. For winter clothing, opt for warmer and thicker fabrics. French terry, wool blends, and sweater knits are excellent choices, providing insulation and cosiness. If you need specific recommendations based on your project, feel free to ask or call our customer service 9301598498!"
  },
  {
    q: "What’s the difference between knit and woven fabrics?",
    a: "The primary difference lies in their construction:\n- Knit fabrics: made by interlocking loops of yarn, providing stretch and flexibility. Ideal for comfortable garments like t-shirts and activewear.\n- Woven fabrics: created by interlacing two sets of yarn at right angles, resulting in a firmer, structured material. Perfect for items like shirts and trousers.\nEach type has its unique benefits depending on your project needs."
  },
  {
    q: "Can I get help with fabric measurements or yardage calculations?",
    a: "At Texongo, we recommend consulting a fabric calculator or guidelines based on your specific pattern to determine the right measurements and yardage needed for your project. If you have questions about our fabrics or need assistance finding the right materials, feel free to reach out!"
  },
  {
    q: "What fabric weights do you offer (light, medium, heavy)?",
    a: "At Texongo, we offer a variety of fabric weights to suit different projects. Our lightweight fabrics are perfect for summer garments, t-shirts, and flowy dresses, while medium weight fabrics are ideal for versatile items like casual tops, skirts, and lightweight outerwear. For structured pieces, winter apparel, and cozy sweatshirts, we provide heavyweight fabrics. If you have a specific project in mind, feel free to reach out, and we can help you find the right weight for your needs!"
  },
  {
    q: "Do you have organic fabric options?",
    a: "Yes, at Texongo, we do offer organic fabric options! We understand the growing demand for sustainable materials, and our selection includes high-quality organic cotton and other eco-friendly fibres. These fabrics are not only better for the environment but also provide the softness and durability you need for your projects. If you're interested in exploring our organic options or need specific recommendations, feel free to reach out, and we'll be happy to assist you!"
  },
  {
    q: "How do I know which fabric will stretch properly for my design?",
    a: "To determine which fabric will stretch properly for your design, we recommend checking the fabric's fall and drape on our 3D model. This feature allows you to visualise how different fabrics behave in various styles, helping you make an informed decision based on your design needs. You can explore this and more on our website. If you have any specific requirements or need further assistance, feel free to reach out, and we’ll be glad to help you find the perfect fabric!"
  },
  {
    q: "What certifications do your fabrics have (e.g., GOTS, OEKO-TEX)?",
    a: "Many of our fabrics are sourced with key certifications such as GOTS (Global Organic Textile Standard) and OEKO-TEX, ensuring they meet high environmental and safety standards. If you need specific certification details for a particular fabric, please contact us, and we'll provide the necessary documentation."
  },
  {
    q: "What happens if my order is delayed or damaged during shipping?",
    a: "We take great care to ensure that your order is shipped properly and securely. Our dedicated team follows strict protocols to minimize the risk of delays or damage during shipping. While issues can sometimes arise, we prioritize quality control and work closely with our shipping partners to ensure your order arrives safely and on time. If you have any concerns, please feel free to reach out, and we’ll be happy to assist you!"
  },
  {
    q: "Can you explain the difference between various knit fabric types?",
    a: "Certainly! At Texongo, we offer several types of knit fabrics, each with unique characteristics:\n1. Cotton jersey is soft and breathable, making it perfect for t-shirts and casual wear.\n2. French terry features a looped texture, offering cosiness and warmth without being too heavy.\n3. Rib knit has vertical ribs that provide great stretch and recovery, making it perfect for fitted garments.\n4. Interlock knit boasts a smooth finish on both sides, making it durable and versatile.\n5. Bamboo knit is eco-friendly and incredibly soft, draping beautifully.\nIf you need help choosing, feel free to reach out!"
  },
  {
    q: "Are your knit fabrics suitable for all seasons?",
    a: "Yes, our knit fabrics are suitable for all seasons! We offer a diverse range of options that cater to different climate needs.\n- Lightweight knits, like cotton jersey and bamboo knit, are perfect for warm weather.\n- Heavier fabrics like French terry and sweater knits offer warmth and cosiness for cooler seasons.\nWith our versatile selection, you can find the right fabric for any season and project. If you need specific recommendations, just let us know!"
  },
  {
    q: "How does your 3D visualisation process work?",
    a: "Our 3D visualisation process at Texongo is designed to enhance your design experience. With our advanced 3D modelling, you can see how different fabrics will drape and fall on actual designs. This allows you to visualise the texture, movement, and fit of your chosen fabrics in real time. By checking the fall and drape, you can make informed decisions about fabric selection and design details, ensuring that the final product meets your expectations. If you're interested in exploring our 3D capabilities, feel free to reach out!"
  },
  {
    q: "How do I update my preferences or shipping address for the subscription?",
    a: "To update your preferences or shipping address for your Texongo subscription, simply text or call them using your registered number. They should be able to assist you with the updates. If you have any other questions, feel free to ask or call our customer service 9301598498!"
  },
  {
    q: "How does 3D visualisation help in the design process?",
    a: "At Texongo, the 3D visualisation concept significantly enhances the design process by providing realistic models that bring fabric designs to life. This allows designers to accurately visualise patterns and textures, improving clarity in presentations to clients and team members. The ability to quickly iterate on designs accelerates feedback and refinement, while early identification of potential issues helps minimize errors and reduce costs. Overall, it streamlines creativity and efficiency."
  },
  {
    q: "Can I gift a swatch subscription to someone else?",
    a: "Yes, you can definitely gift a swatch subscription to someone else at Texongo! It’s a fantastic gift, especially for someone in the same industry. They’ll appreciate the opportunity to explore new fabrics and designs!"
  },
  {
    q: "What sets Texongo apart from other knit fabric companies?",
    a: "Texongo stands out through its commitment to innovation, quality, and customization. We offer a diverse range of high-quality fabrics, supported by advanced 3D visualisation tools that enhance the design process. Our focus on sustainability ensures that our materials are eco-friendly, and our customer-centric approach allows for personalised service and tailored solutions. Additionally, we provide unique swatch subscription options, enabling clients to explore and experiment with various fabrics easily."
  },
  {
    q: "What industries do you typically work with?",
    a: "We typically work with a wide range of industries, including buying houses, export houses, and many brands. Our diverse client base allows us to cater to various needs and preferences in the fabric market."
  },
  {
    q: "Is shipping included in the swatch subscription fee?",
    a: "Yes, shipping is included in the swatch subscription fee, and we also offer free delivery for orders up to 5 kg, as long as your membership is active. This ensures a convenient experience for our subscribers!"
  },
  {
    q: "Do you offer fabric swatch books for designers?",
    a: "While we don't offer traditional swatch books, our subscription includes quarterly folders featuring our latest knit fabric collections. Each folder contains 12 to 20 fabric options curated based on seasonal colours and fabric trends, providing designers with fresh inspiration every season!"
  },
  {
    q: "Can I place a custom dyeing or printing order?",
    a: "Yes, you can place a custom dyeing order with us, as we accommodate specific colours and quantities. However, for printing, we only develop the fabric itself. Let us know your needs, and we’ll be happy to assist!"
  },
  {
    q: "What are your terms for long-term partnerships or collaborations?",
    a: "We are open to long-term partnerships and collaborations! Simply connect with us to discuss your ideas and explore how we can work together to achieve mutual success. We look forward to hearing from you!"
  },
  {
    q: "What is the best fabric for making activewear or sportswear?",
    a: "For activewear and sportswear, we recommend moisture-wicking and stretchy fabrics. Polyester-spandex blends, nylon-spandex, and high-performance interlocks are excellent choices as they provide the necessary stretch, durability, and moisture management for athletic activities."
  },
  {
    q: "Can I reorder a fabric I purchased earlier?",
    a: "Yes, you can reorder a fabric you purchased earlier, as long as it’s in our stock. If it’s unavailable, we can explore similar options or alternatives that meet your needs, and we can also redevelop the same count and construction for you. Just reach out, and we’ll be glad to assist!"
  },
  {
    q: "Can I see customer reviews or feedback on your fabrics?",
    a: "Yes, you can find customer reviews and feedback on our fabrics! We encourage you to check our website or social media platforms, where many clients share their experiences. If you have specific questions or need more insights, feel free to reach out to us directly!"
  },
  {
    q: "What’s the best way to match fabric colours online?",
    a: "To effectively match fabric colours online, start by using Pantone for standardised colour references. Request swatch samples to compare actual textures and shades, and utilize online colour matching tools for precision. Always check colours in natural light for the best accuracy."
  },
  {
    q: "How do you handle fabric out of stock or backorder situations?",
    a: "In the event of fabric being out of stock or on backorder, we promptly notify our customers about the situation. We provide estimated restock dates and offer alternative options or similar fabrics if available. Our goal is to ensure a seamless experience, so we work closely with you to find solutions that meet your needs."
  },
  {
    q: "What is your fabric swatch subscription, and how does it work?",
    a: "Our fabric swatch subscription at Texongo provides a curated selection of our latest knit fabrics, delivered quarterly. When you sign up, you’ll receive a folder containing 12 to 20 fabric options chosen based on seasonal colours and trends. This allows you to explore and experiment with new designs for your projects while staying inspired by our innovative offerings."
  },
  {
    q: "What fabrics are included in the swatch subscription?",
    a: "The swatch subscription includes a diverse range of knit fabrics, carefully selected based on seasonal trends and colours. You can expect options such as jersey, ribbed knits, interlocks, and more, showcasing various textures and patterns."
  },
  {
    q: "How often will I receive new swatches?",
    a: "You will receive new swatches quarterly with your subscription. Each delivery includes a curated selection of 12 to 20 fabric options, keeping you updated on the latest trends and seasonal colours throughout the year!"
  },
  {
    q: "Is there a fee for the swatch subscription?",
    a: "Yes, there is a fee for the swatch subscription, which is ₹2499 per year. This fee covers the quarterly deliveries of curated fabric swatches, providing you with a fantastic way to explore our latest offerings!"
  },
  {
    q: "Can I cancel or pause my swatch subscription at any time?",
    a: "Yes, you can cancel or pause your swatch subscription at any time. Just reach out to us, and we’ll assist you with the process to ensure it’s convenient for you!"
  },
  {
    q: "Will I be notified when new swatches are added to the collection?",
    a: "Yes, you will be notified when new swatches are added to the collection! We keep our subscribers updated about the latest additions and seasonal releases, ensuring you never miss out on new fabrics."
  },
  {
    q: "Can I purchase the fabrics included in my swatch subscription directly?",
    a: "Absolutely! You can purchase the fabrics included in your swatch subscription directly. Just visit our website, browse our inventory, and add your favourites to your cart. Plus, enjoy free delivery within Delhi NCR for orders under 5 kg."
  },
  {
    q: "Do you offer discounts on full fabric orders for swatch subscribers?",
    a: "Yes, we offer discounts of up to 25% on full fabric orders for swatch subscribers. This allows you to enjoy significant savings on your fabric purchases!"
  },
  {
    q: "What happens if I don’t like the fabrics in my subscription?",
    a: "If you don’t like the fabrics in your subscription, you’re welcome to visit our store to explore other options. We have a wide variety of fabrics available, and our team can help you find something that suits your taste. Your satisfaction is important to us!"
  },
  {
    q: "Is shipping included in the swatch subscription fee?",
    a: "Yes, shipping is included in the swatch subscription fee, making it convenient for you to receive your fabrics without any additional costs!"
  },
  {
    q: "What types of fabrics do you offer?",
    a: "At Texongo, we offer a diverse range of fabrics to suit various design needs. Our selection includes knits (jersey, ribbed knits, interlocks), woven fabrics (twill, satin, canvas), and various blends. We also have eco-friendly options made from recycled or organic materials."
  },
  {
    q: "What is the difference between natural and synthetic fabrics?",
    a: "Natural fabrics (cotton, linen, wool, silk) are made from plant or animal fibres, are breathable and biodegradable. Synthetic fabrics (polyester, nylon, acrylic) are man-made, typically more durable and wrinkle-resistant, but may be less breathable."
  },
  {
    q: "How do I care for different types of fabrics?",
    a: "Care instructions vary: generally, use cold water for washing, air dry or use low heat, and iron on low settings. Always check the specific care label or request testing for detailed instructions tailored to your chosen material."
  },
  {
    q: "What are the best fabrics for specific uses (e.g., activewear, formal wear)?",
    a: "When it comes to choosing the best fabrics, each has its specialty:\n- Activewear: moisture-wicking polyester and stretchy nylon with spandex for that perfect fit.\n- Formal wear: luxurious silk, classic wool, or versatile polyester blends.\n- Casual wear: breathable cotton, lightweight linen, and durable denim.\n- Nightwear: soft modal or classic cotton, and warm flannel for chilly evenings.\n- Outerwear: warm fleece and insulating down."
  },
  {
    q: "Can I order fabric samples before purchasing?",
    a: "Yes, you can order fabric samples before purchasing! At Texongo, we offer the option to request samples, allowing you to see and feel the fabric quality before making your decision."
  },
  {
    q: "How do I choose the right fabric for my project?",
    a: "Start by defining your project’s purpose. Feel the fabric for texture and drape, and consider stretch requirements. Don't forget care requirements and weight; lighter fabrics for flowy designs, heavier options for structure. Subscribing to Texongo also gives you access to curated seasonal collections to help you choose."
  },
  {
    q: "What is the fabric weight, and why does it matter?",
    a: "Fabric weight is measured in grams per square metre (GSM). It influences drape, warmth, and stretch: heavier knits offer structure and durability, while lighter ones provide flow and breathability. Choosing the right weight ensures your garment looks, feels, and performs as intended."
  },
  {
    q: "How can I tell if a fabric is of high quality?",
    a: "To assess fabric quality, check the following:\n1. Fibre content: high-quality options like Supima cotton, bamboo, and Australian merino wool.\n2. Weight and Feel: quality fabrics should feel substantial and soft.\n3. Construction: look for tight, even stitches and smooth finishes without pilling.\n4. Resilience: durable fabrics resist wear and return to shape easily.\n5. Appearance: vibrant, consistent colours and manageable care instructions."
  },
  {
    q: "What is the best way to store fabrics?",
    a: "Store fabrics in a cool, dry place away from direct sunlight. Fold or roll them to prevent creasing and use breathable containers. For delicate fabrics, consider using acid-free tissue paper for extra protection."
  },
  {
    q: "How can I determine the right fabric for different body types?",
    a: "Consider weight and drape: curvier figures often benefit from fabrics with good stretch and structure like jersey/spandex blends. Straighter body types can be complemented by softer, flowy fabrics like Modal or bamboo. Always consider how the fabric silhouette aligns with the garment style."
  },
  {
    q: "What are the environmental impacts of fabric production?",
    a: "Impacts vary: conventional cotton uses significant water and pesticides, while synthetics can contribute to microplastics. Sustainable options like organic or recycled fabrics have a lower footprint. At Texongo, we prioritize eco-friendly practices to minimize these impacts."
  },
  {
    q: "Can I mix different types of fabrics in one garment?",
    a: "Yes, you can mix different types of fabrics in one garment! Combining fabrics adds texture and visual interest. Just ensure they complement each other in terms of weight, stretch, and drape, and consider how they will interact during laundering."
  },
  {
    q: "What should I consider when selecting fabrics for children's clothing?",
    a: "Prioritize softness, breathability, and durability. Opt for natural fibres like cotton or bamboo for comfort. Consider ease of care, as children's clothing requires frequent washing, and avoid overly delicate materials."
  },
  {
    q: "Are there specific fabrics recommended for summer versus winter?",
    a: "Yes! For summer, choose lightweight, breathable fabrics like cotton, linen, and rayon. For winter, opt for warmer, insulating fabrics like wool, fleece, and heavier knits. Layering also helps in transitioning between seasons."
  },
  {
    q: "What are the most common fabric blends, and what are their benefits?",
    a: "Common blends include cotton-polyester (breathability + durability), wool-nylon (strength + stretch), and rayon-spandex (softness + elasticity). Blends combine the best qualities of individual fibres for better performance and easier care."
  },
  {
    q: "How do I troubleshoot fabric issues during a project?",
    a: "Identify the problem (puckering, fraying, fading) and adjust your technique: use the correct needle/stitch type, use a zigzag stitch/serger for fraying, and prewash fabrics or use color catchers to prevent bleeding."
  },
  {
    q: "What is the difference between lining and interfacing?",
    a: "Lining finishes the inside of a garment for comfort and aesthetics. Interfacing is a stiffer material used to reinforce and stabilize specific areas like collars, cuffs, and waistbands."
  },
  {
    q: "Can I customize my fabric order in terms of patterns or prints?",
    a: "Yes, you can customize your fabric order with specific patterns or prints! At Texongo, we can help you develop unique designs tailored to your vision. Reach out to discuss your ideas."
  },
  {
    q: "What safety precautions should I take when working with fabrics and sewing tools?",
    a: "Handle sharp tools with care, use cutting mats, store tools safely away from children, and maintain a tidy workspace. Follow care instructions for fabrics, especially when using dyes or chemical treatments."
  },
  {
    q: "What should I consider when choosing fabric for a specific climate?",
    a: "Consider weight and breathability: lightweight cotton/linen/rayon for hot/humid climates; wool/fleece/thermal blends for cold. Moisture-wicking fabrics are beneficial in both extremes to manage moisture."
  },
  {
    q: "Can I request a specific fabric weight for my order?",
    a: "Yes, you can request a specific fabric weight for your order! At Texongo, we aim to accommodate your needs, so just let us know your requirements, and we’ll do our best to provide suitable options."
  },
  {
    q: "What are the benefits of using eco-friendly fabrics?",
    a: "Eco-friendly fabrics reduce environmental impact, are often biodegradable, and free from harmful chemicals. Using them supports sustainable fashion and reduces your personal carbon footprint."
  },
  {
    q: "How do I select fabrics for quilting projects?",
    a: "For quilting, choose fabrics that complement each other in color and pattern. Cotton is preferred for its durability and ease of handling. Pre-wash your fabrics to prevent uneven shrinking later."
  },
  {
    q: "What are the latest trends in fabric design?",
    a: "Current trends include bold prints, textural mixes, and sustainable materials. Natural dyes, organic fibres, and high-performance blends are popular, as is unique digital printing for custom designs."
  },
  {
    q: "How can I test the breathability of a fabric?",
    a: "Try to blow air through the fabric; if it passes easily, it's breathable. Also, consider the weight and weave—lighter, looser weaves are generally more breathable."
  },
  {
    q: "Can I purchase fabrics for commercial use?",
    a: "Yes, we cater to commercial clients and bulk orders! Please contact us for commercial pricing and availability tailored to your business needs."
  },
  {
    q: "What safety measures do you take in fabric production?",
    a: "We prioritize safety by adhering to strict quality control standards, ethical sourcing, and ensuring our manufacturing partners follow safety regulations and provide safe working conditions."
  },
  {
    q: "How do I avoid fabric fading over time?",
    a: "Wash garments inside out in cold water, avoid direct sunlight for storage/drying, and use color-safe detergents to maintain vibrancy."
  },
  {
    q: "What types of fabrics are best for children’s clothing?",
    a: "Soft, breathable, and durable fabrics are best. Cotton is ideal for comfort and washing. Look for fabrics with stretch (jersey/spandex) for active play, and consider hypoallergenic options for sensitive skin."
  },
  {
    q: "Can I mix different fabric types in a single project?",
    a: "Yes! Mixing fabric types adds depth and interest. Just ensure they have similar care requirements and drape well together (e.g., combining canvas with cotton for a functional yet dynamic look)."
  },
  {
    q: "What’s the secret to choosing fabrics that pop?",
    a: "The secret lies in contrasting colors, bold patterns, and interesting textures. Look for vibrant hues that complement or clash strikingly, and mix prints like florals with stripes for visual excitement."
  },
  {
    q: "How can I make my fabric choices eco-chic?",
    a: "Opt for sustainable materials like organic cotton, hemp, or Tencel. Support brands that prioritize eco-friendly practices like low-impact dyes and fair trade sourcing."
  },
  {
    q: "What’s the best way to unleash my fabric creativity?",
    a: "Experiment with unexpected combinations! Pair textured fabrics with smooth ones, mix bold prints with solids, and create mood boards to visualize your ideas. Don't be afraid to try new techniques like dyeing."
  },
  {
    q: "How do I transform leftover fabric scraps into treasures?",
    a: "Use scraps for patchwork projects, small accessories (bags, pouches), or decorative elements. Fabric-covered buttons or unique appliqués are also great ways to ensure every piece is used."
  },
  {
    q: "What fabric trends should I keep an eye on this season?",
    a: "Keep an eye on bold oversized prints, textural mixes, and sustainable fabrics that tell a story. Vibrant colors and tactile materials that invite touch are also very popular right now."
  },
  {
    q: "How can I choose fabrics that tell a story?",
    a: "Understand their origin and construction. Look for unique textures, handwoven elements, or sustainably sourced materials that carry the heritage and artistry of their makers."
  },
  {
    q: "How do I make a bold statement with fabric prints?",
    a: "Choose oversized patterns or vibrant colors that demand attention. Mix prints in unexpected ways, like pairing florals with geometric designs, to create a striking look."
  },
  {
    q: "How do I ensure my fabrics stay vibrant for years?",
    a: "Wash inside out in cold water with gentle detergent, avoid bleach, and dry away from direct sunlight. Store in a cool, dry place to prevent premature aging."
  },
  {
    q: "What’s trending in fabric textures this season?",
    a: "Contrast is trending! Think soft, brushed fabrics paired with sleek, shiny materials. Velvets, corduroys, and quilted patterns are also very popular for adding dimension."
  },
  {
    q: "How can I incorporate seasonal colors into my fabric choices?",
    a: "Identify the trending palette for the season and select fabrics in those hues (e.g., deep burgundies for fall, vibrant pastels for spring). Layering complementary colors and textures creates a cohesive look."
  },
  {
    q: "How can I mix vintage and modern fabrics in my projects?",
    a: "Select a color palette that ties both styles together. Use modern fabrics for structure and vintage fabrics for accents like pockets or linings to add character and uniqueness."
  },
  {
    q: "What’s the importance of fabric drape in fashion design?",
    a: "Drape influences the garment's silhouette: fluid drapes create elegant, moving styles, while stiffer materials offer structure. The right drape ensures comfort and achieves the intended visual appeal."
  },
  {
    q: "How do I choose fabrics based on climate and function?",
    a: "Warm climates: lightweight, breathable linen or cotton. Cold climates: heavier wool, flannel, or thermal blends. For activewear, prioritize moisture-wicking and quick-drying properties regardless of climate."
  },
  {
    q: "What is a slub single jersey? Can I get a Slub Single jersey on the texongo site?",
    a: "Slub Single Jersey is a knit fabric characterized by its textured surface created from yarns of varying thickness. It’s breathable, stretchy, and ideal for casual garments. Yes, you can find Slub Single Jersey on the Texongo site."
  }
];


export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const toggle = (i: number) => setOpen((prev) => (prev === i ? null : i));
  const displayedFaqs = showAll ? faqs : faqs.slice(0, 3);

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
          {displayedFaqs.map((faq, i) => (
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
                  {faq.a.split('\n').map((line, lineIdx) => (
                    <p key={lineIdx} className="mb-2 last:mb-0">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {!showAll && faqs.length > 3 && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setShowAll(true)}
                className="px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#57AD43] transition-colors duration-300 shadow-xl"
              >
                Learn More
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
