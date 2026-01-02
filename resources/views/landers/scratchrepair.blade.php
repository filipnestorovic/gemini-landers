<!DOCTYPE html>
<html lang="sr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
    <title>HomeCarShop | Scratch Repair</title>

    <!-- Tailwind v2.2.19 CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" />

    <style>
        :root {
            --brand-red: #DC2626;
            --brand-dark: #0F172A;
        }

        /* Resets & Base Styles */
        html { scroll-behavior: smooth; }
        body {
            background-color: #0F172A !important;
            color: #FFFFFF !important;
            font-family: 'Inter', -apple-system, sans-serif;
            overflow-x: hidden;
            margin: 0;
        }

        /* Custom Colors & Utilities */
        .bg-gray-950 { background-color: #080C15 !important; }
        .bg-brand-red { background-color: var(--brand-red) !important; }
        .text-brand-red { color: var(--brand-red) !important; }
        .font-display { font-family: 'Russo One', sans-serif; }

        /* Z-Index Overrides */
        .z-1 { z-index: 1; }
        .z-60 { z-index: 60; }
        .z-100 { z-index: 100 !important; }
        .z-200 { z-index: 200 !important; }

        /* Eksplicitna pravila za navigaciju - sprečavaju hidden bug */
        @media (min-width: 768px) {
            .nav-desktop-menu { display: flex !important; }
            .nav-mobile-toggle { display: none !important; }
        }
        @media (max-width: 767px) {
            .nav-desktop-menu { display: none !important; }
            .nav-mobile-toggle { display: flex !important; }
        }

        /* Glassmorphism Effect */
        .glass-nav {
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Animations */
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 30s linear infinite;
        }

        @keyframes bounce-in {
            0% { transform: scale(0.9); opacity: 0; }
            70% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
            animation: bounce-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes slide-up {
            0% { transform: translateY(100%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
            animation: slide-up 0.5s ease-out forwards;
        }

        /* Reveal Animations on Scroll - Osigurano da se vidi ako skripta kasni */
        .reveal {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .reveal.active {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

        .btn-glow {
            box-shadow: 0 10px 25px -5px rgba(220, 38, 38, 0.4);
        }
        .btn-glow:hover {
            box-shadow: 0 20px 30px -10px rgba(220, 38, 38, 0.6);
            transform: translateY(-2px);
        }

        .container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }

        input:focus { border-color: var(--brand-red) !important; outline: none !important; box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2) !important; }
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
</body>
</html>
