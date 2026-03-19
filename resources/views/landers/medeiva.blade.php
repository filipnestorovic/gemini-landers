<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Medeiva Natural Cosmetics</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:wght@100..900&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            cream: '#fdfbf7',
                            olive: '#4a5d4e',
                            earth: '#8c786a',
                        }
                    },
                    fontFamily: {
                        serif: ['"Cormorant Garamond"', 'serif'],
                        sans: ['Inter', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <style type="text/tailwindcss">
        @layer base {
            body {
                @apply bg-brand-cream text-zinc-900 font-sans antialiased;
            }
            h1, h2, h3, h4, h5, h6 {
                @apply font-serif;
            }
        }
    </style>
    @viteReactRefresh
    @vite('resources/js/landers/medeiva/main.tsx')
</head>
<body class="bg-brand-cream">
<script>
    window.orderRoute = "{{ route('order.create') }}";
    window.csrf_token = "{{ csrf_token() }}";
</script>
<div id="medeiva-root"></div>
</body>
</html>
