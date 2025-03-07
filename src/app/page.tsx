'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase, Software } from '@/utils/supabase';

export default function Home() {
  const [software, setSoftware] = useState<Software[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchSoftware() {
      try {
        const { data, error } = await supabase
          .from('software')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          setSoftware(data);
        }
      } catch (error) {
        console.error('Error fetching software:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSoftware();
  }, []);

  const scrollToSoftware = () => {
    const softwareSection = document.getElementById('software-section');
    if (softwareSection) {
      softwareSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-emerald-500 font-bold text-xl">
              Freeware Portal
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="square" strokeWidth={2} d="M4 6h16M4 12h16m-16 6h16"/>
              </svg>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-white">Home</Link>
              <Link href="/software" className="text-white">Software</Link>
              <Link href="/our-choice" className="text-white">Our Choice</Link>
              <Link href="/about" className="text-white">About</Link>
              <Link href="/contact" className="text-white">Contact</Link>
            </nav>
          </div>

          {/* Mobile Navigation */}
          {menuOpen && (
            <nav className="md:hidden py-4 border-t border-zinc-800">
              <Link href="/" className="block py-2">Home</Link>
              <Link href="/software" className="block py-2">Software</Link>
              <Link href="/our-choice" className="block py-2">Our Choice</Link>
              <Link href="/about" className="block py-2">About</Link>
              <Link href="/contact" className="block py-2">Contact</Link>
            </nav>
          )}
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <div className="bg-zinc-900">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">
                Why Pay When the Best is Free?
              </h1>
              <p className="text-xl mb-8 text-zinc-400">
                Discover a world of powerful alternatives to expensive software. 
                Save money without compromising on quality - our handpicked library 
                of freeware delivers the same results as paid versions.
              </p>
              <button
                onClick={scrollToSoftware}
                className="bg-emerald-600 text-white px-8 py-4 text-lg font-semibold"
              >
                Browse Software
              </button>
            </div>
          </div>
        </div>

        {/* Software Section */}
        <div id="software-section" className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">Explore Free Software</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-2 border-emerald-500 border-t-transparent mx-auto animate-spin"></div>
              <p className="mt-4 text-zinc-400">Loading software...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {software.map((item) => (
                <div key={item.id} className="bg-zinc-900 p-6">
                  <div className="flex items-center mb-4">
                    {item.icon_url && (
                      <img
                        src={item.icon_url}
                        alt={`${item.title} icon`}
                        className="w-12 h-12 mr-4"
                      />
                    )}
                    <div>
                      <h2 className="text-xl font-semibold">{item.title}</h2>
                      <p className="text-zinc-400">{item.category}</p>
                    </div>
                  </div>
                  <p className="text-zinc-300 mb-4">{item.description}</p>
                  <div className="flex gap-4">
                    {item.preview_url && (
                      <a
                        href={item.preview_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-500"
                      >
                        Preview
                      </a>
                    )}
                    {item.website_url && (
                      <a
                        href={item.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-500"
                      >
                        Website
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
