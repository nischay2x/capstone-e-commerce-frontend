"use client";

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import useDebouncedCallback from '@/components/hooks/useDebouncedCallback';
import { searchUserProducts } from '@/actions/product';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  category: string;
}

export default function ProductSearch() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Product[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleSearch();
  }, [query]);

  const handleSearch = useDebouncedCallback(() => {
    if (query.length >= 3) {
      const fetchResults = async () => {
        try {
          const data = await searchUserProducts(query);
          setResults(data);
          setShowDropdown(true);
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      };

      fetchResults();
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  }, 300)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) return;

    switch (e.key) {
      case 'ArrowDown':
        setActiveIndex((prevIndex) =>
          prevIndex === results.length - 1 ? 0 : prevIndex + 1
        );
        break;
      case 'ArrowUp':
        setActiveIndex((prevIndex) =>
          prevIndex <= 0 ? results.length - 1 : prevIndex - 1
        );
        break;
      case 'Enter':
        if (activeIndex >= 0 && activeIndex < results.length) {
          let p = results[activeIndex];
          router.push(`/shop/${p.id}-${p.name.toLowerCase().replace(/\s+/g, "-")}`);
          setShowDropdown(false);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full relative">
      <input
        type="text"
        className='outline-none w-full border border-gray-300 rounded-md text-sm px-2 focus:outline-none relative h-9'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowDropdown(results.length > 0)}
        placeholder="Search for products..."
      />
      {showDropdown && (
        <div className="absolute bottom-100 left-0 w-full z-10 bg-white shadow-md text-sm" ref={dropdownRef}>
          {results.length > 0 ? (
            <ul>
              {results.map((product, index) => (
                <li
                  key={product.id}
                  className={`${index === activeIndex ? 'bg-gray-50' : ''} px-2 py-1 cursor-pointer hover:bg-gray-50`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => {
                    setQuery(product.name);
                    setShowDropdown(false);
                  }}
                >
                  <Link href={`/shop/${product.id}-${product.name.toLowerCase().replace(/\s+/g, "-")}`} className='flex items-center justify-between'>
                      <span>{product.name}</span> <span className='text-xs text-muted-foreground'>{product.category}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className='px-2 py-1'>No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

