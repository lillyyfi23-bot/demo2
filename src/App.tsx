import { useState } from 'react'
import {
  Search, Heart, ShoppingBag, LayoutDashboard, Compass, Sparkles,
  Shirt, Settings, Bell, ChevronRight, SlidersHorizontal, Menu, X,
  ArrowUpRight, Star, UserRound, Plus
} from 'lucide-react'

type Product = {
  id: number
  name: string
  category: string
  price: string
  color: string
  image: string
  tag?: string
}

const products: Product[] = [
  { id: 1, name: 'Linen Weekend Set', category: 'Clothing', price: '$68', color: 'Sand', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=700', tag: 'BESTSELLER' },
  { id: 2, name: 'Everyday Structure Bag', category: 'Accessories', price: '$84', color: 'Cognac', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700', tag: 'NEW' },
  { id: 3, name: 'Minimal Gold Hoops', category: 'Jewelry', price: '$32', color: 'Gold', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=700' },
  { id: 4, name: 'Soft Knit Cardigan', category: 'Clothing', price: '$76', color: 'Cream', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=700' },
  { id: 5, name: 'Classic City Sneakers', category: 'Shoes', price: '$92', color: 'White', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700' },
  { id: 6, name: 'Sunday Sunglasses', category: 'Accessories', price: '$45', color: 'Tortoise', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700' },
]

const categories = ['All pieces', 'Clothing', 'Accessories', 'Shoes', 'Jewelry']

export default function App() {
  const [active, setActive] = useState('Discover')
  const [category, setCategory] = useState('All pieces')
  const [query, setQuery] = useState('')
  const [saved, setSaved] = useState<number[]>([2])
  const [cart, setCart] = useState<number[]>([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const filtered = products.filter((product) => {
    const matchesCategory = category === 'All pieces' || product.category === category
    const matchesQuery = `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  })

  const toggleSaved = (id: number) => {
    setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  const addToCart = (id: number) => {
    setCart((current) => [...current, id])
    setShowToast(true)
    window.setTimeout(() => setShowToast(false), 2200)
  }

  const navItems = [
    { label: 'Discover', icon: Compass },
    { label: 'My wardrobe', icon: Shirt },
    { label: 'Saved items', icon: Heart },
    { label: 'Style assistant', icon: Sparkles },
  ]

  return (
    <div className="min-h-screen bg-[#f8f7fa] text-ink">
      <header className="sticky top-0 z-30 border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 md:px-10">
          <div className="flex items-center gap-3">
            <button className="rounded-xl p-2 hover:bg-gray-100 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#7866d9] text-white"><Sparkles size={21} /></div>
            <div><div className="text-[19px] font-extrabold tracking-tight">smartstyle<span className="text-lilac">.</span></div><div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-muted">YOUR STYLE, REIMAGINED</div></div>
          </div>
          <div className="hidden w-full max-w-[390px] items-center gap-2 rounded-full bg-[#f5f4f8] px-4 py-3 md:flex">
            <Search size={17} className="text-muted" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search pieces, styles, brands..." className="w-full bg-transparent text-sm outline-none placeholder:text-[#aaa7b7]" />
            <span className="text-[10px] text-muted">⌘ K</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-full p-2.5 hover:bg-gray-100" aria-label="Notifications"><Bell size={19} /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-pink-500" /></button>
            <button className="relative rounded-full p-2.5 hover:bg-gray-100" aria-label="Shopping bag"><ShoppingBag size={19} /><span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-lilac px-1 text-[9px] text-white">{cart.length}</span></button>
            <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-[#f0dfe8] text-sm font-bold text-[#80546c] sm:flex">JD</div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1440px]">
        <aside className={`${menuOpen ? 'block' : 'hidden'} fixed inset-y-[76px] left-0 z-20 w-[260px] border-r border-black/5 bg-white p-6 md:sticky md:top-[76px] md:block md:h-[calc(100vh-76px)] md:w-[245px]`}>
          <div className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#aaa7b7]">Workspace</div>
          <nav className="space-y-1">
            {navItems.map(({ label, icon: Icon }) => (
              <button key={label} onClick={() => { setActive(label); setMenuOpen(false) }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${active === label ? 'bg-[#f0edff] text-[#6d5acb]' : 'text-[#77758a] hover:bg-gray-50 hover:text-ink'}`}>
                <Icon size={18} />{label}
                {label === 'Saved items' && <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-[10px]">{saved.length}</span>}
              </button>
            ))}
          </nav>
          <div className="my-7 border-t border-black/5" />
          <div className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#aaa7b7]">Preferences</div>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#77758a] hover:bg-gray-50"><Settings size={18} /> Settings</button>
          <div className="absolute bottom-6 left-6 right-6 hidden rounded-2xl bg-[#f8f5ff] p-4 md:block">
            <div className="mb-2 flex items-center gap-2 text-sm font-bold"><Sparkles size={16} className="text-lilac" /> Style tip</div>
            <p className="text-xs leading-5 text-muted">Build a capsule wardrobe with versatile pieces you love wearing.</p>
            <button onClick={() => setActive('Style assistant')} className="mt-3 text-xs font-bold text-lilac">Explore tips <ArrowUpRight size={13} className="inline" /></button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-5 py-7 md:px-10 md:py-9">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
            <div><p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-lilac">THURSDAY, YOUR STYLE DAY</p><h1 className="text-3xl font-extrabold tracking-tight md:text-[34px]">{active === 'Discover' ? 'Find your next favorite.' : active}</h1><p className="mt-2 text-sm text-muted">A little inspiration for wherever today takes you.</p></div>
            <button onClick={() => setActive('Style assistant')} className="flex items-center gap-2 rounded-full bg-[#7866d9] px-5 py-3 text-xs font-bold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:bg-[#6654c3]"><Sparkles size={15} /> Get style advice</button>
          </div>

          <section className="relative mb-9 overflow-hidden rounded-[26px] bg-[#29243c]">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1500" alt="Friends exploring a fashion collection" className="absolute inset-0 h-full w-full object-cover opacity-35" />
            <div className="relative max-w-[570px] px-7 py-10 text-white md:px-11 md:py-14">
              <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-[10px] font-bold tracking-[0.18em]">THE EDIT — SPRING COLLECTION</span>
              <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight md:text-[42px]">Less scrolling.<br />More feeling like you.</h2>
              <p className="mt-3 max-w-[390px] text-sm leading-6 text-white/75">Discover thoughtfully selected pieces that make getting dressed the best part of your day.</p>
              <button onClick={() => { setCategory('All pieces'); setActive('Discover') }} className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold text-[#29243c] hover:bg-[#f0edff]">Explore the edit <ChevronRight size={15} /></button>
            </div>
          </section>

          <section>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div><h2 className="text-xl font-extrabold tracking-tight">Picked for your mood</h2><p className="mt-1 text-xs text-muted">Pieces selected to fit your everyday aesthetic</p></div>
              <button className="text-xs font-bold text-lilac" onClick={() => setCategory('All pieces')}>View all <ArrowUpRight size={13} className="inline" /></button>
            </div>
            <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
              {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-bold transition ${category === item ? 'bg-[#29243c] text-white' : 'bg-white text-muted hover:bg-[#f0edff]'}`}>{item}</button>)}
              <button className="ml-auto hidden items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-muted md:flex"><SlidersHorizontal size={14} /> Filters</button>
            </div>

            {active === 'Style assistant' && <div className="mb-5 rounded-2xl border border-[#e5defe] bg-[#f5f2ff] p-5"><div className="flex items-center gap-2 font-bold"><Sparkles size={17} className="text-lilac" /> Your style assistant</div><p className="mt-2 text-sm text-muted">Try pairing the Linen Weekend Set with the Everyday Structure Bag for an easy, polished look.</p></div>}
            {active === 'My wardrobe' && <div className="mb-5 rounded-2xl bg-white p-5 text-sm text-muted">Your digital wardrobe is ready. Save pieces you own or love to start building your collection.</div>}
            {active === 'Saved items' && <div className="mb-5 rounded-2xl bg-white p-5 text-sm text-muted">You have saved {saved.length} {saved.length === 1 ? 'piece' : 'pieces'}.</div>}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.filter((p) => active !== 'Saved items' || saved.includes(p.id)).map((product) => (
                <article key={product.id} className="group overflow-hidden rounded-[20px] bg-white shadow-[0_4px_24px_rgba(40,30,70,0.04)] transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(40,30,70,0.10)]">
                  <div className="relative h-[235px] overflow-hidden bg-[#f1eff3]">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    {product.tag && <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-extrabold tracking-[0.14em]">{product.tag}</span>}
                    <button onClick={() => toggleSaved(product.id)} className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#77758a] hover:text-pink-500" aria-label="Save item"><Heart size={17} fill={saved.includes(product.id) ? '#e879a4' : 'none'} color={saved.includes(product.id) ? '#e879a4' : 'currentColor'} /></button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2"><div><h3 className="text-sm font-bold">{product.name}</h3><p className="mt-1 text-xs text-muted">{product.category} · {product.color}</p></div><span className="text-sm font-extrabold">{product.price}</span></div>
                    <button onClick={() => addToCart(product.id)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#e9e6ef] py-2.5 text-xs font-bold transition hover:border-lilac hover:bg-[#f7f5ff] hover:text-lilac"><Plus size={14} /> Add to bag</button>
                  </div>
                </article>
              ))}
            </div>
            {filtered.length === 0 && <div className="rounded-2xl bg-white p-10 text-center text-sm text-muted">No pieces found. Try another search or category.</div>}
          </section>

          <footer className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-black/5 py-6 text-[11px] text-muted"><span>© 2025 SmartStyle Studio. Demo experience.</span><span className="flex items-center gap-1"><Star size={12} className="text-[#d6a74d]" /> Made for your everyday</span></footer>
        </main>
      </div>
      {showToast && <div className="fixed bottom-5 right-5 z-50 rounded-xl bg-[#29243c] px-5 py-3 text-sm font-semibold text-white shadow-xl"><ShoppingBag size={15} className="mr-2 inline" /> Added to your bag</div>}
    </div>
  )
}