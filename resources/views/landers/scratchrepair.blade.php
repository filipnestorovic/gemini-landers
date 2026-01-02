<!DOCTYPE html>
<html lang="sr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
    <title>HomeCarShop | Scratch Repair</title>

    <!-- 1. POUZDAN STATIČKI TAILWIND (Nema CORS problema) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" />

    <style>
        :root {
            --brand-red: #DC2626;
            --brand-dark: #0F172A;
        }

        /* Resets & Base Styles */
        html { scroll-behavior: smooth; }
        body {
            background-color: #0F172A;
            color: #F8FAFC;
            font-family: 'Inter', -apple-system, sans-serif;
            overflow-x: hidden;
        }

        /* Custom Brand Classes */
        .bg-brand-red { background-color: var(--brand-red) !important; }
        .text-brand-red { color: var(--brand-red) !important; }
        .font-display { font-family: 'Russo One', sans-serif; }

        .text-gradient {
            background: linear-gradient(to right, #ef4444, #f97316);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        /* Glassmorphism */
        .glass-nav {
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        /* Marquee Animation */
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 30s linear infinite;
        }

        /* Reveal Animations */
        .reveal { opacity: 0; transform: translateY(20px); transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
        .reveal.active { opacity: 1; transform: translateY(0); }

        /* Custom Buttons */
        .btn-glow {
            box-shadow: 0 0 20px rgba(220, 38, 38, 0.4);
            transition: all 0.3s ease;
        }
        .btn-glow:hover {
            box-shadow: 0 0 35px rgba(220, 38, 38, 0.6);
            transform: translateY(-2px);
        }

        /* Responsive Container Adjustments */
        .container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }

        /* Form Specifics */
        input:focus { border-color: var(--brand-red) !important; box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.2) !important; }
    </style>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Russo+One&display=swap" rel="stylesheet">

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
<body>
<script>
    window.orderRoute = "{{ route('order.create') }}";
    window.csrf_token = "{{ csrf_token() }}";
</script>
<div id="scratchrepair-root"></div>

<script>
    // Intersection Observer for animations
    window.addEventListener('load', () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    });
</script>
</body>
</html>
