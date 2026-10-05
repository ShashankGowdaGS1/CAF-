import React, { useState } from 'react';
import { Check, Coffee, Leaf } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'hot-drinks' | 'signatures';
  price: string;
  description: string;
  tastingNotes: string[];
  image: string;
  badge?: string;
}

const MENU_ITEMS: MenuItem[] = [
  // Coffee Category
  {
    id: 'cappuccino',
    name: 'Morning Cappuccino',
    category: 'coffee',
    price: '$4.75',
    description: 'Double espresso pulled over a warm ceramic cup, blanketed with silky microfoam and a gentle kiss of cocoa.',
    tastingNotes: ['Velvety', 'Toasted Hazelnut', 'Warm Cocoa'],
    image: '/assets/images/cappuccino.jpg',
    badge: 'Neighborhood Favourite',
  },
  {
    id: 'house-latte',
    name: 'House Latte',
    category: 'coffee',
    price: '$5.25',
    description: 'Freshly pulled espresso folded into creamy steamed whole milk or oat milk with handcrafted heart art.',
    tastingNotes: ['Creamy', 'Sweet Caramel', 'Mellow'],
    image: '/assets/images/latte.jpg',
  },
  {
    id: 'espresso',
    name: 'Double Espresso',
    category: 'coffee',
    price: '$3.75',
    description: 'A rich double ristretto extraction crowned with a thick golden-amber crema. Served with sparkling water.',
    tastingNotes: ['Bold', 'Dark Chocolate', 'Molasses'],
    image: '/assets/images/espresso.jpg',
  },
  {
    id: 'flat-white',
    name: 'Artisan Flat White',
    category: 'coffee',
    price: '$5.00',
    description: 'Double ristretto blended with micro-textured steamed milk, allowing the intense espresso sweetness to shine.',
    tastingNotes: ['Smooth', 'Nutty', 'Rich'],
    image: '/assets/images/flat-white.jpg',
  },
  {
    id: 'filter-coffee',
    name: 'Slow Batch Filter',
    category: 'coffee',
    price: '$4.25',
    description: 'Single-origin drip brew poured fresh throughout the day into clear glass carafes. Bright and clean.',
    tastingNotes: ['Clean', 'Stone Fruit', 'Floral Citrus'],
    image: '/assets/images/filter-coffee.jpg',
  },

  // Hot Drinks Category
  {
    id: 'spiced-chai',
    name: 'Spiced Masala Chai',
    category: 'hot-drinks',
    price: '$5.00',
    description: 'Assam black tea simmered with cracked cardamom pods, whole cinnamon bark, clove, and steamed milk.',
    tastingNotes: ['Warming', 'Spiced', 'Cozy Sweetness'],
    image: '/assets/images/spiced-chai.jpg',
    badge: 'House Simmered',
  },
  {
    id: 'matcha-latte',
    name: 'Ceremonial Matcha Latte',
    category: 'hot-drinks',
    price: '$5.50',
    description: 'First-harvest stone-ground Japanese matcha whisked with oat milk and a touch of raw wildflower honey.',
    tastingNotes: ['Earthy', 'Velvety', 'Delicate Sweet'],
    image: '/assets/images/matcha-latte.jpg',
  },
  {
    id: 'hot-chocolate',
    name: 'Dark Stone Chocolate',
    category: 'hot-drinks',
    price: '$4.95',
    description: '70% single-origin dark chocolate shaved and gently melted into textured milk with sea salt.',
    tastingNotes: ['Decadent', 'Fudgy', 'Warming'],
    image: '/assets/images/spiced-chai.jpg',
  },

  // Signatures & Bakery Category
  {
    id: 'croissant-moment',
    name: 'Warm Butter Croissant & Coffee',
    category: 'signatures',
    price: '$7.50',
    description: 'Flaky 100% French butter croissant pulled hot from the oven paired with your choice of drip or espresso.',
    tastingNotes: ['Buttery', 'Flaky Crisp', 'Golden'],
    image: '/assets/images/pastry-croissant.jpg',
    badge: 'Morning Pair',
  },
  {
    id: 'honey-lavender-latte',
    name: 'Honey Lavender Latte',
    category: 'signatures',
    price: '$5.75',
    description: 'House espresso infused with local clover honey and organic French culinary lavender blossoms.',
    tastingNotes: ['Floral', 'Silky', 'Gentle Honey'],
    image: '/assets/images/latte.jpg',
  },
  {
    id: 'salted-caramel-cappuccino',
    name: 'Sea Salt Caramel Cappuccino',
    category: 'signatures',
    price: '$5.65',
    description: 'Slow-cooked brown butter caramel layered with double espresso, textured foam, and Maldon sea salt.',
    tastingNotes: ['Rich Caramel', 'Savory Sweet', 'Creamy'],
    image: '/assets/images/cappuccino.jpg',
  },
];

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'coffee' | 'hot-drinks' | 'signatures'>('coffee');
  const [selectedItemId, setSelectedItemId] = useState<string>('cappuccino');

  const filteredItems = MENU_ITEMS.filter((item) => item.category === activeCategory);
  const selectedItem = MENU_ITEMS.find((item) => item.id === selectedItemId) || filteredItems[0];

  return (
    <section
      id="menu"
      className="menu-section section-padding"
      style={{
        backgroundColor: 'var(--bg-canvas)',
        position: 'relative',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            maxWidth: '680px',
            marginBottom: '3.5rem',
          }}
        >
          <span className="eyebrow">
            <Coffee size={14} style={{ marginRight: '0.2rem' }} />
            Made Carefully
          </span>

          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              lineHeight: 1.15,
              marginBottom: '1rem',
              color: 'var(--text-primary)',
            }}
          >
            What we’re pouring.
          </h2>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            Simple, honest drinks made with good beans, fresh milk, and a steady hand. No rush, no pretense.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '2.75rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
          }}
        >
          {[
            { id: 'coffee', label: 'Coffee' },
            { id: 'hot-drinks', label: 'Hot Drinks' },
            { id: 'signatures', label: 'Signatures & Bakery' },
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  const newCat = cat.id as 'coffee' | 'hot-drinks' | 'signatures';
                  setActiveCategory(newCat);
                  const firstOfCategory = MENU_ITEMS.find((i) => i.category === newCat);
                  if (firstOfCategory) setSelectedItemId(firstOfCategory.id);
                }}
                style={{
                  padding: '0.75rem 1.6rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  transition: 'all 0.25s var(--ease-smooth)',
                  backgroundColor: isActive ? 'var(--text-primary)' : 'var(--bg-surface)',
                  color: isActive ? 'var(--bg-canvas)' : 'var(--text-primary)',
                  border: isActive ? '1px solid var(--text-primary)' : '1px solid var(--border-subtle)',
                  boxShadow: isActive ? '0 4px 16px rgba(38, 30, 25, 0.15)' : 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Editorial Menu Showcase: Large Drink Spotlight + Clean Menu Board */}
        <div
          className="menu-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1.15fr) minmax(340px, 1fr)',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Featured Drink Hero Showcase */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-md)',
              position: 'sticky',
              top: '6rem',
            }}
          >
            {/* Image Frame */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '4 / 3',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-surface-elevated)',
              }}
            >
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'all 0.4s var(--ease-smooth)',
                }}
              />

              {selectedItem.badge && (
                <div
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    left: '1.25rem',
                    backgroundColor: 'rgba(250, 247, 242, 0.94)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.4rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--accent-caramel)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  }}
                >
                  {selectedItem.badge}
                </div>
              )}
            </div>

            {/* Drink Details */}
            <div style={{ padding: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '0.85rem',
                }}
              >
                <h3
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(1.6rem, 2.5vw, 2.15rem)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {selectedItem.name}
                </h3>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: 'var(--accent-caramel)',
                  }}
                >
                  {selectedItem.price}
                </span>
              </div>

              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)',
                  marginBottom: '1.75rem',
                }}
              >
                {selectedItem.description}
              </p>

              {/* Casual Tasting Notes */}
              <div style={{ marginBottom: '1.75rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--text-muted)',
                    display: 'block',
                    marginBottom: '0.6rem',
                  }}
                >
                  HOW IT FEELS
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedItem.tastingNotes.map((note) => (
                    <span
                      key={note}
                      style={{
                        backgroundColor: 'var(--bg-canvas)',
                        border: '1px solid var(--border-medium)',
                        padding: '0.35rem 0.85rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                      }}
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Approachable Customization Notice */}
              <div
                style={{
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                }}
              >
                <Check size={16} color="var(--accent-olive)" />
                <span>Oat milk, almond milk, and decaf available at no extra charge.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Menu List Items */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {filteredItems.map((item) => {
              const isSelected = item.id === selectedItemId;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItemId(item.id)}
                  style={{
                    padding: '1.35rem 1.5rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isSelected ? 'var(--bg-card)' : 'transparent',
                    border: isSelected
                      ? '1px solid var(--accent-caramel)'
                      : '1px solid var(--border-subtle)',
                    boxShadow: isSelected ? 'var(--shadow-md)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.25s var(--ease-smooth)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                  }}
                  className="menu-list-item"
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      flexShrink: 0,
                      backgroundColor: 'var(--bg-surface-elevated)',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        marginBottom: '0.25rem',
                      }}
                    >
                      <h4
                        className="font-serif"
                        style={{
                          fontSize: '1.1875rem',
                          color: isSelected ? 'var(--accent-caramel)' : 'var(--text-primary)',
                          transition: 'color 0.2s ease',
                        }}
                      >
                        {item.name}
                      </h4>
                      <span
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.125rem',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          marginLeft: '0.5rem',
                        }}
                      >
                        {item.price}
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.45,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Generous Footnote */}
            <div
              style={{
                marginTop: '1.5rem',
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <Leaf size={18} color="var(--accent-olive)" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    Bring your own cup
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Bring your own travel mug or ceramic vessel and enjoy 10% off any beverage. Whole beans roasted weekly available by the bag at the counter.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .menu-grid {
            grid-template-columns: 1fr !important;
          }
          .menu-grid > div:first-child {
            position: relative !important;
            top: 0 !important;
          }
        }
        .menu-list-item:hover {
          background-color: var(--bg-card) !important;
          border-color: var(--border-medium) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
};
