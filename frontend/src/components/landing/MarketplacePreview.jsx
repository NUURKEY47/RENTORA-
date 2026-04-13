import { 
  RiMapPinLine, 
  RiMoneyDollarCircleLine, 
  RiHome3Line, 
  RiSearchLine,
  RiLayoutGridLine,
  RiPhoneLine
} from "react-icons/ri";
import { useState } from "react";

export default function MarketplacePreview() {
  const [showAll, setShowAll] = useState(false);

  const allProperties = [
    {
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      price: "KES 85,000",
      period: "/ Month",
      title: "Luxury 3-Bed Apartment",
      location: "Westlands, Nairobi",
      beds: 3,
      baths: 2,
      type: "Apartment"
    },
    {
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      price: "KES 120,000",
      period: "/ Month",
      title: "Modern Townhouse",
      location: "Karen, Nairobi",
      beds: 4,
      baths: 4,
      type: "Townhouse"
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      price: "KES 45,000",
      period: "/ Month",
      title: "Spacious Studio Deck",
      location: "Kilimani, Nairobi",
      beds: 1,
      baths: 1,
      type: "Studio"
    },
    {
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
      price: "KES 65,000",
      period: "/ Month",
      title: "Cozy 2-Bed Flat",
      location: "Kileleshwa, Nairobi",
      beds: 2,
      baths: 2,
      type: "Apartment"
    },
    {
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
      price: "KES 250,000",
      period: "/ Month",
      title: "Executive Mansion",
      location: "Runda, Nairobi",
      beds: 5,
      baths: 5,
      type: "Villa"
    },
    {
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80",
      price: "KES 35,000",
      period: "/ Month",
      title: "Urban Loft",
      location: "CBD, Nairobi",
      beds: 1,
      baths: 1,
      type: "Loft"
    }
  ];

  const displayedProperties = showAll ? allProperties : allProperties.slice(0, 3);

  return (
    <section id="marketplace" className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
             Discover Premium Rentals
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-600 font-medium">
             Browse verified listings directly from elite property managers and landlords using Rentora OS.
          </p>
        </div>

        {/* Floating Search Bar (Matching Screenshot perfectly) */}
        <div className="bg-white rounded-full p-2 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 max-w-4xl mx-auto mb-16 flex flex-col md:flex-row items-center relative z-20">
           
           {/* Location */}
           <div className="flex-1 w-full flex items-center px-6 py-2 border-r border-slate-100">
              <RiMapPinLine className="h-5 w-5 text-slate-400 mr-3" />
              <div className="flex flex-col w-full text-left">
                 <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Location</span>
                 <input type="text" defaultValue="Nairobi..." className="w-full text-[15px] font-semibold text-slate-700 placeholder-slate-400 focus:outline-none" />
              </div>
           </div>

           {/* Max Price */}
           <div className="flex-1 w-full flex items-center px-6 py-2 border-r border-slate-100">
              <RiMoneyDollarCircleLine className="h-5 w-5 text-slate-400 mr-3" />
              <div className="flex flex-col w-full text-left">
                 <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Max Price</span>
                 <select className="w-full text-[15px] font-semibold text-slate-700 focus:outline-none bg-transparent cursor-pointer appearance-none">
                    <option>Any Price</option>
                    <option>Up to KES 50k</option>
                    <option>Up to KES 100k</option>
                    <option>Up to KES 200k</option>
                 </select>
              </div>
           </div>

           {/* Property Type */}
           <div className="flex-1 w-full flex items-center px-6 py-2">
              <RiHome3Line className="h-5 w-5 text-slate-400 mr-3" />
              <div className="flex flex-col w-full text-left">
                 <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Property Type</span>
                 <select className="w-full text-[15px] font-semibold text-slate-700 focus:outline-none bg-transparent cursor-pointer appearance-none">
                    <option>All Types</option>
                    <option>Apartments</option>
                    <option>Townhouses</option>
                    <option>Studios</option>
                 </select>
              </div>
           </div>

           {/* Search Button */}
           <button className="w-full md:w-auto px-8 py-4 bg-[#085a27] text-white rounded-full font-bold text-[16px] hover:bg-[#06421c] transition-all flex justify-center items-center ml-2 mr-1 my-1 md:my-0">
              <RiSearchLine className="h-5 w-5 mr-2 font-bold" />
              <span>Search</span>
           </button>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProperties.map((prop, i) => (
             <div key={i} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 group cursor-pointer">
                {/* Image Box */}
                <div className="relative h-60 overflow-hidden">
                   <img src={prop.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Property" />
                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[12px] font-bold text-slate-900">
                      {prop.type}
                   </div>
                </div>
                
                {/* Details Box */}
                <div className="p-6">
                   <div className="mb-4">
                      <div className="flex items-baseline mb-1">
                         <span className="text-2xl font-black text-[#085a27]">{prop.price}</span>
                         <span className="text-[13px] font-bold text-slate-500 ml-1">{prop.period}</span>
                      </div>
                      <h3 className="text-[18px] font-bold text-slate-900 truncate">{prop.title}</h3>
                      <p className="text-[14px] text-slate-500 font-medium flex items-center mt-1">
                         <RiMapPinLine className="mr-1.5" /> {prop.location}
                      </p>
                   </div>
                   
                   <div className="flex items-center space-x-4 py-4 border-t border-b border-slate-100 mb-6">
                      <div className="flex items-center text-slate-600 font-medium text-[14px]">
                         <RiHome3Line className="mr-2 text-slate-400 h-5 w-5" /> 
                         {prop.beds} Beds
                      </div>
                      <div className="flex items-center text-slate-600 font-medium text-[14px]">
                         <RiLayoutGridLine className="mr-2 text-slate-400 h-5 w-5" /> 
                         {prop.baths} Baths
                      </div>
                   </div>

                   <button className="w-full py-3 bg-[#f4f8f6] text-[#0e803c] rounded-xl font-bold text-[14px] hover:bg-[#0e803c] hover:text-white transition-colors flex justify-center items-center">
                      <RiPhoneLine className="mr-2" /> Contact Host
                   </button>
                </div>
             </div>
          ))}
        </div>

        {!showAll && (
          <div className="text-center mt-12">
              <button 
                onClick={() => setShowAll(true)}
                className="px-8 py-3.5 bg-white text-[#085a27] border-2 border-[#0e803c] rounded-full font-bold text-[15px] hover:bg-emerald-50 transition shadow-md"
              >
                 Load More Properties
              </button>
          </div>
        )}

      </div>
    </section>
  );
}
