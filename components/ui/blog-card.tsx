"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface BlogCardProps {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  href: string;
}

export function BlogCard({ title, date, excerpt, image, href }: BlogCardProps) {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col gap-6 group"
    >
      {/* Thumbnail */}
      <Link href={href} className="relative aspect-[16/10] overflow-hidden rounded-sm bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col gap-3">
        <Link href={href}>
          <h2 className="text-lg md:text-xl font-bold text-[#121212] leading-tight hover:text-[#57AD43] transition-colors line-clamp-2">
            {title}
          </h2>
        </Link>
        
        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <span>{date}</span>
          <span className="opacity-30">//</span>
          <span>No Comments</span>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
          {excerpt}
        </p>

        <Link 
          href={href}
          className="text-xs font-black uppercase tracking-widest text-[#57AD43] border-b border-transparent hover:border-[#57AD43] transition-all w-fit pb-1 mt-2"
        >
          Read More »
        </Link>
      </div>
    </motion.article>
  );
}
