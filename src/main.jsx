
import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useParams,
  useNavigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom';

import './styles.css';

const posts = [
  {
    id: 1,
    category: 'DESIGN',
    title: 'The beauty of making room for less',
    excerpt:
      'A small reminder that thoughtful spaces—and thoughtful lives—often begin by removing what no longer matters.',
    author: 'Maya Bennett',
    date: 'Nov 18, 2026',
    read: '5 min read',
    image:
      'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=85',
    featured: true,
    body: `We tend to think a fresh start means adding something. A new tool, a new routine, another idea to carry. But sometimes the most meaningful change is to make a little room.

Space lets us notice the things that were already there: the morning light, the book we meant to finish, the conversation that deserves our full attention.

Try starting small. Clear one surface, quiet one notification, or leave one evening unplanned. Let the empty space do its work.`,
  },
  {
    id: 2,
    category: 'LIFESTYLE',
    title: 'A slower morning, by design',
    excerpt:
      'A few gentle habits that help the day feel like yours before the noise begins.',
    author: 'Theo Martin',
    date: 'Nov 14, 2026',
    read: '4 min read',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
    body: `A slow morning is not about waking up at an impossibly early hour. It is about creating a moment before reacting to everyone else.

Put the phone down for ten minutes. Make your coffee or tea without rushing. Open a window, stretch, or write a few lines.

The goal is not a perfect routine. It is a softer landing into the day.`,
  },
  {
    id: 3,
    category: 'TECHNOLOGY',
    title: 'Technology that gives time back',
    excerpt:
      'The best digital tools quietly disappear into the background and let you focus on what matters.',
    author: 'Jordan Lee',
    date: 'Nov 10, 2026',
    read: '6 min read',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    body: `Useful technology should reduce friction, not create another place to check. When evaluating a tool, ask whether it makes a task simpler, clearer, or more human.

Automate the repetitive. Keep the meaningful decisions close. And remember that a tool is allowed to be put away when the work is done.`,
  },
  {
    id: 4,
    category: 'TRAVEL',
    title: 'Postcards from the quiet coast',
    excerpt:
      'A weekend away, salty air, long walks, and the reminder that you do not have to go far to reset.',
    author: 'Maya Bennett',
    date: 'Nov 06, 2026',
    read: '7 min read',
    image:
      'https://images.unsplash.com/photo-1473116763249-2indle?auto=format&fit=crop&w=900&q=80',
    body: `We left without much of a plan, which turned out to be the best plan. The coast moved at its own pace: tides, clouds, little cafés, and long paths with no destination.

A change of scenery can be enough to change the scale of your thoughts. You return with no grand revelation, just a little more room to breathe.`,
  },
  {
    id: 5,
    category: 'DESIGN',
    title: 'Collecting ideas, not clutter',
    excerpt:
      'How to build an inspiration archive that helps you create instead of endlessly scroll.',
    author: 'Theo Martin',
    date: 'Nov 02, 2026',
    read: '3 min read',
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
    body: `Inspiration is useful when it leads somewhere. Keep a small collection, add a sentence about what caught your eye, and revisit it when you are ready to make something.

A collection with a point of view is more valuable than a folder full of things you barely remember saving.`,
  },
  {
    id: 6,
    category: 'LIFESTYLE',
    title: 'Finding a little joy in the everyday',
    excerpt:
      'Ordinary moments become memorable when we give them a little attention.',
    author: 'Jordan Lee',
    date: 'Oct 28, 2026',
    read: '4 min read',
    image:
      'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=80',
    body: `The everyday is not a waiting room for the weekend. It is where most of life happens.

Choose a favorite mug. Take the scenic walk. Play music while making dinner. Send the message you have been thinking about. Small pleasures are not small when they make a day feel lived.`,
  },
];

const categories = ['ALL STORIES', 'DESIGN', 'LIFESTYLE', 'TECHNOLOGY', 'TRAVEL'];

/* -------------------- HEADER -------------------- */

function Header() {
  return (
    <header className="header">
      <Link to="/" className="brand">
        <span className="brand-mark">s.</span>
        <span>SUNDAY JOURNAL</span>
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/#stories">Stories</Link>
        <Link to="/#about">About</Link>
      </nav>

      <Link className="header-cta" to="/#newsletter">
        Stay inspired <span>↗</span>
      </Link>
    </header>
  );
}

/* -------------------- FOOTER -------------------- */

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <Link to="/" className="brand footer-brand">
            <span className="brand-mark">s.</span>
            <span>SUNDAY JOURNAL</span>
          </Link>

          <p>Ideas for a more intentional everyday.</p>
        </div>

        <div className="footer-links">
          <Link to="/#stories">Stories</Link>
          <Link to="/#about">About us</Link>
          <Link to="/#newsletter">Newsletter</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Sunday Journal</span>
        <span>Made for curious minds.</span>
      </div>
    </footer>
  );
}

/* -------------------- POST CARD -------------------- */

function Card({ post }) {
  return (
    <Link to={`/post/${post.id}`} className="post-card">
      <div className="card-image">
        <img src={post.image} alt={post.title} loading="lazy" />
        <span className="card-arrow">↗</span>
      </div>

      <div className="card-meta">
        <span>{post.category}</span>
        <span>{post.read}</span>
      </div>

      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>

      <div className="card-author">
        {post.author} <span>·</span> {post.date}
      </div>
    </Link>
  );
}

/* -------------------- HOME PAGE -------------------- */

function Home() {
  const [category, setCategory] = useState('ALL STORIES');
  const [search, setSearch] = useState('');

  const featured = posts.find((post) => post.featured) || posts[0];

  const filtered = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return posts.filter((post) => {
      const categoryMatches =
        category === 'ALL STORIES' || post.category === category;

      const searchableText = [
        post.title,
        post.excerpt,
        post.category,
        post.author,
        post.body,
      ]
        .join(' ')
        .toLowerCase();

      const searchMatches = searchableText.includes(normalizedSearch);

      return categoryMatches && searchMatches;
    });
  }, [category, search]);

  return (
    <>
      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-kicker">
            <span className="dot" />
            A JOURNAL FOR EVERYDAY CURIOSITY
          </div>

          <h1>
           
            <br />
            <em>well noticed.</em>
          </h1>

          <p className="hero-sub">
            Thoughtful notes on design, technology, and the little things that
            make life feel meaningful.
          </p>

          <Link className="round-link" to="/#stories">
            Explore stories <span>↓</span>
          </Link>

          <div className="hero-art">
            <img
              src="https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=1800&q=90"
              alt="Sunlight falling across a peaceful landscape"
            />

            <div className="hero-image-note">
              <span>01 / THE SUNDAY EDIT</span>
              <span>Take a breath. Look closer.</span>
            </div>
          </div>
        </section>

        {/* FEATURED STORY */}
        {featured && (
          <section className="featured">
            <div className="section-label">
              EDITOR&apos;S PICK <span>— THIS WEEK</span>
            </div>

            <div className="featured-layout">
              <div className="featured-img">
                <img src={featured.image} alt={featured.title} loading="lazy" />
              </div>

              <div className="featured-copy">
                <div className="card-meta">
                  <span>{featured.category}</span>
                  <span>{featured.read}</span>
                </div>

                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>

                <div className="featured-by">
                  Words by {featured.author} <span>·</span> {featured.date}
                </div>

                <Link to={`/post/${featured.id}`} className="text-link">
                  Read the story <span>↗</span>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* STORIES */}
        <section className="stories" id="stories">
          <div className="stories-heading">
            <div>
              <div className="section-label">THE JOURNAL</div>
              <h2>Fresh perspectives.</h2>
            </div>

            <div className="search-box">
              <span>⌕</span>
              <input
                type="search"
                aria-label="Search stories"
                placeholder="Search stories..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>

          {/* FILTER BUTTONS */}
          <div className="filters">
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                className={category === item ? 'active' : ''}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {/* POST GRID */}
          <div className="post-grid">
            {filtered.map((post) => (
              <Card key={post.id} post={post} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty">
              No stories found. Try a different search.
            </div>
          )}
        </section>

        {/* ABOUT */}
        <section className="about" id="about">
          <div className="about-left">
            <div className="section-label">A LITTLE ABOUT US</div>

            <h2>
              Curiosity is a
              <br />
              <em>way of living.</em>
            </h2>
          </div>

          <div className="about-right">
            <p>
              Sunday Journal is a corner of the internet for people who like to
              pause, notice, and wonder. We share ideas that inspire a more
              thoughtful way to work, create, and live.
            </p>

            <Link className="text-link" to="/#newsletter">
              Get our letters <span>↗</span>
            </Link>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="newsletter" id="newsletter">
          <div className="newsletter-kicker">A NOTE FROM US TO YOU</div>

          <h2>
            Good ideas, delivered
            <br />
            <em>occasionally.</em>
          </h2>

          <p>
            A thoughtful read for your inbox. No noise, just our favorite stories.
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              alert(
                'Thanks for subscribing! This demo is static, so no email was saved.'
              );
            }}
          >
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Your email address"
              required
            />

            <button type="submit">
              Subscribe <span>↗</span>
            </button>
          </form>

          <small>
            By subscribing, you agree to receive our occasional newsletter.
          </small>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* -------------------- POST PAGE -------------------- */

function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const post = posts.find((item) => item.id === Number(id));

  if (!post) {
    return (
      <>
        <main className="not-found">
          <h1>Story not found</h1>
          <Link to="/">Back home</Link>
        </main>
        <Footer />
      </>
    );
  }

  const handleBack = () => {
    // If user came from the same website, use browser history.
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const relatedPosts = posts.filter((item) => item.id !== post.id).slice(0, 3);

  return (
    <>
      <main className="article">
        <button type="button" className="back" onClick={handleBack}>
          ← Back to stories
        </button>

        <div className="article-meta">
          {post.category} <span>·</span> {post.date} <span>·</span> {post.read}
        </div>

        <h1>{post.title}</h1>
        <p className="article-deck">{post.excerpt}</p>

        <div className="article-author">By {post.author}</div>

        <img className="article-cover" src={post.image} alt={post.title} />

        <div className="article-body">
          {post.body.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="article-end">— End of story —</div>

        <section className="related">
          <div className="section-label">KEEP READING</div>

          <div className="post-grid">
            {relatedPosts.map((item) => (
              <Card key={item.id} post={item} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* -------------------- APP -------------------- */

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route
          path="*"
          element={
            <main className="not-found">
              <h1>404 — Page not found</h1>
              <Link to="/">Go to homepage</Link>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
