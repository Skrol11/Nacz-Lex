document.addEventListener('DOMContentLoaded', () => {
    // Wyświetlanie bieżącej daty w sekcji terminarza
    const todayElement = document.getElementById('todayDate');
    if (todayElement) {
        const today = new Date();
        const formatted = today.toLocaleDateString('pl-PL');
        todayElement.textContent = `Dziś: ${formatted}`;
    }

    // Generowanie opinii klientów
    const reviews = [
        {
        name: "Jan Kowalski",
        text: "Profesjonalne podejście i terminowość. Polecam!",
        stars: 5
        },
        {
        name: "Anna Nowak",
        text: "Świetna obsługa i indywidualne podejście do klienta.",
        stars: 5
        },
        {
        name: "Jakub Piszora, właściciel firmy: SZYBKA SKRZYNKA",
        text: "Pan Jarosław Król był nieocenionym wsparciem przy zakładaniu mojej działalności. Dzięki jego pomocy zrozumiałem wiele zawiłości prowadzenia jednoosobowej firmy. Profesjonalizm i cierpliwość na najwyższym poziomie.",
        stars: 5
        },
        {
        name: "Jan Nowak",
        text: "Dzięki Biuru Rachunkowemu Nacz-Lex mam pewność, że wszystkie sprawy księgowe są prowadzone rzetelnie i terminowo. To dla mnie ogromne wsparcie w codziennej pracy na gospodarstwie.",
        stars: 5
        },
        {
        name: "Anna Kowalska",
        text: "Współpraca z Nacz-Lex to czysta przyjemność. Profesjonalna obsługa, szybkie odpowiedzi na pytania i pełne zaangażowanie w sprawy mojej firmy. Polecam każdemu przedsiębiorcy.",
        stars: 5
        },
        {
        name: "Tomasz Wiśniewski",
        text: "Biuro Rachunkowe Nacz-Lex to partner godny zaufania. Dzięki ich wsparciu mogę skupić się na rozwoju firmy, mając pewność, że kwestie księgowe są w najlepszych rękach.",
        stars: 5
        }
    ];
  

    const reviewsContainer = document.getElementById('reviewsContainer');
    if (reviewsContainer) {
        reviews.forEach(review => {
            const stars = '★'.repeat(review.stars);
            reviewsContainer.innerHTML += `
                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="text-yellow-400 text-xl mb-2">${stars}</div>
                    <p class="text-gray-600 mb-2">"${review.text}"</p>
                    <p class="font-semibold">- ${review.name}</p>
                </div>
            `;
        });
    }

    // Generowanie terminarza podatkowego
    const taxDeadlines = [
        {
            month: "Styczeń",
            deadlines: [
                { date: "10.01", desc: "JPK_VAT za poprzedni miesiąc" },
                { date: "15.01", desc: "Składka zdrowotna za poprzedni miesiąc" },
                { date: "20.01", desc: "Zaliczka PIT (działalność gospodarcza)" },
                { date: "20.01", desc: "Zaliczka PIT-4 (płatnicy)" },
                { date: "20.01", desc: "Zaliczka CIT za poprzedni miesiąc" },
                { date: "25.01", desc: "Deklaracja VAT + JPK_VAT za poprzedni miesiąc" },
                { date: "25.01", desc: "Składki ZUS za bieżący miesiąc" },
                { date: "31.01", desc: "PIT-28 (ryczałt za poprzedni rok)" },
                { date: "31.01", desc: "Deklaracja CIT-2 za poprzedni rok (US)" }
            ]
        },
        {
            month: "Luty",
            deadlines: [
                { date: "7.02", desc: "Wpłata podatku od nieruchomości za I kwartał" },
                { date: "10.02", desc: "JPK_VAT za styczeń" },
                { date: "15.02", desc: "Składka zdrowotna za styczeń" },
                { date: "20.02", desc: "Zaliczka PIT (działalność gospodarcza)" },
                { date: "20.02", desc: "Zaliczka PIT-4 (płatnicy)" },
                { date: "20.02", desc: "Zaliczka CIT za styczeń" },
                { date: "25.02", desc: "Deklaracja VAT + JPK_VAT za styczeń" },
                { date: "25.02", desc: "Składki ZUS za luty" },
                { date: "28.02", desc: "PIT-11, PIT-8C za poprzedni rok" },
                { date: "28.02", desc: "PIT-40, PIT-4R, PIT-8AR za poprzedni rok" }
            ]
        },
        {
            month: "Marzec",
            deadlines: [
                { date: "10.03", desc: "JPK_VAT za luty" },
                { date: "15.03", desc: "Składka zdrowotna za luty" },
                { date: "20.03", desc: "Zaliczka PIT (działalność gospodarcza)" },
                { date: "20.03", desc: "Zaliczka PIT-4 (płatnicy)" },
                { date: "20.03", desc: "Zaliczka CIT za luty" },
                { date: "25.03", desc: "Deklaracja VAT + JPK_VAT za luty" },
                { date: "25.03", desc: "Składki ZUS za marzec" },
                { date: "31.03", desc: "CIT-8 - roczne rozliczenie podatku CIT" }
            ]
        },
        {
            month: "Kwiecień",
            deadlines: [
                { date: "10.04", desc: "JPK_VAT za marzec" },
                { date: "15.04", desc: "Składka zdrowotna za marzec" },
                { date: "20.04", desc: "Zaliczka PIT (działalność gospodarcza)" },
                { date: "20.04", desc: "Zaliczka PIT-4 (płatnicy)" },
                { date: "20.04", desc: "Zaliczka CIT za marzec" },
                { date: "25.04", desc: "Deklaracja VAT + JPK_VAT za marzec" },
                { date: "25.04", desc: "Składki ZUS za kwiecień" },
                { date: "30.04", desc: "Roczne rozliczenie PIT-36, PIT-36L, PIT-37, PIT-38, PIT-39" },
                { date: "30.04", desc: "Sprawozdanie finansowe - sporządzenie" }
            ]
        },
        {
            month: "Maj",
            deadlines: [
                { date: "9.05", desc: "Wpłata podatku od nieruchomości za II kwartał" },
                { date: "10.05", desc: "JPK_VAT za kwiecień" },
                { date: "15.05", desc: "Składka zdrowotna za kwiecień" },
                { date: "20.05", desc: "Zaliczka PIT (działalność gospodarcza)" },
                { date: "20.05", desc: "Zaliczka PIT-4 (płatnicy)" },
                { date: "20.05", desc: "Zaliczka CIT za kwiecień" },
                { date: "25.05", desc: "Deklaracja VAT + JPK_VAT za kwiecień" },
                { date: "25.05", desc: "Składki ZUS za maj" }
            ]
        },
        {
            month: "Czerwiec",
            deadlines: [
                { date: "10.06", desc: "JPK_VAT za maj" },
                { date: "15.06", desc: "Składka zdrowotna za maj" },
                { date: "20.06", desc: "Zaliczka PIT (działalność gospodarcza)" },
                { date: "20.06", desc: "Zaliczka PIT-4 (płatnicy)" },
                { date: "20.06", desc: "Zaliczka CIT za maj" },
                { date: "25.06", desc: "Deklaracja VAT + JPK_VAT za maj" },
                { date: "25.06", desc: "Składki ZUS za czerwiec" },
                { date: "30.06", desc: "Sprawozdanie finansowe - zatwierdzenie" }
            ]
        },
        {
            month: "Lipiec",
            deadlines: [
                { date: "10.07", desc: "JPK_VAT za czerwiec" },
                { date: "15.07", desc: "Składka zdrowotna za czerwiec" },
                { date: "20.07", desc: "Zaliczka PIT (działalność gospodarcza)" },
                { date: "20.07", desc: "Zaliczka PIT-4 (płatnicy)" },
                { date: "20.07", desc: "Zaliczka CIT za czerwiec" },
                { date: "25.07", desc: "Deklaracja VAT + JPK_VAT za czerwiec" },
                { date: "25.07", desc: "Składki ZUS za lipiec" },
                { date: "31.07", desc: "Sprawozdanie finansowe - złożenie do KRS" }
            ]
        },
        {
            month: "Sierpień",
            deadlines: [
                { date: "9.08", desc: "Wpłata podatku od nieruchomości za III kwartał" },
                { date: "10.08", desc: "JPK_VAT za lipiec" },
                { date: "15.08", desc: "Składka zdrowotna za lipiec" },
                { date: "20.08", desc: "Zaliczka PIT (działalność gospodarcza)" },
                { date: "20.08", desc: "Zaliczka PIT-4 (płatnicy)" },
                { date: "20.08", desc: "Zaliczka CIT za lipiec" },
                { date: "25.08", desc: "Deklaracja VAT + JPK_VAT za lipiec" },
                { date: "25.08", desc: "Składki ZUS za sierpień" }
            ]
        },
        {
            month: "Wrzesień",
            deadlines: [
                { date: "10.09", desc: "JPK_VAT za sierpień" },
                { date: "15.09", desc: "Składka zdrowotna za sierpień" },
                { date: "20.09", desc: "Zaliczka PIT (działalność gospodarcza)" },
                { date: "20.09", desc: "Zaliczka PIT-4 (płatnicy)" },
                { date: "20.09", desc: "Zaliczka CIT za sierpień" },
                { date: "25.09", desc: "Deklaracja VAT + JPK_VAT za sierpień" },
                { date: "25.09", desc: "Składki ZUS za wrzesień" },
                { date: "30.09", desc: "Deklaracja CIT-ST za poprzedni rok" }
            ]
        },
        {
            month: "Październik",
            deadlines: [
                { date: "10.10", desc: "JPK_VAT za wrzesień" },
                { date: "15.10", desc: "Składka zdrowotna za wrzesień" },
                { date: "20.10", desc: "Zaliczka PIT (działalność gospodarcza)" },
                { date: "20.10", desc: "Zaliczka PIT-4 (płatnicy)" },
                { date: "20.10", desc: "Zaliczka CIT za wrzesień" },
                { date: "25.10", desc: "Deklaracja VAT + JPK_VAT za wrzesień" },
                { date: "25.10", desc: "Składki ZUS za październik" }
            ]
        },
        {
            month: "Listopad",
            deadlines: [
                { date: "9.11", desc: "Wpłata podatku od nieruchomości za IV kwartał" },
                { date: "10.11", desc: "JPK_VAT za październik" },
                { date: "15.11", desc: "Składka zdrowotna za październik" },
                { date: "20.11", desc: "Zaliczka PIT (działalność gospodarcza)" },
                { date: "20.11", desc: "Zaliczka PIT-4 (płatnicy)" },
                { date: "20.11", desc: "Zaliczka CIT za październik" },
                { date: "25.11", desc: "Deklaracja VAT + JPK_VAT za październik" },
                { date: "25.11", desc: "Składki ZUS za listopad" },
                { date: "30.11", desc: "Zgłoszenie do PFRON za poprzedni miesiąc" }
            ]
        },
        {
            month: "Grudzień",
            deadlines: [
                { date: "10.12", desc: "JPK_VAT za listopad" },
                { date: "15.12", desc: "Składka zdrowotna za listopad" },
                { date: "20.12", desc: "Zaliczka PIT (działalność gospodarcza)" },
                { date: "20.12", desc: "Zaliczka PIT-4 (płatnicy)" },
                { date: "20.12", desc: "Zaliczka CIT za listopad" },
                { date: "25.12", desc: "Deklaracja VAT + JPK_VAT za listopad" },
                { date: "25.12", desc: "Składki ZUS za grudzień" },
                { date: "31.12", desc: "Inwentaryzacja roczna" },
                { date: "31.12", desc: "Korekta roczna VAT" }
            ]
        }
    ];

    // Funkcja pomocnicza do rozpoznawania kategorii (np. PIT, CIT, VAT)
    function getDeadlineCategory(text) {
        text = text.toLowerCase();
        if (text.includes('vat')) return 'VAT';
        if (text.includes('zus') || text.includes('zdrowotna')) return 'ZUS';
        if (text.includes('pit')) return 'PIT';
        if (text.includes('cit')) return 'CIT';
        if (text.includes('jpk')) return 'JPK';
        if (text.includes('nieruchomości')) return 'Podatek lokalny';
        if (text.includes('sprawozdanie')) return 'Sprawozdawczość';
        return 'Inne';
    }

    // Jedyna potrzebna funkcja: wyświetlanie bieżącego miesiąca
    function displayCurrentMonth() {
        const taxCalendar = document.getElementById('taxCalendar');
        if (!taxCalendar) return;

        const today = new Date();
        const currentMonthIndex = today.getMonth();
        const currentDay = today.getDate();

        const categoryColors = {
            VAT: { bg: 'bg-blue-100', text: 'text-blue-800', icon: 'fa-file-invoice-dollar' },
            ZUS: { bg: 'bg-green-100', text: 'text-green-800', icon: 'fa-user-shield' },
            PIT: { bg: 'bg-orange-100', text: 'text-orange-800', icon: 'fa-file-alt' },
            CIT: { bg: 'bg-purple-100', text: 'text-purple-800', icon: 'fa-building' },
            Inne: { bg: 'bg-gray-100', text: 'text-gray-800', icon: 'fa-info-circle' }
        };

        const daysOfWeek = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];

        function getDayOfWeek(dateString) {
            const [day, month] = dateString.split('.').map(Number);
            const date = new Date(today.getFullYear(), month - 1, day);
            return daysOfWeek[date.getDay()];
        }

        const monthData = taxDeadlines[currentMonthIndex];
        taxCalendar.innerHTML = '';

        const monthCard = document.createElement('div');
        monthCard.className = 'bg-white p-6 rounded-lg shadow border-2 border-blue-500 mx-auto max-w-2xl';

        const daysInMonth = new Date(today.getFullYear(), currentMonthIndex + 1, 0).getDate();
        const daysLeft = daysInMonth - currentDay;

        const header = document.createElement('div');
        header.className = 'flex justify-between items-center mb-4';
        header.innerHTML = `
            <h3 class="font-bold text-xl text-blue-800">${monthData.month}</h3>
            <span class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                Pozostało ${daysLeft} dni
            </span>
        `;
        monthCard.appendChild(header);

        const deadlinesList = document.createElement('ul');
        deadlinesList.className = 'space-y-3';

        monthData.deadlines
            .sort((a, b) => {
                const dayA = parseInt(a.date.split('.')[0]);
                const dayB = parseInt(b.date.split('.')[0]);
                return dayA - dayB;
            })
            .forEach(deadline => {
                const deadlineDay = parseInt(deadline.date.split('.')[0]);
                const category = getDeadlineCategory(deadline.desc);
                const { bg = 'bg-gray-100', text = 'text-gray-800', icon = 'fa-info-circle' } = categoryColors[category] || {};
                const dayOfWeek = getDayOfWeek(deadline.date);

                let statusClass = '';
                let statusBadge = '';

                if (deadlineDay < currentDay) {
                    statusClass = 'opacity-60';
                    statusBadge = '<span class="ml-2 bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded">Minął</span>';
                } else if (deadlineDay === currentDay) {
                    statusClass = 'today-date-highlight';
                    statusBadge = '<span class="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Dzisiaj</span>';
                } else {
                    statusClass = 'bg-yellow-50 border-l-4 border-yellow-500';
                    statusBadge = '<span class="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Nadchodzący</span>';
                }

                const item = document.createElement('li');
                item.className = `p-3 rounded flex justify-between items-center ${statusClass}`;
                item.innerHTML = `
                    <div class="flex items-center gap-3">
                        <i class="fas ${icon} ${text} text-lg"></i>
                        <div>
                            <span class="font-medium text-lg">${deadline.date} (${dayOfWeek})</span>
                            <span class="ml-3">${deadline.desc}</span>
                            ${statusBadge}
                        </div>
                    </div>
                    <div class="text-sm font-semibold ${text} ${bg} px-2 py-1 rounded">
                        ${category}
                    </div>
                `;
                deadlinesList.appendChild(item);
            });

        monthCard.appendChild(deadlinesList);
        taxCalendar.appendChild(monthCard);
    }

    displayCurrentMonth(); // Wywołanie funkcji wyświetlającej bieżący miesiąc

    // Obsługa menu mobilnego
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('-translate-x-full');
            if (isHidden) {
                mobileMenu.removeAttribute('inert');
            } else {
                mobileMenu.setAttribute('inert', '');
            }
            menuBtn.setAttribute('aria-expanded', !isHidden);
        });

        const closeBtn = mobileMenu.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.add('-translate-x-full');
                mobileMenu.setAttribute('inert', '');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.add('-translate-x-full');
                mobileMenu.setAttribute('inert', '');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Lazy loading images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });

    // Improved mobile menu accessibility
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.setAttribute('aria-hidden', 'false');
        });

        const closeBtn = mobileMenu.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                mobileMenu.setAttribute('aria-hidden', 'true');
            });
        }

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.setAttribute('aria-hidden', 'true');
            });
        });
    }

    // Obsługa formularza kontaktowego
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const spinner = document.getElementById('spinner');
    const formStatus = document.getElementById('formStatus');

    // Sprawdź, czy formularz istnieje
    if (!contactForm) {
        console.error('Formularz kontaktowy nie został znaleziony.');
        return; // Zakończ działanie, jeśli formularz nie istnieje
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Sprawdź, czy przycisk, spinner i status istnieją
        if (formStatus) formStatus.textContent = ''; // Wyczyść poprzedni status
        if (submitBtn) submitBtn.disabled = true; // Zablokuj przycisk
        if (spinner) spinner.classList.remove('hidden'); // Pokaż spinner

        fetch('form.php', {
            method: 'POST',
            body: new FormData(contactForm)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            if (submitBtn) submitBtn.disabled = false; // Odblokuj przycisk
            if (spinner) spinner.classList.add('hidden'); // Ukryj spinner

            if (data.status === 'success') {
                if (formStatus) {
                    formStatus.textContent = 'Wiadomość została wysłana pomyślnie!';
                    formStatus.className = 'text-green-600';
                }
                contactForm.reset(); // Wyczyść formularz
            } else {
                if (formStatus) {
                    formStatus.textContent = data.message || 'Wystąpił błąd. Spróbuj ponownie.';
                    formStatus.className = 'text-red-600';
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            if (submitBtn) submitBtn.disabled = false; // Odblokuj przycisk
            if (spinner) spinner.classList.add('hidden'); // Ukryj spinner
            if (formStatus) {
                formStatus.textContent = 'Wystąpił błąd. Spróbuj ponownie.';
                formStatus.className = 'text-red-600';
            }
        });
    });

    // Płynne przewijanie do sekcji
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Intersection Observer for section animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-in');
                entry.target.classList.remove('opacity-0'); // Usuń ukrycie sekcji
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('opacity-0'); // Dodaj ukrycie tylko na początku
        observer.observe(section);
    });

    // Logika przycisku scroll-to-top
    const scrollToTopButton = document.getElementById('scrollToTop');
    window.addEventListener('scroll', () => {
        console.log('Scroll position:', window.scrollY); // Debugowanie pozycji przewijania
        if (window.scrollY > 300) {
            scrollToTopButton.classList.remove('hidden'); // Usuń klasę hidden
        } else {
            scrollToTopButton.classList.add('hidden'); // Dodaj klasę hidden
        }
    });

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Usunięto obsługę formularza newslettera

    // Filtrowanie kategorii w kalendarzu podatkowym
    const filterCategory = (category) => {
        const taxCalendar = document.getElementById('taxCalendar');
        const items = taxCalendar.querySelectorAll('li');
        items.forEach(item => {
            const itemCategory = item.querySelector('.text-sm').textContent.trim();
            item.style.display = itemCategory === category || category === 'Wszystkie' ? '' : 'none';
        });
    };

    // Dodaj przyciski filtrowania
    const taxCalendar = document.getElementById('taxCalendar');
    if (taxCalendar) {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'flex justify-center gap-4 mb-4'; // Dodano justify-center, aby wyśrodkować przyciski
        ['Wszystkie', 'VAT', 'ZUS', 'PIT', 'CIT'].forEach(category => {
            const button = document.createElement('button');
            button.textContent = category;
            button.className = 'px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900';
            button.addEventListener('click', () => filterCategory(category));
            filterContainer.appendChild(button);
        });
        taxCalendar.parentElement.insertBefore(filterContainer, taxCalendar);
    }

    // Obsługa formularza
    document.querySelector('form').addEventListener('submit', async function (event) {
        event.preventDefault(); // Zapobiega domyślnemu wysyłaniu formularza

        const formData = new FormData(this);
        const response = await fetch(this.action, {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.status === 'success') {
            const messageBox = document.createElement('div');
            messageBox.textContent = result.message;
            messageBox.style.position = 'fixed';
            messageBox.style.top = '20px';
            messageBox.style.left = '50%';
            messageBox.style.transform = 'translateX(-50%)';
            messageBox.style.backgroundColor = '#4caf50';
            messageBox.style.color = '#fff';
            messageBox.style.padding = '10px 20px';
            messageBox.style.borderRadius = '5px';
            messageBox.style.zIndex = '1000';
            document.body.appendChild(messageBox);

            setTimeout(() => {
                messageBox.remove();
                location.reload(); // Odśwież stronę
            }, 3000); // Wyświetl komunikat przez 3 sekundy
        } else {
            alert(result.message); // Wyświetl błąd
        }
    });
});