import React, { useState, useEffect } from 'react';
import './style.css';

const App = () => {
  // Define your image sources dynamically from photo1.jpg to photo26.jpg
  // These images are expected to be in the public/gite_photos/ directory
  const imageSources = Array.from({ length: 26 }, (_, i) =>
    `${process.env.PUBLIC_URL}/gite_photos/photo${i + 1}.jpg`
  );

  // State for the image slider's current slide index
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  // State for full-screen image display
  const [isFullScreen, setIsFullScreen] = useState(false);
  // Dynamically get total slides from imageSources array
  const totalSlides = imageSources.length;

  // Function to show a specific slide and update indicators
  const showSlide = (index) => {
    setCurrentSlideIndex(index);
  };

  // Function to change slide based on direction (+1 for next, -1 for previous)
  const changeSlide = (direction) => {
    let newIndex = currentSlideIndex + direction;
    if (newIndex >= totalSlides) {
      newIndex = 0; // Loop back to the first slide
    }
    if (newIndex < 0) {
      newIndex = totalSlides - 1; // Loop back to the last slide
    }
    showSlide(newIndex);
  };

  // Function to directly go to a slide based on indicator click
  const goToSlide = (index) => {
    showSlide(index);
  };

  // Effect to handle auto-advancing slides
  useEffect(() => {
    const slideInterval = setInterval(() => {
      changeSlide(1); // Advance to the next slide
    }, 4000); // Auto-advance every 4 seconds

    // Cleanup function: This runs when the component unmounts or before the effect re-runs
    // It's crucial to clear the interval to prevent memory leaks and unexpected behavior.
    return () => clearInterval(slideInterval);
  }, [currentSlideIndex, totalSlides]); // Dependencies: Re-run this effect if currentSlideIndex or totalSlides changes

  // Function to scroll to contact section
  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.querySelector('.bottom-nav');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle image click to open full screen
  const handleImageClick = () => {
    setIsFullScreen(true);
  };

  // Handle full screen close
  const handleFullScreenClose = () => {
    setIsFullScreen(false);
  };

  // Handle button clicks with event propagation prevention
  const handlePrevClick = (e) => {
    e.stopPropagation();
    changeSlide(-1);
  };

  const handleNextClick = (e) => {
    e.stopPropagation();
    changeSlide(1);
  };

  const handleIndicatorClick = (index, e) => {
    e.stopPropagation();
    goToSlide(index);
  };

  // Handle full screen navigation
  const handleFullScreenPrev = (e) => {
    e.stopPropagation();
    changeSlide(-1);
  };

  const handleFullScreenNext = (e) => {
    e.stopPropagation();
    changeSlide(1);
  };

  // Handle fullscreen modal click - close when clicking on the modal background
  const handleFullScreenModalClick = (e) => {
    // Only close if clicking directly on the modal background (not on child elements)
    if (e.target === e.currentTarget) {
      setIsFullScreen(false);
    }
  };

  return (
    <div className="container">
      {/* Top Navigation Bar - Modified Structure with Logo */}
      <nav className="top-nav">
        <div className="nav-top">
          <img 
            src={`${process.env.PUBLIC_URL}/chez_babou.png`} 
            alt="Chez Babou Logo" 
            className="logo-image"
            onError={(e) => {
              console.log('Logo image failed to load');
              e.target.style.display = 'none';
            }}
          />
          <h1 className="logo">Chez <span className="babou-text">Babou</span></h1>
        </div>
        <div className="nav-middle">
          <h2 className="gite-info">Gîte 6 personnes</h2>
          <p className="subtitle">Châteaux et Loire à vélo</p>
        </div>
        <div className="nav-bottom">
          <a href="#description">Description</a>
          <a href="#photos">Photos</a>
          <a href="#tarifs">Tarifs</a>
          <a href="#activites">Activités</a>
          <button onClick={scrollToContact}>Contact</button>
        </div>
      </nav>

      <main>
        {/* Description Section */}
        <section id="description" className="content-section">
          <span className="section-label">Description:</span>
          <span className="section-content"> Charmante maison 3 chambres 2 salles de bains jardin entièrement rénovée en 2024 pour vous accueillir tout en confort. Nous bénéficions d'un emplacement idéal face au Val de Loire pour visiter les châteaux, le zoo de Beauval. La maison est au pied de la Loire à vélo ce qui vous permettra un accès à moins de 5 minutes pour de très belle randonnées. La maison se situe à 7 minutes en voiture d'une sortie d'Autoroute. Un jardin est à disposition avec salon et barbecue. Sous sol rangement pour les vélos.</span>
        </section>

        {/* Photos Section with Image Slider */}
        <section id="photos" className="content-section">
          <span className="section-label">Photos:</span>
          <span className="section-content"> </span> {/* Keep this span for layout consistency, even if empty */}

          <div className="photo-gallery">
            <div className="gallery-container">
              {/* Dynamically render slides based on the imageSources array */}
              {imageSources.map((src, index) => (
                <div
                  key={index} // Unique key for each list item in React
                  className={`gallery-slide ${index === currentSlideIndex ? 'active' : ''}`} // Apply 'active' class to current slide
                  onClick={handleImageClick}
                >
                  <img 
                    src={src} 
                    alt={`Gîte Photo ${index + 1}`}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlICN7aW5kZXggKyAxfTwvdGV4dD48L3N2Zz4=';
                    }}
                  />
                </div>
              ))}
              
              {/* Navigation buttons for the slider */}
              <button className="gallery-controls prev" onClick={handlePrevClick}>‹</button>
              <button className="gallery-controls next" onClick={handleNextClick}>›</button>
              
              {/* Indicators for the slider */}
              <div className="gallery-indicators">
                {[...Array(totalSlides)].map((_, index) => ( // Create an array for indicators
                  <span
                    key={index} // Unique key for each indicator
                    className={`indicator ${index === currentSlideIndex ? 'active' : ''}`} // Apply 'active' class to current indicator
                    onClick={(e) => handleIndicatorClick(index, e)} // Go to slide on indicator click
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tarifs Section */}
        <section id="tarifs" className="content-section">
          <span className="section-label">Tarifs :</span>
          <span className="section-content"> 110€/nuit jusqu'à 6 personnes, forfait ménage par séjour: 50€<br />
          La maison a été intégralement rénovée en 2024 pour vous acceuillir tout en confort. La linge de lit est fourni ainsi qu'un drap de bain par hôte. Torchons à disposition. Cafetière filtre. Cafetière dolce gusto. Poêle à granulés.</span>
        </section>

        {/* Activités Section */}
        <section id="activites" className="content-section">
          <span className="section-label">Activités :</span>
          <span className="section-content"> 
            <ul className="list-group">
              <li className="list-item">
                Loire à vélo
                <span className="badge">500m</span>
              </li>
              <li className="list-item">
                Château de Meung sur Loire
                <span className="badge">2.3km</span>
              </li>
              <li className="list-item">
                Château de Beaugency
                <span className="badge">5.3km</span>
              </li>
              <li className="list-item">
                Château de Chambord
                <span className="badge">28km</span>
              </li>
               <li className="list-item">
                Château de Blois
                <span className="badge">39km</span>
              </li>
               <li className="list-item">
                Château de Cheverny
                <span className="badge">43km</span>
              </li>
              <li className="list-item">
                Zoo de Beauval
                <span className="badge">73km</span>
              </li>
            </ul>
          </span>
        </section>
      </main>

      {/* Full Screen Image Modal */}
      {isFullScreen && (
        <div className="fullscreen-modal" onClick={handleFullScreenModalClick}>
          <div className="fullscreen-container" onClick={(e) => e.stopPropagation()}>
            <button className="fullscreen-close" onClick={handleFullScreenClose}>×</button>
            <button className="fullscreen-controls prev" onClick={handleFullScreenPrev}>‹</button>
            <img 
              src={imageSources[currentSlideIndex]} 
              alt={`Gîte Photo ${currentSlideIndex + 1}`}
              className="fullscreen-image"
            />
            <button className="fullscreen-controls next" onClick={handleFullScreenNext}>›</button>
            <div className="fullscreen-indicators">
              {[...Array(totalSlides)].map((_, index) => (
                <span
                  key={index}
                  className={`indicator ${index === currentSlideIndex ? 'active' : ''}`}
                  onClick={(e) => handleIndicatorClick(index, e)}
                ></span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar with Contact Information - Centered */}
      <nav className="bottom-nav">
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <span className="contact-text">+33 6 27 70 27 60</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">✉️</span>
            <span className="contact-text">sophieruel45@orange.fr</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <span className="contact-text">93 rue Abbé Pasty, 45130 Baule</span>
          </div>
        </div>
          <footer class="main-footer">
              <div>© 2025 Babou Gite.</div>
              <div class="footer-author">
                  Made by <span class="footer-author-name">Mathis Dobrev</span>
              </div>
          </footer>
      </nav>
    </div>
  );
};

export default App;