<!DOCTYPE html>
<html lang="sr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HomeCarShop | Scratch Repair</title>
    <meta name="description" content="Najbolje rešenje za ogrebotine na vašem automobilu. Naručite odmah, plaćanje pouzećem." />
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Russo+One&display=swap" rel="stylesheet">
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
                        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        'float': 'float 6s ease-in-out infinite',
                        'slide-up': 'slideUp 0.5s ease-out forwards',
                        'fade-in': 'fadeIn 0.5s ease-out forwards',
                    },
                    keyframes: {
                        float: {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-10px)' },
                        },
                        slideUp: {
                            '0%': { transform: 'translateY(20px)', opacity: '0' },
                            '100%': { transform: 'translateY(0)', opacity: '1' },
                        },
                        fadeIn: {
                            '0%': { opacity: '0' },
                            '100%': { opacity: '1' },
                        }
                    }
                }
            }
        }
    </script>
    <style>
        html { scroll-behavior: smooth; }
        .parallax {
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }

        /* FIX: Force webkit prefix for gradient text */
        .text-gradient {
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
        }


        /* Dynamic Scroll Animations */
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
        }

        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }

        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        .delay-300 { transition-delay: 300ms; }
    </style>
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

    @viteReactRefresh
    @vite('resources/js/landers/scratchrepair/main.tsx')
</head>
<body class="bg-slate-900 text-slate-100 antialiased">
<script>
    window.orderRoute = "{{ route('order.create') }}";
    window.csrf_token = "{{ csrf_token() }}";
</script>
<div id="scratchrepair-root"></div>
<script>
    // Simple Intersection Observer for reveal animations
    document.addEventListener('DOMContentLoaded', () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));

        // Re-observe when DOM changes (React renders)
        const observerConfig = { childList: true, subtree: true };
        const bodyObserver = new MutationObserver(() => {
            document.querySelectorAll('.reveal:not(.observed)').forEach(el => {
                observer.observe(el);
                el.classList.add('observed');
            });
        });
        bodyObserver.observe(document.body, observerConfig);
    });
</script>
</body>
</html>
