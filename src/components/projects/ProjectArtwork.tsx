import { cn } from "@/lib/utils";

export type ProjectArtworkProject = {
  screenshot: string;
  screenshotAlt: string;
  screenshotSmall?: string;
  visualTheme: "restaurant" | "fashion" | "heritage";
};

export default function ProjectArtwork({
  project,
  compact = false,
}: {
  project: ProjectArtworkProject;
  compact?: boolean;
}) {
  const art =
    project.visualTheme === "fashion" ? (
      <FashionArtwork compact={compact} />
    ) : project.visualTheme === "heritage" ? (
      <HeritageArtwork compact={compact} />
    ) : (
      <RestaurantArtwork compact={compact} />
    );
  return (
    <div className="project-visual-stack">
      <figure className="project-real-preview">
        <picture>
          {project.screenshotSmall && (
            <source media="(max-width: 767px)" srcSet={project.screenshotSmall} sizes="92vw" />
          )}
          <img
            src={project.screenshot}
            alt={project.screenshotAlt}
            loading="lazy"
            decoding="async"
            width={1440}
            height={900}
          />
        </picture>
        <figcaption>LIVE SITE / REAL CAPTURE</figcaption>
      </figure>
      <div className="project-art-preview">{art}</div>
    </div>
  );
}

function RestaurantArtwork({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("restaurant-art", compact && "is-compact")} aria-hidden="true">
      <div className="restaurant-ambient" />
      <span className="art-preview-label">ORIGINAL ART-DIRECTED PREVIEW</span>
      <div className="restaurant-browser">
        <div className="restaurant-browser-bar">
          <i />
          <i />
          <i />
          <span>adnanpizzaburgerpoint.online</span>
        </div>
        <div className="restaurant-home">
          <header>
            <b>ADNAN</b>
            <span>Pizza · Burger · Point</span>
            <nav>MENU&nbsp;&nbsp; RESERVE&nbsp;&nbsp; CONTACT</nav>
          </header>
          <div className="restaurant-hero-copy">
            <small>CHINIOT · OPEN FOR ORDERS</small>
            <strong>
              Late-night cravings,
              <br />
              <em>served warm.</em>
            </strong>
            <span>ORDER NOW ↗</span>
          </div>
          <div className="restaurant-plate">
            <i className="pizza-slice" />
            <i className="pizza-cut one" />
            <i className="pizza-cut two" />
            <b className="topping t1" />
            <b className="topping t2" />
            <b className="topping t3" />
            <b className="topping t4" />
          </div>
        </div>
      </div>
      <div className="restaurant-menu-card">
        <small>POPULAR MENU</small>
        <b>Chicken Pizza</b>
        <span>Freshly prepared · multiple sizes</span>
        <strong>ADD TO CART&nbsp; +</strong>
      </div>
      <div className="restaurant-cart-card">
        <small>YOUR ORDER</small>
        <b>2 items</b>
        <span>Takeaway · Chiniot</span>
        <strong>VIEW CART ↗</strong>
      </div>
      <div className="restaurant-hours-card">
        <small>VISIT US</small>
        <b>Chiniot, Punjab</b>
        <span>Opening hours & location</span>
      </div>
      <span className="restaurant-mark mark-one">◆</span>
      <span className="restaurant-mark mark-two">+</span>
    </div>
  );
}

function FashionArtwork({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn("fashion-art", compact && "is-compact")}
      aria-label="Original art-directed preview of the Dastan-e-Nysa fashion commerce experience"
      role="img"
    >
      <span className="art-preview-label">ORIGINAL ART-DIRECTED PREVIEW</span>
      <div className="fashion-fabric" />
      <div className="fashion-browser">
        <div className="fashion-browser-bar">
          <i />
          <i />
          <i />
          <span>dastan-story-shop.vercel.app</span>
        </div>
        <header>
          <b>DASTAN-E-NYSA</b>
          <nav>SHOP&nbsp;&nbsp; COLLECTIONS&nbsp;&nbsp; SIZE GUIDE</nav>
        </header>
        <div className="fashion-editorial">
          <small>STORIES WOVEN INTO EVERY DETAIL</small>
          <strong>
            Ethnic wear,
            <br />
            <em>told beautifully.</em>
          </strong>
          <span>DISCOVER COLLECTIONS ↗</span>
        </div>
        <div className="fashion-silhouette">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="fashion-product-card one">
        <small>COLLECTION</small>
        <b>Chikankari Anarkali</b>
        <span>VIEW PRODUCT ↗</span>
      </div>
      <div className="fashion-product-card two">
        <small>NEW STORY</small>
        <b>Noor e Sehar Crimson Set</b>
        <span>PKR · PRODUCT DETAIL</span>
      </div>
      <div className="fashion-guide-card">
        <small>SHOP WITH CONFIDENCE</small>
        <b>Size Guide</b>
        <span>WhatsApp assistance available</span>
      </div>
      <span className="fashion-mark">◇</span>
    </div>
  );
}

function HeritageArtwork({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn("heritage-art", compact && "is-compact")}
      aria-label="Original art-directed preview of the Farooq Saharan heritage craft portfolio"
      role="img"
    >
      <span className="art-preview-label">ORIGINAL ART-DIRECTED PREVIEW</span>
      <div className="heritage-carving" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="heritage-browser">
        <div className="heritage-browser-bar">
          <i />
          <i />
          <i />
          <span>farooqsaharan.vercel.app</span>
        </div>
        <header>
          <b>FAROOQ SAHARAN</b>
          <nav>LEGACY&nbsp;&nbsp; CRAFT&nbsp;&nbsp; PORTFOLIO</nav>
        </header>
        <div className="heritage-editorial">
          <small>THIRD-GENERATION MASTER WOOD ARTISAN · CHINIOT</small>
          <strong>
            A legacy shaped
            <br />
            <em>by hand.</em>
          </strong>
          <span>EXPLORE THE CRAFT ↗</span>
        </div>
        <div className="heritage-door">
          <i />
          <i />
          <i />
          <b>◆</b>
        </div>
      </div>
      <div className="heritage-detail-card">
        <small>AREAS OF MASTERY</small>
        <b>Architectural Woodwork</b>
        <span>Doors · Joinery · Staircases</span>
      </div>
      <div className="heritage-legacy-card">
        <small>PORTFOLIO INDEX</small>
        <b>Legacy / Sketches</b>
        <span>Craft · Assignments · Contact</span>
      </div>
      <span className="heritage-mark">+</span>
    </div>
  );
}
