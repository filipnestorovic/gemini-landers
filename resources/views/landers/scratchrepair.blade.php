<!DOCTYPE html>
<html lang="sr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
    <title>HomeCarShop | Scratch Repair</title>

    <!-- Fallback styles to prevent "Text-only" look on slow iPhone connections -->
    <style>
        body { background-color: #0f172a; color: #f8fafc; margin: 0; font-family: sans-serif; }
        #root { min-height: 100vh; display: flex; flex-direction: column; }
    </style>

    <!-- 1. Tailwind Loading FIRST for mobile compatibility -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        display: ['Russo One', 'sans-serif'],
                    },
                    colors: {
                        brand: {
                            red: '#DC2626',
                            dark: '#0F172A',
                            accent: '#F59E0B',
                        }
                    },
                    animation: {
                        'marquee': 'marquee 25s linear infinite',
                        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    },
                    keyframes: {
                        marquee: {
                            '0%': { transform: 'translateX(0)' },
                            '100%': { transform: 'translateX(-50%)' },
                        }
                    }
                }
            }
        }
    </script>

    <!-- 2. Fonts and Maps -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Russo+One&display=swap" rel="stylesheet">

    <script type="importmap">
        {
          "imports": {
            "react-dom/": "https://aistudiocdn.com/react-dom@^19.2.0/",
            "lucide-react": "https://aistudiocdn.com/lucide-react@^0.554.0",
            "react/": "https://aistudiocdn.com/react@^19.2.0/",
            "react": "https://aistudiocdn.com/react@^19.2.0"
          }
        }
    </script>

    <style>
        /* iOS Safari safe parallax and cleanup */
        .parallax-safe {
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }
        @media (min-width: 1024px) {
            .parallax-safe { background-attachment: fixed; }
        }

        /* Native Tailwind gradients usually handle prefixes, but we add safe fallback */
        .reveal {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
    </style>

    @viteReactRefresh
    @vite('resources/js/landers/scratchrepair/main.tsx')
</head>
<body class="bg-slate-900 text-slate-100 antialiased overflow-x-hidden">
<script>
    window.orderRoute = "{{ route('order.create') }}";
    window.csrf_token = "{{ csrf_token() }}";
</script>
<div id="scratchrepair-root"></div>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        const checkElements = () => {
            document.querySelectorAll('.reveal:not(.observed)').forEach(el => {
                observer.observe(el);
                el.classList.add('observed');
            });
        };

        checkElements();
        const bodyObserver = new MutationObserver(checkElements);
        bodyObserver.observe(document.body, { childList: true, subtree: true });
    });
</script>
</body>
</html>
