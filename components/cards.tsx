import Image from 'next/image';
import Link from 'next/link';
import type { Cosmetic, Game } from '@/lib/content';
import { RARITY, itemImage } from '@/lib/content';
import type { Post } from '@/lib/server/posts';
import { readingMinutes } from '@/lib/markdown';
import { Icon } from './Icons';

export function GameCard({ game, priority = false }: { game: Game; priority?: boolean }) {
  return (
    <Link href={`/games/${game.id}`} className="group reveal relative block overflow-hidden rounded-[1.4rem] border border-white/10 bg-panel transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_30px_60px_-30px_rgba(233,185,73,0.6)]">
      <div className="relative aspect-[300/430]">
        <Image src={`/games/${game.id}.webp`} alt={`${game.title} cover art`} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 260px" className="object-cover transition duration-500 group-hover:scale-[1.04]" priority={priority} />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-[0.65rem] font-black uppercase tracking-[0.2em]" style={{ color: game.color }}>{game.genre}</p>
          <p className="mt-0.5 font-display text-xl text-white">{game.title}</p>
        </div>
      </div>
    </Link>
  );
}

export function PhoneFrame({ src, alt, priority = false, className = '' }: { src: string; alt: string; priority?: boolean; className?: string }) {
  return (
    <div className={`relative mx-auto w-full max-w-[290px] rounded-[2.6rem] border border-white/15 bg-gradient-to-b from-[#2a2a33] to-[#111116] p-2.5 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.9),0_0_80px_-30px_rgba(233,185,73,0.35)] ${className}`}>
      <div className="relative overflow-hidden rounded-[2.1rem] bg-black">
        <Image src={src} alt={alt} width={585} height={1266} sizes="290px" className="h-auto w-full" priority={priority} />
      </div>
      <div className="absolute left-1/2 top-4 h-5 w-24 -translate-x-1/2 rounded-full bg-black/90" />
    </div>
  );
}

export function CosmeticCard({ item }: { item: Cosmetic }) {
  const r = RARITY[item.rarity];
  return (
    <figure className="reveal overflow-hidden rounded-2xl border bg-panel" style={{ borderColor: r.color + '55', boxShadow: `0 20px 40px -30px ${r.color}` }}>
      <div className="relative aspect-square">
        <Image src={itemImage(item.id)} alt={`${item.name} — ${r.label} ${item.slot.toLowerCase()} cosmetic`} fill sizes="(max-width: 640px) 50vw, 220px" className="object-cover" />
      </div>
      <figcaption className="p-3">
        <p className="text-[0.62rem] font-black uppercase tracking-[0.2em]" style={{ color: r.color }}>{r.label} · {item.slot}</p>
        <p className="mt-0.5 truncate text-sm font-extrabold text-white">{item.name}</p>
      </figcaption>
    </figure>
  );
}

export function PostCard({ post, large = false }: { post: Post; large?: boolean }) {
  const date = new Date(post.publishAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return (
    <article className={`group reveal panel panel-hover relative flex flex-col overflow-hidden ${large ? 'lg:flex-row' : ''}`}>
      {post.coverImage && (
        <div className={`relative overflow-hidden bg-black ${large ? 'aspect-[16/10] lg:aspect-auto lg:w-1/2' : 'aspect-[16/10]'}`}>
          <Image src={post.coverImage} alt={post.coverAlt || post.title} fill sizes={large ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 640px) 100vw, 33vw'} className="object-cover object-top transition duration-500 group-hover:scale-[1.03]" />
        </div>
      )}
      <div className={`flex flex-1 flex-col p-5 ${large ? 'lg:p-8' : ''}`}>
        <div className="flex flex-wrap items-center gap-2 text-xs text-mist">
          <span className="chip !py-0.5 !text-gold">{post.kind === 'news' ? 'News' : post.category}</span>
          <time dateTime={post.publishAt}>{date}</time>
          <span aria-hidden="true">·</span>
          <span>{readingMinutes(post.body)} min read</span>
        </div>
        <h3 className={`mt-3 font-black leading-snug text-white ${large ? 'text-2xl lg:text-3xl' : 'text-lg'}`}>
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">{post.title}</Link>
        </h3>
        <p className="mt-2 line-clamp-3 leading-relaxed text-mist">{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-extrabold text-gold">Read <Icon name="arrow-right" size={16} className="transition group-hover:translate-x-1" /></span>
      </div>
    </article>
  );
}
