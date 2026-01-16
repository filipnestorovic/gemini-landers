<!DOCTYPE html>
<html lang="sr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pest Reject - HomeCarShop</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    },
                    colors: {
                        brand: {
                            green: '#43a047', // More natural/eco green
                            lightGreen: '#e8f5e9', // Very light eco background
                            dark: '#1b5e20', // Deep forest green for trust
                            red: '#d32f2f', // Urgent red
                            alert: '#c62828' // Darker red for text
                        }
                    },
                    animation: {
                        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }
                }
            }
        }
    </script>
    <script type="importmap">
        {
          "imports": {
            "react-dom/": "https://esm.sh/react-dom@^19.2.3/",
            "lucide-react": "https://esm.sh/lucide-react@^0.562.0",
            "react/": "https://esm.sh/react@^19.2.3/",
            "react": "https://esm.sh/react@^19.2.3"
          }
        }
    </script>
    @viteReactRefresh
    @vite('resources/js/landers/pestrejectbih/main.tsx')
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
<script>
    window.orderRoute = "{{ route('order.create') }}";
    window.csrf_token = "{{ csrf_token() }}";
</script>
<div id="pestrejectbih-root"></div>
</body>
</html>
