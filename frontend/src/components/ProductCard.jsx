import { useEffect,useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { addToWishlist,getWishlist,removeFromWishlist } from '../services/wishlistApi'

function ProductCard({id,name,description,price,image}) {
  const {addToCart}=useCart(), {isAuthenticated}=useAuth(), navigate=useNavigate()
  const [added,setAdded]=useState(false), [wishlisted,setWishlisted]=useState(false)
  useEffect(()=>{if(isAuthenticated)getWishlist().then(w=>setWishlisted((w?.products||[]).some(p=>p._id===id))).catch(()=>{});else setWishlisted(false)},[id,isAuthenticated])
  const toggle=async()=>{if(!isAuthenticated)return navigate('/login'); if(wishlisted){await removeFromWishlist(id);setWishlisted(false)}else{await addToWishlist(id);setWishlisted(true)}}
  const add=async()=>{try{await addToCart({id,name,description,price,image});setAdded(true);setTimeout(()=>setAdded(false),1200)}catch(e){alert(e.response?.data?.message||'Unable to add product.')}}
  return <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <button onClick={toggle} className="absolute right-3 top-3 z-10 text-2xl">{wishlisted?'❤️':'♡'}</button>
    <Link to={'/products/'+id} className="flex h-56 items-center justify-center bg-slate-100 p-5 dark:bg-slate-800"><img src={image} alt={name} className="h-full w-full object-contain"/></Link>
    <div className="flex flex-1 flex-col p-5"><h2 className="text-xl font-bold">{name}</h2><p className="mt-2 min-h-12 text-sm text-slate-600 dark:text-slate-400">{description}</p><p className="mt-4 text-xl font-bold">₹{Number(price).toLocaleString('en-IN')}</p>
    {added&&<p className="mt-2 text-sm text-green-600">✓ Added to cart</p>}
    <div className="mt-auto grid grid-cols-2 gap-3 pt-5"><Link to={'/products/'+id} className="rounded-xl border px-3 py-3 text-center text-sm font-semibold">Details</Link><button onClick={add} className="rounded-xl bg-slate-900 px-3 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-900">{added?'Added':'Add to Cart'}</button></div></div>
  </div>
}
export default ProductCard