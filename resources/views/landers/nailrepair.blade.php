<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nail Repair Serum | Medeiva</title>

    {{-- Tailwind CDN, isto kao u originalu --}}
    <script src="https://cdn.tailwindcss.com"></script>

    {{-- Tailwind konfiguracija iz originalnog index.html --}}
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        serif: ['Playfair Display', 'serif'],
                    },
                    colors: {
                        brand: {
                            50: '#f2fcf5',
                            100: '#e1f8e8',
                            200: '#c3eed0',
                            300: '#95deb0',
                            400: '#5fc38a',
                            500: '#39a76a',
                            600: '#2b8653',
                            700: '#266b45',
                            800: '#235539',
                            900: '#1d4631',
                        }
                    }
                }
            }
        }
    </script>

    {{-- Google fontovi iz originalnog projekta --}}
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">

    @viteReactRefresh
    @vite('resources/js/landers/nailrepair/main.tsx')
</head>
<body class="bg-gray-50 text-gray-900 antialiased font-sans">
<script>
    window.orderRoute = "{{ route('order.create') }}";
    window.csrf_token = "{{ csrf_token() }}";
</script>
<div id="nailrepair-root"></div>
</body>
</html>
